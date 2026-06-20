import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { dodo } from "@/lib/dodo/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { productId, bundleId, customerName, customerEmail, customerMobile } =
      body;

    if (!productId && !bundleId) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }

    if (productId && bundleId) {
      return NextResponse.json({ error: "Only one allowed" }, { status: 400 });
    }

    let item;

    if (productId) {
      item = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
    } else {
      item = await prisma.bundle.findUnique({
        where: {
          id: bundleId,
        },
      });
    }

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (!item.dodoProductId) {
      return NextResponse.json(
        { error: "Dodo product missing" },
        { status: 400 },
      );
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerMobile,

        amount: item.price,

        productId: productId ?? null,
        bundleId: bundleId ?? null,

        paymentStatus: "PENDING",
      },
    });

    const successUrl = productId
      ? `${process.env.NEXT_PUBLIC_APP_URL}/product/${productId}/success`
      : `${process.env.NEXT_PUBLIC_APP_URL}/bundle/${bundleId}/success`;

    const cancelUrl = productId
      ? `${process.env.NEXT_PUBLIC_APP_URL}/product/${productId}/failure`
      : `${process.env.NEXT_PUBLIC_APP_URL}/bundle/${bundleId}/failure`;

    const session = await dodo.checkoutSessions.create({
      product_cart: [
        {
          product_id: item.dodoProductId,
          quantity: 1,
        },
      ],

      customer: {
        email: customerEmail,
        name: customerName,
      },

      metadata: {
        orderId: order.id,
      },

      return_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log("DODO SESSION", session);

    return NextResponse.json({
      checkout_url:
        // we'll verify which field exists
        (session as any).checkout_url ??
        (session as any).payment_link ??
        (session as any).url,
    });
  } catch (error) {
    console.error("Create checkout error:", error);

    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
