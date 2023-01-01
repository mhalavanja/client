import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { Group } from "../../../../types";
import { Errors, GROUPS_API } from "../../../../consts";

export const load: PageServerLoad = async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  const id: number = event.params.id;

  if (jwt === "") {
    throw redirect(307, "/");
  }

  const res = await fetch(GROUPS_API + "/" + id, {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status >= 400 && res.status < 600) {
    return fail(res.status, { success: false, error: Errors.GenericError });
  }

  const username = event.cookies.get("username");
  const jsonGroup = await res.json();
  const group: Group = {
    id: jsonGroup.id,
    name: jsonGroup.group_name,
    owner: jsonGroup.owner_username,
  };
  return { success: true, group, isOwner: username === jsonGroup.owner_username };
};

export const actions: Actions = {
  deleteGroup: async (event) => {
    const jwt = event.cookies.get("jwt") || "";
    if (jwt === "") {
      throw redirect(307, "/");
    }

    const data = await event.request.formData();
    const groupId = data.get("groupId");

    const res = await fetch(GROUPS_API + "/" + groupId, {
      method: "DELETE",
      headers: { authorization: "Bearer " + jwt },
    });

    if (res.status == 401) {
      return fail(401, { success: false, error: Errors.WrongGroup });
    } else if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }

    throw redirect(307, "/groups");
  },
  deleteMember: async (event) => {
    const jwt = event.cookies.get("jwt") || "";
    if (jwt === "") {
      throw redirect(307, "/");
    }

    const data = await event.request.formData();
    const groupId = data.get("groupId");

    const res = await fetch(GROUPS_API + "/" + groupId, {
      method: "DELETE",
      headers: { authorization: "Bearer " + jwt },
    });

    if (res.status == 401) {
      return fail(401, { success: false, error: Errors.WrongGroup });
    } else if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }

    throw redirect(307, "/groups/" + groupId);
  },
};
