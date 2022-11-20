import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  if (!event.cookies.get("jwt")) {
    throw redirect(307, "/");
  }
};
