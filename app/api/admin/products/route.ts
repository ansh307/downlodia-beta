// app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { prisma } from "@/lib/db";
import { categories } from "@/data/categories";
import { cloudinary } from "@/lib/cloudinary/client";
import { dodo } from "@/lib/dodo/client";

function toLegacyProductShape(product: {
  image: string | null;
  images: string[];
  desc: string | null;
  brief: string | null;
  [key: string]: unknown;
}) {
  return {
    ...product,
    description: product.desc ?? product.brief ?? null,
    imageUrl:
      product.images.length > 0
        ? product.images
        : product.image
          ? [product.image]
          : [],
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

    const adminSecret = searchParams.get("admin_secret");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    // ✅ Auth check
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skip = (page - 1) * limit;

    // ✅ Parallel queries (faster)
    const [products, total] = await Promise.all([
      prisma.product.findMany({
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
          images: true,
          image: true, // ✅ add this
          desc: true, // ✅ add this
          brief: true, // ✅ add this
        },
      }),

      prisma.product.count(),
    ]);

    return NextResponse.json({
      products: products.map(toLegacyProductShape),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST - Create new product
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
    const brief = toOptionalString(body.brief);
    const image = toOptionalString(body.image);
    const legacyImages = splitList(body.images ?? body.imageUrl);
    const images =
      legacyImages.length > 0 ? legacyImages : image ? [image] : [];
    const price = body.price !== undefined ? toInteger(body.price) : null;
    const originalPrice =
      body.originalPrice !== undefined ? toInteger(body.originalPrice) : null;
    const discount = toOptionalNumber(body.discount);
    const badge = toOptionalString(body.badge);
    const driveLink = toOptionalString(body.driveLink);
    const categoryId = await resolveCategoryId(body.categoryId);

    if (!title || !originalPrice || !discount) {
      return NextResponse.json(
        { error: "Missing feilds are required" },
        { status: 400 },
      );
    }

    if (price === null) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 },
      );
    }

    if (categoryId === undefined) {
      return NextResponse.json(
        {
          error: "Invalid category selection.",
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        id: crypto.randomUUID(),
        title,
        isFeatured: Boolean(body.isFeatured),
        categoryId,
        desc,
        brief,
        price,
        originalPrice,
        discount,
        image,
        images,
        badge,
        tools: splitList(body.tools),
        features: splitList(body.features),
        compatibleWith: splitList(body.compatibleWith),
        driveLink,
        isActive: body.isActive === undefined ? true : Boolean(body.isActive),
      },
    });
    try {
      const dodoProduct = await dodo.products.create({
        name: title,
        description: desc ?? brief ?? title,

        price: {
          currency: "INR",
          price: price * 100,
          type: "one_time_price",

          discount: 0,
          purchasing_power_parity: false,
        },

        tax_category: "digital_products",
      });

      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          dodoProductId: dodoProduct.product_id,
        },
      });
    } catch (err) {
      console.error("Dodo product creation failed:", err);
    }

    // @ts-expect-error
    revalidateTag("products"); // cache
    revalidatePath("/"); // homepage
    revalidatePath("/all-products"); // all products page

    return NextResponse.json(toLegacyProductShape(product), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}

// DELETE - Delete product
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
        { error: "Product ID required" },
        { status: 400 },
      );
    }

    // ✅ Get product first (important)
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        image: true,
        images: true,
        dodoProductId: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // ✅ Collect all image URLs
    const allImages = [
      ...(product.images || []),
      ...(product.image ? [product.image] : []),
    ];

    // console.log("ALLL IMAGES FOR CLOUDNIMARY", allImages);

    // ✅ Delete from Cloudinary
    await Promise.all(
      allImages.map(async (url) => {
        const publicId = getPublicIdFromUrl(url);
        // console.log("ALLL CLOUDINARY publicId HELLO", publicId);

        if (!publicId) return;

        try {
          const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
            invalidate: true,
          });

          // console.log("DELETE RESULT:", result);
        } catch (err) {
          console.error("Cloudinary delete error:", err);
        }
      }),
    );

    if (product?.dodoProductId) {
      try {
        await dodo.products.archive(product.dodoProductId);
      } catch (err) {
        console.error("Failed to archive Dodo product:", err);
      }
    }

    // ✅ Delete from DB
    await prisma.product.delete({
      where: { id },
    });
    // @ts-ignore
    revalidateTag("products"); // cache
    revalidatePath("/"); // homepage
    revalidatePath("/all-products"); // all products page

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

function getPublicIdFromUrl(url: string) {
  try {
    const parts = url.split("/");

    // Find "upload" index
    const uploadIndex = parts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) return null;

    // Remove version (v123456789)
    let publicIdParts = parts.slice(uploadIndex + 1);

    if (publicIdParts[0].startsWith("v")) {
      publicIdParts = publicIdParts.slice(1);
    }

    const publicIdWithExt = publicIdParts.join("/");

    // Remove extension
    return publicIdWithExt.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}
