import type { PageServerLoad } from ".svelte-kit/types/src/routes/groups/$types";
import { redirect, type Actions } from "@sveltejs/kit";
import { GROUPS_API } from "../../../../consts";

export const load: PageServerLoad = async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  if (jwt === "") {
    throw redirect(307, "/");
  }
};

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const groupName = data.get("groupName");
    const jwt = event.cookies.get("jwt") || "";
    if (jwt === "") {
      throw redirect(307, "/");
    }

    const res = await fetch(GROUPS_API, {
      method: "POST",
      headers: { authorization: "Bearer " + jwt },
      body: JSON.stringify(groupName),
    });

    if (res.status >= 400 && res.status < 600) {
      return { success: false };
    }
    throw redirect(307, "/groups");
  },
};
