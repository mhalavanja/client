import type { TokensData } from "@/types";
import type { Cookies } from "@sveltejs/kit";

export async function setCookiesOnLogin(cookies: Cookies, res: Response, username: string) {
  const tokensData: TokensData = await res.json();
  const refreshTokenExpiresAt: Date = new Date(tokensData.refresh_token_expires_at);
  const accessTokenExpiresAt: Date = new Date(tokensData.access_token_expires_at);

  cookies.set("jwt", tokensData.access_token, {
    path: "/",
    expires: accessTokenExpiresAt,
  });

  cookies.set("refresh_token", tokensData.refresh_token, {
    path: "/",
    expires: refreshTokenExpiresAt,
  });

  cookies.set("username", username, {
    path: "/",
    expires: refreshTokenExpiresAt,
  });
}
