import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { USER_API } from "../../../consts";

export const load: PageServerLoad = async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  if (jwt === "") {
    throw redirect(307, "/");
  }

  const res = await fetch(USER_API, {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status === 401) {
    return { success: false };
  } else if (res.status === 500) {
  }

  return { success: true, user: res.json() };
};

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const jwt = event.cookies.get("jwt") || "";
    if (jwt === "") {
      throw redirect(307, "/");
    }

    const res = await fetch(USER_API, {
      method: "PUT",
      headers: { authorization: "Bearer " + jwt },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (res.status === 401 || res.status === 500) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      user: {
        username,
        email,
        password,
      },
    };
  },
};
