import { TOKENS_API, Errors } from "@/consts";
import { fail, redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (event) => {
  const refreshToken = event.cookies.get("refresh_token");
  const jwt = event.cookies.get("jwt");
  event.cookies.delete("jwt");
  event.cookies.delete("username");

  if (!refreshToken || !jwt) {
    throw redirect(307, "/");
  }

  const res = await fetch(TOKENS_API + "/refreshToken", {
    method: "DELETE",
    headers: { authorization: "Bearer " + jwt, refresh_token: refreshToken },
  });

  if (res.status == 401) {
    return fail(404, { success: false, error: Errors.UserNotExisting });
  } else if (res.status >= 400 && res.status < 600) {
    return fail(res.status, { success: false, error: Errors.GenericError });
  }
  throw redirect(307, "/");
};
