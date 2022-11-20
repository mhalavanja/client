import type { Actions } from "./$types";
import { REGISTER_API } from "../../../consts";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email");
    const username = data.get("username");
    const password = data.get("password");

    const res = await fetch(REGISTER_API, {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
        // email: "mat2@mail.com",
        // username: "matijaa3",
        // password: "passata",
      }),
    });

    if (res.status === 401) {
      return { success: false };
    } else if (res.status === 500) {
      return { success: false };
    }

    return { success: true };
  },
};
