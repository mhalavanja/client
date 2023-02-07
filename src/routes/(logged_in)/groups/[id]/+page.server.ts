import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { fail } from "@sveltejs/kit";
import type { Group } from "@types";
import { Errors, GROUPS_API } from "@consts";
import { getJwt } from "@/util/getJWT";

export const load: PageServerLoad = async (event) => {
  const jwt = await getJwt(event.cookies);
  const id: number = Number(event.params.id);

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
  return { success: true, group, username };
};
