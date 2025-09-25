"use server";
import strava from "strava-v3";
import addToken from "../prisma/addToken";

export default async function getAuthorization({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken?: string;
}) {
  let stravaInfo: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  } | null = null;
  if (accessToken) stravaInfo = await strava.oauth.getToken(accessToken);
  else if (refreshToken)
    stravaInfo = await strava.oauth.refreshToken(refreshToken);
  if (stravaInfo) {
    await addToken({
      refreshToken: stravaInfo.refresh_token,
      expiredDate: new Date(stravaInfo.expires_at),
    });
    return stravaInfo;
  }
  return;
}
