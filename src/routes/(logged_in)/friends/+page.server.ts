import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { User } from "src/types";
import { Errors, FRIENDS_API } from "@consts";
import { getJwt } from "@/util/getJWT";

let friends: Array<User> = [];

export const load: PageServerLoad = async (event) => {
  const jwt = await getJwt(event.cookies);

  const res = await fetch(FRIENDS_API, {
    method: "GET",
    headers: { authorization: "Bearer " + jwt },
  });

  if (res.status >= 400 && res.status < 600) {
    return fail(res.status, { success: false, error: Errors.GenericError });
  }

  let friends = await res.json();
  return { success: true, error: null, friends };
};

export const actions: Actions = {
  default: async (event) => {
    const jwt = await getJwt(event.cookies);
    const data = await event.request.formData();

    let friendUsername = data.get("username");
    if (!friendUsername) {
      return fail(400, { success: false, error: Errors.MissingUsername });
    }

    friendUsername = String(friendUsername).trim();
    if (0 === friendUsername.length) {
      return fail(400, { success: false, error: Errors.UsernameEmpty });
    }

    const username = event.cookies.get("username");
    if (username === friendUsername) {
      return fail(409, { success: false, error: Errors.UniqueUsername });
    }

    for (let friend of friends) {
      if (friend.username === friendUsername) {
        return fail(409, { success: false, error: Errors.AlreadyAddedFriend });
      }
    }

    const res = await fetch(FRIENDS_API, {
      method: "POST",
      headers: { authorization: "Bearer " + jwt },
      body: JSON.stringify(friendUsername),
    });

    if (res.status == 404) {
      return fail(404, { success: false, error: Errors.UserNotExisting });
    } else if (res.status == 409) {
      return fail(409, { success: false, error: Errors.AlreadyAddedFriend });
    } else if (res.status >= 400 && res.status < 600) {
      return fail(res.status, { success: false, error: Errors.GenericError });
    }
    throw redirect(307, "/friends");
  },
};
