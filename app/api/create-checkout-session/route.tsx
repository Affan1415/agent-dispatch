import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const { userEmail, userId, priceId } = await req.json();
    console.log(userEmail, userId, priceId);

    if (!userEmail || !userId || !priceId) {
      return NextResponse.json(
        { error: "Email, userId, and priceId are required" },
        { status: 400 }
      );
    }
    const encodedEmail = encodeURIComponent(userEmail);
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: userEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}&userEmail=${encodedEmail}`,
      cancel_url: `${process.env.NEXT_BASE_URL}/cancel`,
      metadata: { userId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
