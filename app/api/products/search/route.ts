import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json([]);
  }

  const results = await prisma.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          desc: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    take: 6,
    include: {
      category: true, // optional but useful
    },
  });

  return NextResponse.json(results);
}