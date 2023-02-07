import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { TOKENS_API, Errors, REGISTER_API } from "@consts";
import { setCookiesOnLogin } from "@/util/setCookiesOnLogin";

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const email = String(data.get("email"));
    const username = String(data.get("username"));
    const password = String(data.get("password"));

    let res = await fetch(REGISTER_API, {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    if (res.status == 409) {
      return fail(404, { success: false, error: Errors.UserAlreadyExists });
    } else if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }

    res = await fetch(TOKENS_API + "/authenticate", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }

    await setCookiesOnLogin(event.cookies, res, username);
    throw redirect(307, "/groups");
  },
};
