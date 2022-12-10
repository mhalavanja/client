import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (event) => {
  event.cookies.delete("jwt");
  throw redirect(307, "/");
};
