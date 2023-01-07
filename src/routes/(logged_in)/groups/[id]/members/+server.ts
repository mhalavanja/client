import { fail, redirect } from "@sveltejs/kit";
import { Errors, GROUPS_API } from "../../../../../consts";
import type { User } from "src/types";
import type { RequestHandler } from "./$types";

export const GET = (async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  const id: number = event.params.id;

  if (jwt === "") {
    throw redirect(307, "/");
  }

  const res = await fetch(GROUPS_API + "/" + id + "/users", {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status >= 400 && res.status < 600) {
    return fail(res.status, { success: false, error: Errors.GenericError });
  }

  const jsonGroupUsers = await res.json();
  let groupUsers: User[] = [];
  console.log(jsonGroupUsers[0]);
  for (let jsonUser of jsonGroupUsers) {
    groupUsers.push({
      id: jsonUser.user_id,
      username: jsonUser.username,
      email: jsonUser.email,
    });
  }

  return new Response(JSON.stringify({ success: true, members: groupUsers }));
}) satisfies RequestHandler;
