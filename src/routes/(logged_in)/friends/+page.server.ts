import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { redirect, type Actions } from "@sveltejs/kit";
import { FRIENDS_API } from "../../../consts";

export const load: PageServerLoad = async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  if (jwt === "") {
    throw redirect(307, "/");
  }

  const res = await fetch(FRIENDS_API, {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status === 401) {
    return { success: false };
  } else if (res.status === 500) {
  }

  return { success: true, friends: res.json() };
};

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const friendUsername = data.get("username");
    const jwt = event.cookies.get("jwt") || "";
    if (jwt === "") {
      throw redirect(307, "/");
    }

    const res = await fetch(FRIENDS_API, {
      method: "POST",
      headers: { authorization: "Bearer " + jwt },
      body: JSON.stringify(friendUsername),
    });

    if (res.status >= 400 && res.status < 600) {
      return { success: false };
    }
    throw redirect(307, "/friends");
  },
};
