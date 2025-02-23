"use client";

import { TrendingUp } from "lucide-react";
import PortalButton from "./portal-button";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

export default function TotalVisits({
  totalVisits = 0,
  showBar = false,
  session,
}: {
  totalVisits?: number;
  showBar: boolean;
  session: Session | null;
}) {
  return (
    <div className="flex w-min items-center gap-5 whitespace-nowrap rounded-xl border border-border-primary bg-background-secondary px-8 py-3 shadow-lg">
      <span className="font-bold text-white">Total de visitas</span>
      <div className="flex items-center gap-2 text-accent-green">
        <span className="text-3xl font-bold">{totalVisits}</span>
        <TrendingUp />
      </div>
      {showBar && (
        <div className="flex items-center gap-2">
          {session?.user.isSubscribed && <PortalButton />}

          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
