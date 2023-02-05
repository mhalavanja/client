import type { Actions } from "./$types";
import { Errors, AUTHENTICATE_API } from "@consts";
import { fail, redirect, type ServerLoad } from "@sveltejs/kit";
import type { AuthToken } from "@types";

export const load: ServerLoad = async (event) => {
  if (event.cookies.get("jwt")) {
    throw redirect(307, "/groups");
  }
};

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const username = data.get("username");
    const password = data.get("password");

    const res = await fetch(AUTHENTICATE_API, {
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
