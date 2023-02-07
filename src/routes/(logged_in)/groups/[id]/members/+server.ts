import type { RequestHandler } from "@sveltejs/kit";
import { Errors, GROUPS_API } from "@consts";
import type { User } from "@types";
import { getJwt } from "@/util/getJWT";

export const GET = (async (event) => {
  const jwt = await getJwt(event.cookies);
  const id: number = Number(event.params.id);

  const res = await fetch(GROUPS_API + "/" + id + "/users", {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status >= 400 && res.status < 600) {
    return new Response(JSON.stringify({ success: false, error: Errors.GenericError }));
  }

  const jsonGroupUsers = await res.json();
  let groupUsers: User[] = [];

  for (let jsonUser of jsonGroupUsers) {
    groupUsers.push({
      id: jsonUser.user_id,
      username: jsonUser.username,
      email: jsonUser.email,
    });
  }

  return new Response(JSON.stringify({ success: true, members: groupUsers }));
}) satisfies RequestHandler;

export const POST = (async (event) => {
  const jwt = await getJwt(event.cookies);
  const groupId: number = Number(event.params.id);

  let friendUsername = await event.request.json();
  if (!friendUsername) {
    return new Response(JSON.stringify({ success: false, error: Errors.MissingUsername }));
  }

  friendUsername = String(friendUsername).trim();
  if (0 === friendUsername.length) {
    return new Response(JSON.stringify({ success: false, error: Errors.UsernameEmpty }));
  }

  const username = event.cookies.get("username");
  if (username === friendUsername) {
    return new Response(JSON.stringify({ success: false, error: Errors.UniqueUsername }));
  }

  const res = await fetch(GROUPS_API + "/" + groupId + "/users", {
    method: "POST",
    headers: { authorization: "Bearer " + jwt },
    body: JSON.stringify(friendUsername),
  });

  if (res.status == 404) {
    return new Response(JSON.stringify({ success: false, error: Errors.UserNotExisting }));
  } else if (res.status == 409) {
    return new Response(JSON.stringify({ success: false, error: Errors.UserInGroup }));
  } else if (res.status >= 400 && res.status < 600) {
    return new Response(JSON.stringify({ success: false, error: Errors.GenericError }));
  }

  return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;

export const DELETE = (async (event) => {
  const jwt = await getJwt(event.cookies);
  const id: number = Number(event.params.id);
  const userId: string = await event.request.json();

  const res = await fetch(GROUPS_API + "/" + id + "/users", {
    method: "DELETE",
    headers: { authorization: "Bearer " + jwt },
    body: userId,
  });

  if (res.status >= 400 && res.status < 600) {
    return new Response(JSON.stringify({ success: false, error: Errors.GenericError }));
  }

  return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
