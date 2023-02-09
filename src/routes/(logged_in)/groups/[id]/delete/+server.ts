import { error, redirect, type RequestHandler } from "@sveltejs/kit";
import { Errors, GROUPS_API } from "@consts";
import { getJwt } from "@/util/getJWT";

export const DELETE = (async (event) => {
  const jwt = await getJwt(event.cookies);
  const groupId = event.params.id;
  console.log(groupId);
  const res = await fetch(GROUPS_API + "/" + groupId, {
    method: "DELETE",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status == 401) {
    throw error(401, Errors.WrongGroup);
  } else if (res.status >= 400 && res.status < 600) {
    throw error(res.status, Errors.GenericError);
  }

  // return new Response(JSON.stringify({ success: true }));
  return new Response();
}) satisfies RequestHandler;
