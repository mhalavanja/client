import { TOKENS_API } from "@/consts";
import type { JWTData } from "@/types";
import { redirect, type Cookies } from "@sveltejs/kit";

export async function getJwt(cookies: Cookies) {
  const refreshToken = cookies.get("refresh_token");
  let jwt = cookies.get("jwt");

  if (jwt) {
    return jwt;
  }
  if (!refreshToken) {
    return redirect(307, "/");
  }

  const res = await fetch(TOKENS_API + "/renewAccess", {
    method: "POST",
    headers: { refresh_token: refreshToken },
  });

  const jwtData: JWTData = await res.json();

  cookies.set("jwt", jwtData.access_token, {
    path: "/",
    expires: new Date(jwtData.access_token_expires_at),
  });

  // cookies.set("jwt_expires_at", jwtData.access_token_expires_at, {
  //   path: "/",
  //   expires: new Date(refreshTokenExpiresAt),
  // });

  return jwtData.access_token;
}
