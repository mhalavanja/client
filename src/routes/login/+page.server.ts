import type { Actions } from "./$types";
import { AUTHENTICATE_API } from "../../consts";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    console.log(AUTHENTICATE_API);
    const data = await request.formData();
    const username = data.get("username");
    const password = data.get("password");

    console.log(username, password);
    const res = await fetch(AUTHENTICATE_API, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    cookies.set("jwt", "AAA", { path: "/" });
    return { success: true };
  },
};
