import { NextResponse } from "next/server";

import { uploadImageToCloudinary } from "@/lib/cloudinary/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const adminSecret = formData.get("admin_secret");
    const file = formData.get("file");

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are supported" },
        { status: 400 },
      );
    }

    const uploadedImage = await uploadImageToCloudinary(file);

    return NextResponse.json(
      {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error uploading image:", error);

    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
