import { error, redirect, type RequestHandler } from "@sveltejs/kit";
import { Errors, GROUPS_API } from "@consts";

export const DELETE = (async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  if (jwt === "") {
    throw redirect(307, "/");
  }
  const groupId = event.params.id;

  const res = await fetch(GROUPS_API + "/" + groupId + "/leave", {
    method: "DELETE",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status == 401) {
    throw error(401, Errors.WrongGroup);
  } else if (res.status >= 400 && res.status < 600) {
    throw error(res.status, Errors.GenericError);
  }

  throw redirect(307, "/groups");
}) satisfies RequestHandler;
