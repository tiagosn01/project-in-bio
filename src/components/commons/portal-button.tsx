"use client";

import { useStripe } from "@/hooks/useStripe";

export default function PortalButton() {
  const { handleCreateStripePortal } = useStripe();

  return <button onClick={handleCreateStripePortal}>Portal</button>;
}
