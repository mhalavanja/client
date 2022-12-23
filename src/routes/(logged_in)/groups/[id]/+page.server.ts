import type { PageServerLoad } from ".svelte-kit/types/src/routes/groups/$types";
import { json, redirect } from "@sveltejs/kit";
import { GROUPS_API } from "../../../../consts";

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

  if (res.status === 401) {
    return { success: false };
  } else if (res.status === 500) {
  }

  const jsonGroup = await res.json();
  const group: Group = {
    id: jsonGroup.id,
    groupName: jsonGroup.group_name,
    owner: jsonGroup.owner_username,
  };
  return { success: true, group };
};
