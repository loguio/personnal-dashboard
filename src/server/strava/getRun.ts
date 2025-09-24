"use server";
import { Activity } from "@/types/strava/activity";
import strava from "strava-v3";

export default async function getRun(token: string) {
  const today = new Date();

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  try {
    const activities: Activity[] = await strava.athlete.listActivities({
      access_token: token,
      per_page: 10,
      page: 1,
      after: Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000),
    });
    console.log(activities);
  } catch (e) {
    console.log(e);
  }
}
