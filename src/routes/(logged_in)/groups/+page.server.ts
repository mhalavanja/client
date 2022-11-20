import type { PageServerLoad } from ".svelte-kit/types/src/routes/groups/$types";
import { redirect } from "@sveltejs/kit";
import { GROUPS_API } from "../../../consts";

export const load: PageServerLoad = async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  if (jwt === "") {
    throw redirect(307, "/");
  }

  const res = await fetch(GROUPS_API, {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status === 401) {
    return { success: false };
  } else if (res.status === 500) {
  }

  return { success: true, groups: res.json() };
};
