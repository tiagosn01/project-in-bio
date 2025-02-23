"use client";

import type { Session } from "next-auth";
import Button from "../ui/button";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

interface Props {
  session: Session | null;
  profileId?: string | null;
}

export default function Header({ session, profileId }: Props) {
  const [loading, setLoading] = useState(false);
  const manageAuth = async () => {
    if (!session) {
      setLoading(true);
      const callback = await signIn("google", { callbackUrl: "/create" });
      setLoading(false);

      return callback;
    }
    return await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="absolute left-0 right-0 top-0 mx-auto flex max-w-7xl items-center justify-between py-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="ProjectInBio Logo" />
        <h3 className="text-2xl font-bold text-white">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">
        {session && (
          <Link href={`/${profileId}`}>
            <Button>Minha Página</Button>
          </Link>
        )}

        <Button
          onClick={manageAuth}
          className={loading ? "opacity-50" : ""}
          disabled={loading}
        >
          {session ? "Sair" : "Login"}
        </Button>
      </div>
    </header>
  );
}
