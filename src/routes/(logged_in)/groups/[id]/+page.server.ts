import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { fail, redirect } from "@sveltejs/kit";
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

  if (res.status == 401) {
    return fail(404, { success: false, error: Errors.UserNotExisting });
  } else if (res.status >= 400 && res.status < 600) {
    return fail(res.status, { success: false, error: Errors.GenericError });
  }

  const jsonGroup = await res.json();
  const group: Group = {
    id: jsonGroup.id,
    name: jsonGroup.group_name,
    owner: jsonGroup.owner_username,
  };
  return { success: true, group };
};
