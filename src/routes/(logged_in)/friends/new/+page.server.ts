import type { PageServerLoad } from ".svelte-kit/types/src/routes/groups/$types";
import { redirect, type Actions } from "@sveltejs/kit";
import { FRIENDS_API } from "../../../../consts";

export const load: PageServerLoad = async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  if (jwt === "") {
    throw redirect(307, "/");
  }
};

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const name = data.get("name");
    const jwt = event.cookies.get("jwt") || "";
    if (jwt === "") {
      throw redirect(307, "/");
    }

    console.log(JSON.stringify(name));
    const res = await fetch(FRIENDS_API, {
      method: "POST",
      headers: { authorization: "Bearer " + jwt },
      body: JSON.stringify(name),
    });

    if (res.status === 401 || res.status === 400) {
      return { success: false };
    } else if (res.status === 500) {
    }
  },
};
