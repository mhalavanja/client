import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";
import { Errors, FRIENDS_API } from "@consts";
import { getJwt } from "@/util/getJWT";

export const DELETE = (async (event) => {
  const jwt = await getJwt(event.cookies);
  const friendId: number = Number(event.params.id);

  const res = await fetch(FRIENDS_API + "/" + friendId, {
    method: "DELETE",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status >= 400 && res.status < 600) {
    throw error(res.status, JSON.stringify({ success: false, error: Errors.GenericError }));
  }
  return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
