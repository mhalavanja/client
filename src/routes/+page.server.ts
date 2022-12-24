import type { Actions } from "./$types";
import { AUTHENTICATE_API } from "../consts";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { AuthToken } from "../types";

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

    if (res.status === 401) {
      return { success: false };
    } else if (res.status === 500) {
    }

    const authToken: AuthToken = await res.json();
    event.cookies.set("jwt", authToken.access_token, {
      path: "/",
      expires: new Date(authToken.access_token_expires_at),
    });

    throw redirect(307, "/groups");
  },
};
