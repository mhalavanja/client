import type { RequestHandler } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { Errors, FRIENDS_API } from "../../../../consts";

export const DELETE = (async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  const friendId: number = Number(event.params.id);

  if (jwt === "") {
    throw redirect(307, "/");
  }

  const res = await fetch(FRIENDS_API + "/" + friendId, {
    method: "DELETE",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status >= 400 && res.status < 600) {
    throw error(res.status, JSON.stringify({ success: false, error: Errors.GenericError }));
  }
  return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
