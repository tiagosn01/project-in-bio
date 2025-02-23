import { getUserSession } from "@/lib/auth";
import { db } from "@/lib/firebase";
import stripe from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { metadata, isSubscription, isAnual } = await req.json();

  const price = isAnual
    ? process.env.STRIPE_PRICE_ID_YEAR
    : process.env.STRIPE_PRICE_ID_MONTH;

  const userSession = await getUserSession();

  if (!userSession || !userSession.user?.id || !userSession.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userSession.user?.id;
  const userEmail = userSession.user?.email;
  const userName = userSession.user?.name;

  const userRef = db.collection("users").doc(userId || "");
  const userDoc = await userRef.get();

  let customerId;

  if (userDoc.exists) {
    customerId = userDoc.data()?.customerId;
  }

  if (!customerId) {
    const newCustomer = await stripe.customers.create({
      email: userEmail,
      name: userName || "Sem nome",
      metadata: {
        userId: userId,
      },
    });

    customerId = newCustomer.id;

    await userRef.update({
      customerId,
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode: "subscription",
    payment_method_types: isSubscription ? ["card"] : ["card", "boleto"],
    success_url: `${req.headers.get("origin")}/${metadata.profileId}`,
    cancel_url: `${req.headers.get("origin")}/${metadata.profileId}/upgrade`,
    client_reference_id: userId,
    metadata,
  });

  return NextResponse.json({
    sessionId: session.id,
  });
}
