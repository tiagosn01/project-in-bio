"use server";

import { db } from "../../lib/firebase";
import type { ProfileData, ProjectData } from "./types/profile";

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).get();
  return snapshot.data() as ProfileData;
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .get();
  return snapshot.docs.map((doc) => doc.data() as ProjectData);
}

export async function getProfileId(userId: string) {
  if (!userId) return null;

  const snapshot = await db
    .collection("profiles")
    .where("userId", "==", userId)
    .get();

  return snapshot.docs.map((doc) => doc.id)[0];
}
