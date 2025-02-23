import { getServerSession } from "next-auth/next";

import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db, firebaseCert } from "./firebase";
import type { AuthOptions, DefaultSession } from "next-auth";
import { Timestamp } from "firebase-admin/firestore";
import { TRIAL_DAYS } from "./config";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      createdAt: number;
      isTrial: boolean;
      isSubscribed?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    createdAt: number;
    isTrial?: boolean;
    isSubscribed?: boolean;
  }
}

export const authOptions: AuthOptions = {
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  events: {
    createUser: async ({ user }) => {
      if (!user.id) return;

      await db.collection("users").doc(user.id).update({
        createdAt: Timestamp.now().toMillis(),
      });
    },
  },
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          isSubscribed: user.isSubscribed,
          isTrial:
            new Date(user.createdAt).getTime() >
              new Date().getTime() - 1000 * 60 * 60 * 24 * TRIAL_DAYS || false,
        },
      };
    },
  },
};

export async function getUserSession() {
  return await getServerSession(authOptions);
}
