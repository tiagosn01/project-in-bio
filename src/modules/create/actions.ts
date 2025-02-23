"use server";
import { authOptions, getUserSession } from "@/lib/auth";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { db, storage } from "@/lib/firebase";

export async function createLink(link: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return;
  try {
    await db.collection("profiles").doc(link).set({
      userId: session.user.id,
      totalVisits: 0,
      createdAt: Timestamp.now().toMillis(),
    });
    return true;
  } catch (error) {
    console.error("created", error);
    return false;
  }
}

export async function verifyLink(link: string) {
  const snapshot = await db.collection("profiles").doc(link).get();
  return snapshot.exists;
}

export async function createProject(formData: FormData) {
  const session = await getUserSession();
  if (!session) return;

  const profileId = formData.get("profileId") as string;
  const projectName = formData.get("projectName") as string;
  const projectDescription = formData.get("projectDescription") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const file = formData.get("file") as File;

  const generatedId = randomUUID();

  const storageRef = storage.file(`project-images/${profileId}/${generatedId}`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await storageRef.save(buffer);

  const imagePath = storageRef.name;

  try {
    await db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(generatedId)
      .set({
        id: generatedId,
        userId: session.user?.id,
        projectName,
        projectDescription,
        projectUrl,
        imagePath,
        createdAt: Timestamp.now().toMillis(),
      });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function increaseProjectVisits(
  profileId: string,
  projectId: string,
) {
  const projectRef = db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .doc(projectId);

  await db.runTransaction(async (transaction) => {
    const projectDoc = await transaction.get(projectRef);

    if (!projectDoc.exists) return;

    transaction.update(projectRef, { totalVisits: FieldValue.increment(1) });
  });
}
