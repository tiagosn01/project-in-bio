"use client";

import Button from "@/components/ui/button";
import { useStripe } from "@/hooks/useStripe";
import { useParams } from "next/navigation";

export default function PlanButtons() {
  const { profileId } = useParams();
  const { createStripeCheckout } = useStripe();

  return (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          createStripeCheckout({
            metadata: { profileId },
            isSubscription: true,
            isAnual: false,
          })
        }
      >
        R$ 9,90 / mês
      </Button>
      <Button
        onClick={() =>
          createStripeCheckout({
            metadata: { profileId },
            isSubscription: true,
            isAnual: true,
          })
        }
      >
        R$ 99,90 / ano
      </Button>
    </div>
  );
}
