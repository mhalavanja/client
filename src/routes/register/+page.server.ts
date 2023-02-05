import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { AUTHENTICATE_API, Errors, REGISTER_API } from "@consts";
import type { AuthToken } from "src/types";

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const email = data.get("email");
    const username = data.get("username");
    const password = data.get("password");

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

    res = await fetch(AUTHENTICATE_API, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }

    const authToken: AuthToken = await res.json();
    event.cookies.set("jwt", authToken.access_token, {
      path: "/",
      expires: new Date(authToken.access_token_expires_at),
    });

    event.cookies.set("username", String(username), {
      path: "/",
      expires: new Date(authToken.access_token_expires_at),
    });

    throw redirect(307, "/friends");
  },
};
