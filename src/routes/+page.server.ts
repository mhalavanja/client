import type { Actions } from "./$types";
import { Errors, TOKENS_API } from "@consts";
import { fail, redirect, type ServerLoad } from "@sveltejs/kit";
import { setCookiesOnLogin } from "@/util/setCookiesOnLogin";

export const load: ServerLoad = async (event) => {
  if (event.cookies.get("jwt")) {
    throw redirect(307, "/groups");
  }
  event.cookies.delete("refresh_token");
  event.cookies.delete("username");
};

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const username = String(data.get("username"));
    const password = String(data.get("password"));

    const res = await fetch(TOKENS_API + "/authenticate", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (res.status == 401) {
      return fail(404, { success: false, error: Errors.UserNotExisting });
    } else if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }

    await setCookiesOnLogin(event.cookies, res, username);
    throw redirect(307, "/groups");
  },
};
