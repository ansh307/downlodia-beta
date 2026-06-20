// app/api/admin/bundles/route.ts
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { categories } from "@/data/categories";
import { dodo } from "@/lib/dodo/client";

function toLegacyBundleShape(bundle: {
  desc: string | null;
  [key: string]: unknown;
}) {
  return {
    ...bundle,
    description: bundle.desc ?? null,
  };
}

function splitList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function toOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toOptionalNumber(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue = typeof value === "number" ? value : Number(value);

  return Number.isFinite(numericValue) ? numericValue : null;
}

function toInteger(value: unknown) {
  const numericValue = toOptionalNumber(value);

  if (numericValue === null) {
    return null;
  }

  return Math.round(numericValue);
}

async function resolveCategoryId(value: unknown) {
  const categoryToken = toOptionalString(value);

  if (!categoryToken) {
    return null;
  }

  const category = await prisma.category.findFirst({
    where: {
      OR: [{ id: categoryToken }, { slug: categoryToken }],
    },
    select: { id: true },
  });

  if (category) {
    return category.id;
  }

  const categoryData = categories.find(
    (item) => item.slug === categoryToken || String(item.id) === categoryToken,
  );

  if (!categoryData) {
    return undefined;
  }

  const createdCategory = await prisma.category.create({
    data: {
      slug: categoryData.slug,
      name: categoryData.title,
    },
    select: { id: true },
  });

  return createdCategory.id;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // const adminSecret = searchParams.get("admin_secret");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    // ✅ Auth check
    // if (adminSecret !== process.env.ADMIN_SECRET) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const skip = (page - 1) * limit;

    // ✅ Parallel queries (faster)
    const [bundles, total] = await Promise.all([
      prisma.bundle.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },

        // ✅ ONLY select what you need
        select: {
          id: true,
          title: true,
          isActive: true,
          createdAt: true,
          originalPrice: true,
          discount: true,
          desc: true,
          price: true,
          features: true,
          badge: true,
          isFeatured: true,
        },
      }),

      prisma.bundle.count(),
    ]);

    return NextResponse.json({
      bundles: bundles.map(toLegacyBundleShape),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bundles" },
      { status: 500 },
    );
  }
}

// POST - Create new bundle
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminSecret = searchParams.get("admin_secret");

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const title = toOptionalString(body.title);
    const desc = toOptionalString(body.desc ?? body.description);
    const price = toInteger(body.price);
    const originalPrice = toInteger(body.originalPrice);
    const discount = toOptionalNumber(body.discount);
    const badge = toOptionalString(body.badge);
    const driveLink = toOptionalString(body.driveLink);

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (price === null) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }

    if (!originalPrice || !discount) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }

    if (discount !== null && (discount < 0 || discount > 100)) {
      return NextResponse.json(
        { error: "Discount must be between 0 and 100" },
        { status: 400 },
      );
    }

    // CHECK if bundle already exists
    const existingBundle = await prisma.bundle.findFirst();

    if (existingBundle) {
      return NextResponse.json(
        { error: "Only one bundle is allowed" },
        { status: 400 },
      );
    }

    // 💳 Create Dodo Product FIRST
    let dodoProductId: string;

    try {
      const dodoProduct = await dodo.products.create({
        name: title,
        description: desc ?? title,

        price: {
          currency: "INR",
          price: price * 100, // convert ₹ → paise
          type: "one_time_price",
          discount: 0,
          purchasing_power_parity: false,
        },

        tax_category: "digital_products",
      });

      dodoProductId = dodoProduct.product_id;
    } catch (err) {
      console.error("Dodo bundle creation failed:", err);

      return NextResponse.json(
        { error: "Failed to create bundle in payment system" },
        { status: 500 },
      );
    }

    const bundle = await prisma.bundle.create({
      data: {
        id: crypto.randomUUID(),
        title,
        isFeatured: Boolean(body.isFeatured),
        desc,
        price,
        originalPrice,
        discount,
        badge,
        driveLink,
        features: splitList(body.features),
        isActive: body.isActive === undefined ? true : Boolean(body.isActive),
        dodoProductId,
      },
    });

    return NextResponse.json(toLegacyBundleShape(bundle), { status: 201 });
  } catch (error) {
    console.error("Error creating bundle:", error);
    return NextResponse.json(
      { error: "Failed to create bundle" },
      { status: 500 },
    );
  }
}

// DELETE - Delete bundle
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminSecret = searchParams.get("admin_secret");
    const id = searchParams.get("id");

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Bundle ID required" },
        { status: 400 },
      );
    }

    const existing = await prisma.bundle.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
    }

    await prisma.bundle.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting bundle:", error);
    return NextResponse.json(
      { error: "Failed to delete bundle" },
      { status: 500 },
    );
  }
}
