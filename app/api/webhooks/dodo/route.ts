import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend/client";
import { dodo } from "@/lib/dodo/client";

export async function POST(req: Request) {
  try {
    let payload;

    try {
      const rawBody = await req.text();

      payload = dodo.webhooks.unwrap(rawBody, {
        headers: {
          "webhook-id": req.headers.get("webhook-id") || "",
          "webhook-signature": req.headers.get("webhook-signature") || "",
          "webhook-timestamp": req.headers.get("webhook-timestamp") || "",
        },
      });
    } catch (err) {
      console.error("Invalid Dodo webhook signature:", err);

      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const eventType = payload.type;

    const paymentData = payload.data as {
      metadata?: {
        orderId?: string;
      };
      payment_id?: string;
    };

    const orderId = paymentData.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        product: true,
        bundle: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    // Payment Failed
    if (eventType === "payment.failed") {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentStatus: "FAILED",
        },
      });

      console.log(`Payment failed for order ${order.id}`);

      return NextResponse.json({
        success: true,
      });
    }

    // Payment Success
    if (eventType === "payment.succeeded") {
      // Prevent duplicate webhook processing
      if (order.paymentStatus === "PAID") {
        return NextResponse.json({
          success: true,
        });
      }

      const item = order.product ?? order.bundle;

      if (!item) {
        return NextResponse.json(
          { error: "Invalid order item" },
          { status: 400 },
        );
      }

      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentStatus: "PAID",
          dodoPaymentId: paymentData.payment_id,
        },
      });

      // Send email only once
      if (!order.emailSent) {
        try {
          const year = new Date().getFullYear();

          const emailResult = await resend.emails.send({
            from: "Downlodia <noreply@downlodia.in>",
            to: order.customerEmail,
            subject: `Your Download is Ready - ${item.title}`,
            html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Your Download is Ready</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7fb;padding:40px 20px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">

<tr>
<td align="center" style="background:#111827;padding:32px;">
<h1 style="margin:0;color:#ffffff;font-size:28px;">
Downlodia
</h1>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#111827;">
Thank you for your purchase!
</h2>

<p style="color:#4b5563;font-size:16px;line-height:1.7;">
Your payment has been successfully confirmed and your digital product is now ready for download.
</p>

<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:24px 0;">
<p style="margin:0;font-size:14px;color:#6b7280;">
Product
</p>

<p style="margin:8px 0 0;font-size:18px;font-weight:600;color:#111827;">
${item.title}
</p>
</div>

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">
<a
href="${item.driveLink}"
style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:16px;font-weight:600;"
>
Download Product
</a>
</td>
</tr>
</table>

<p style="margin-top:32px;color:#6b7280;font-size:14px;line-height:1.6;">
Please save your downloaded files immediately after download.
</p>

<p style="color:#6b7280;font-size:14px;line-height:1.6;">
This product has been delivered to:
<strong>${order.customerEmail}</strong>
</p>

</td>
</tr>

<tr>
<td style="padding:24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
<p style="margin:0;text-align:center;color:#9ca3af;font-size:12px;">
© ${year} Downlodia. All rights reserved.
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>
`,
            text: `
Thank you for your purchase!

Your payment has been successfully confirmed.

Product:
${item.title}

Download Link:
${item.driveLink}

Delivered To:
${order.customerEmail}

© Downlodia ${year}
`,
          });

          console.log("Dodo email result:", emailResult);

          await prisma.order.update({
            where: {
              id: order.id,
            },
            data: {
              emailSent: true,
            },
          });
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
        }
      }

      console.log(`Payment successful for order ${order.id}`);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Dodo webhook error:", error);

    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
