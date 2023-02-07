import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { Errors, USER_API } from "@consts";
import { getJwt } from "@/util/getJWT";

export const load: PageServerLoad = async (event) => {
  const jwt = await getJwt(event.cookies);

  const res = await fetch(USER_API, {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status == 401) {
    return fail(404, { success: false, error: Errors.UserNotExisting });
  } else if (res.status >= 400 && res.status < 600) {
    return fail(res.status, { success: false, error: Errors.GenericError });
  }

  return { success: true, user: res.json() };
};

export const actions: Actions = {
  default: async (event) => {
    const jwt = await getJwt(event.cookies);

    const data = await event.request.formData();
    const username = data.get("username");
    const email = data.get("email");
    const oldPassword = data.get("oldPassword");
    const newPassword = data.get("newPassword");

    const res = await fetch(USER_API, {
      method: "PUT",
      headers: { authorization: "Bearer " + jwt },
      body: JSON.stringify({
        username,
        email,
        oldPassword,
        newPassword,
      }),
    });

    if (res.status == 401) {
      return fail(404, { success: false, error: Errors.UserNotExisting });
    } else if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }

    return {
      success: true,
      user: {
        username,
        email,
      },
    };
  },
};
