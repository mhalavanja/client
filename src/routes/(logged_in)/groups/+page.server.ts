import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import { GROUPS_API, Errors } from "@consts";
import { getJwt } from "@/util/getJWT";
import type { Group } from "@types";

export const load: PageServerLoad = async (event) => {
  const jwt = await getJwt(event.cookies);
  const username = event.cookies.get("username");

  const res = await fetch(GROUPS_API, {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status >= 400 && res.status < 600) {
    fail(res.status, { success: false, error: Errors.GenericError });
  }

  if (!username) {
    throw redirect(307, "/");
  }
  const groups: Group[] = await res.json();
  return { success: true, groups, username };
};

export const actions: Actions = {
  default: async (event) => {
    const jwt = await getJwt(event.cookies);
    const data = await event.request.formData();

    let groupName = data.get("groupName");
    if (!groupName) {
      return fail(400, { success: false, error: Errors.MissingGroupName });
    }

    groupName = String(groupName).trim();
    if (0 === groupName.length) {
      return fail(400, { success: false, error: Errors.GroupNameEmpty });
    }

    const res = await fetch(GROUPS_API, {
      method: "POST",
      headers: { authorization: "Bearer " + jwt },
      body: JSON.stringify(groupName),
    });

    if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }

    throw redirect(307, "/groups");
  },
};
