import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
  event.cookies.delete("jwt");
  throw redirect(307, "/");
};
