import Stripe from "stripe";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";

import { db } from "@/db/drizzle";
import { stripe } from "@/lib/stripe";
import { subscriptions } from "@/db/schema";
import { checkIsActive } from "@/features/subscriptions/lib";

const app = new Hono()
  .post("/billing", verifyAuth(), async (context) => {
    const auth = context.get("authUser");

    if (!auth.token?.id) {
      return context.json({ error: "Unauthorized" }, 401);
    }

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    if (!subscription) {
      return context.json({ error: "No subscription found" }, 404);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    });

    if (!session.url) {
      return context.json({ error: "Failed to create session" }, 400);
    }

    return context.json({ data: session.url });
  })
  .get("/current", verifyAuth(), async (context) => {
    const auth = context.get("authUser");

    if (!auth.token?.id) {
      return context.json({ error: "Unauthorized" }, 401);
    }

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, auth.token.id));

    const active = checkIsActive(subscription);

    return context.json({
      data: {
        ...subscription,
        active,
      },
    });
  })
  .post("/checkout", verifyAuth(), async (context) => {
    const auth = context.get("authUser");

    if (!auth.token?.id) {
      return context.json({ error: "Unauthorized" }, 401);
    }

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=1`,
      payment_method_types: ["card", "paypal", "kakao_pay"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: auth.token.email ?? "",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      metadata: { userId: auth.token.id },
    });

    const url = session.url;
    if (!url) {
      return context.json({ error: "Failed to create session" }, 400);
    }

    return context.json({ data: url });
  })
  .post("/webhook", async (context) => {
    const body = await context.req.text();
    const signature = context.req.header("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (error) {
      return context.json({ error: "Invalid signature" }, 400);
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      if (!session?.metadata?.userId) {
        return context.json({ error: "Invalid session" }, 400);
      }

      await db.insert(subscriptions).values({
        status: subscription.status,
        userId: session.metadata.userId,
        subscriptionId: subscription.id,
        customerId: subscription.customer as string,
        priceId: subscription.items.data[0].price.product as string,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (event.type === "invoice.payment_succeeded") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      if (!session?.metadata?.userId) {
        return context.json({ error: "Invalid session" }, 400);
      }

      await db
        .update(subscriptions)
        .set({
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.id, subscription.id));
    }

    return context.json(null, 200);
  });

export default app;
