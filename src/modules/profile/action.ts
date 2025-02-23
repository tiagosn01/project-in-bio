"use server";
import { getUserSession } from "@/lib/auth";
import { db, storage } from "@/lib/firebase";
import type { Link } from "@/server/profile/types/profile";
import { randomUUID } from "crypto";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export async function createSocialLinks({
  profileId,
  github,
  instagram,
  linkedin,
  twitter,
}: {
  profileId: string;
  github: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}) {
  const session = await getUserSession();
  if (!session) return;
  try {
    await db.collection("profiles").doc(profileId).update({
      socialMedias: {
        github,
        instagram,
        linkedin,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addCustomLinks({
  link1,
  link2,
  link3,
  profileId,
}: {
  profileId: string;
  link1: Link;
  link2: Link;
  link3: Link;
}) {
  const session = await getUserSession();

  if (!session) return;
  try {
    await db.collection("profiles").doc(profileId).update({
      link1,
      link2,
      link3,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function saveProfile(formData: FormData) {
  const session = await getUserSession();

  if (!session) return;

  try {
    const profileId = formData.get("profileId") as string;
    const yourName = formData.get("yourName") as string;
    const yourDescription = formData.get("yourDescription") as string;
    const file = formData.get("profilePic") as File;

    let imagePath = null;

    const hasFile = file && file.size > 0;

    if (hasFile) {
      const currentProfile = await db
        .collection("profiles")
        .doc(profileId)
        .get();
      const currentImagePath = currentProfile.data()?.imagePath;

      if (currentImagePath) {
        const currentStorageRef = storage.file(currentImagePath);
        const [exists] = await currentStorageRef.exists();

        if (exists) {
          await currentStorageRef.delete();
        }
      }

      const storageRef = storage.file(
        `profiles-images/${profileId}/${randomUUID()}`,
      );
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await storageRef.save(buffer);

      imagePath = storageRef.name;
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        name: yourName,
        description: yourDescription,
        ...(hasFile && { imagePath }),
        updatedAt: Timestamp.now().toMillis(),
      });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function increaseProfileVisits(profileId: string) {
  const profileRef = db.collection("profiles").doc(profileId);

  await db.runTransaction(async (transaction) => {
    const profile = await transaction.get(profileRef);

    if (!profile.exists) return;

    transaction.update(profileRef, { totalVisits: FieldValue.increment(1) });
  });
}
