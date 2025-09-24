"use server";
import strava from "strava-v3";

export default async function getAuthorization(token: string) {
  const stravaInfo: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  } = await strava.oauth.getToken(token);
  sessionStorage.setItem("accessToken", stravaInfo.access_token);
  return stravaInfo;
}
