import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { redirect } from "@sveltejs/kit";
import { FRIENDS_API } from "../../../../consts";
import type { User } from "../../../../types";

export const load: PageServerLoad = async (event) => {
  const jwt = event.cookies.get("jwt") || "";
  const id: number = event.params.id;

  if (jwt === "") {
    throw redirect(307, "/");
  }

  const res = await fetch(FRIENDS_API + "/" + id, {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status === 401) {
    return { success: false };
  } else if (res.status === 500) {
  }

  const jsonFriend = await res.json();
  const friend: User = {
    id: jsonFriend.id,
    username: jsonFriend.username,
    email: jsonFriend.email,
  };
  return { success: true, friend };
};
