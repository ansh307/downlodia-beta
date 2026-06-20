// app/admin/products/new/page.tsx
"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

import { getAdminSecretFromDocument } from "@/lib/admin-secret";
import { categories } from "@/data/categories";

import {
  ImageIcon,
  UploadCloud,
  Tag,
  Layers,
  Package,
  Truck,
  House,
  Zap,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

type ProductFormValues = {
  title: string;
  desc: string;
  brief: string;
  price: Number;
  originalPrice: Number;
  discount: Number;
  badge: string;
  tools: string;
  features: string;
  compatibleWith: string;
  categoryId: string;
  driveLink: string;
  isFeatured: boolean;
  isActive: boolean;
};

const defaultValues: ProductFormValues = {
  title: "",
  desc: "",
  brief: "",
  price: 0,
  originalPrice: 0,
  discount: 0,
  badge: "",
  tools: "",
  features: "",
  compatibleWith: "",
  categoryId: "",
  driveLink: "",
  isFeatured: false,
  isActive: true,
};

function splitList(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function uploadSelectedImage(file: File, adminSecret: string) {
  const uploadFormData = new FormData();

  uploadFormData.append("file", file);
  uploadFormData.append("admin_secret", adminSecret);

  const response = await fetch("/api/admin/products/upload", {
    method: "POST",
    body: uploadFormData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to upload image");
  }

  const data = await response.json();

  if (!data.url || typeof data.url !== "string") {
    throw new Error("Upload response did not include an image URL");
  }

  return data.url as string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [primaryImagePreview, setPrimaryImagePreview] = useState("");
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>(
    [],
  );
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProductFormValues>({ defaultValues });

  const isFeatured = watch("isFeatured");
  const isActive = watch("isActive");

  const originalPrice = watch("originalPrice");
  const discount = watch("discount");

  useEffect(() => {
    const op = Number(originalPrice) || 0;
    const dis = Number(discount) || 0;

    const calculatedPrice = op - (op * dis) / 100;

    setValue("price", calculatedPrice);
  }, [originalPrice, discount, setValue]);

  useEffect(() => {
    return () => {
      if (primaryImagePreview) {
        URL.revokeObjectURL(primaryImagePreview);
      }

      galleryImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [primaryImagePreview, galleryImagePreviews]);

  const handlePrimaryImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setImageError("");
    setPrimaryImageFile(file);

    setPrimaryImagePreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }

      return file ? URL.createObjectURL(file) : "";
    });
  };

  const handleGalleryImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newlySelectedFiles = Array.from(e.target.files ?? []);

    setGalleryImageFiles((currentFiles) => {
      const dedupedNewFiles = newlySelectedFiles.filter(
        (newFile) =>
          !currentFiles.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size &&
              existingFile.lastModified === newFile.lastModified,
          ),
      );

      const mergedFiles = [...currentFiles, ...dedupedNewFiles];

      if (mergedFiles.length > 3) {
        setImageError("You can select a maximum of 3 gallery images.");
        e.target.value = "";
        return currentFiles;
      }

      setImageError("");
      setGalleryImagePreviews((currentPreviews) => {
        currentPreviews.forEach((preview) => URL.revokeObjectURL(preview));
        return mergedFiles.map((file) => URL.createObjectURL(file));
      });

      e.target.value = "";
      return mergedFiles;
    });
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
    setLoading(true);
    setImageError("");

    const adminSecret =
      new URLSearchParams(window.location.search).get("admin_secret") ??
      getAdminSecretFromDocument();

    if (!adminSecret) {
      setLoading(false);
      return;
    }

    const primaryFile = primaryImageFile;

    if (!primaryFile) {
      setImageError("Primary image is required.");
      setLoading(false);
      return;
    }

    const galleryFiles = galleryImageFiles;

    try {
      const [primaryImageUrl, ...galleryImageUrls] = await Promise.all([
        uploadSelectedImage(primaryFile, adminSecret),
        ...galleryFiles.map((file) => uploadSelectedImage(file, adminSecret)),
      ]);

      const imageUrls = [primaryImageUrl, ...galleryImageUrls];

      const response = await fetch(
        `/api/admin/products?admin_secret=${adminSecret}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: values.title,
            desc: values.desc,
            brief: values.brief,
            price: values.price,
            originalPrice: values.originalPrice,
            discount: values.discount,
            image: primaryImageUrl,
            images: imageUrls,
            badge: values.badge,
            tools: splitList(values.tools),
            features: splitList(values.features),
            compatibleWith: splitList(values.compatibleWith),
            categoryId: values.categoryId,
            driveLink: values.driveLink,
            isFeatured: values.isFeatured,
            isActive: values.isActive,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || "Failed to create product");
      }
      toast.success("Product created successfully!");

      reset(defaultValues);
      setPrimaryImageFile(null);
      setGalleryImageFiles([]);
      if (primaryImagePreview) {
        URL.revokeObjectURL(primaryImagePreview);
      }
      galleryImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setPrimaryImagePreview("");
      setGalleryImagePreviews([]);
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Add New Product
            </h1>
            <p className="text-sm text-gray-500">
              Create a new product and publish it to your store.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Core Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h2 className="font-medium flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-md">
                  <Layers className="w-4 h-4 text-indigo-600" />
                </div>
                Core Details
              </h2>

              <label
                htmlFor="title"
                className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
              >
                <span>Title</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                placeholder="Enter product title"
                {...register("title")}
                className="input"
              />

              <label
                htmlFor="short-description"
                className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
              >
                <span>Short Description</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="short-description"
                placeholder="Short description"
                {...register("desc")}
                className="input h-20"
              />

              <label
                htmlFor="long-description"
                className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
              >
                <span>Long Description</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="long-description"
                placeholder="Long description"
                {...register("brief")}
                className="input h-28"
              />

              <div className="grid grid-cols-3 gap-3">
                {/* PRICE (DISABLED) */}
                <div>
                  <label className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700">
                    <span>Price (in ₹)</span>
                  </label>
                  <input
                    type="number"
                    {...register("price")}
                    disabled
                    className="input cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="original-price"
                    className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
                  >
                    <span>Original Price</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="original-price"
                    type="number"
                    placeholder="Original"
                    {...register("originalPrice")}
                    className="input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="discount"
                    className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
                  >
                    <span>Discount (%)</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="discount"
                    type="number"
                    placeholder="Discount %"
                    {...register("discount")}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`checkbox  transition-colors duration-200 ${
                    isFeatured
                      ? "bg-indigo-50 border-indigo-300"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <input type="checkbox" {...register("isFeatured")} />
                  <div className="ml-2 space-y-2">
                    <div className="flex gap-2">
                      <House className="text-indigo-600 w-4.5 h-4.5" />
                      <p className={`${isFeatured && "text-indigo-600"}`}>
                        Feature on homepage
                      </p>
                    </div>
                    <p className="text-gray-400">
                      Display this product on the homepage
                    </p>
                  </div>
                </label>

                <label
                  className={`checkbox  transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-50 border-indigo-300"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <input type="checkbox" {...register("isActive")} />
                  <div className="ml-2 space-y-2">
                    <div className="flex gap-2">
                      <Zap className="text-indigo-600 w-4.5 h-4.5" />
                      <p className={`${isActive && "text-indigo-600"}`}>
                        Active immediately
                      </p>
                    </div>
                    <p className="text-gray-400">
                      Make this product available right away
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Compatibility */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h2 className="font-medium flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-md">
                  <Package className="w-4 h-4 text-indigo-600" />
                </div>
                Compatibility
              </h2>

              <input
                placeholder="Pr, Ae, Final Cut..."
                {...register("compatibleWith")}
                className="input"
              />
            </div>

            {/* Features */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h2 className="font-medium flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-md">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                </div>
                Features
              </h2>

              <textarea
                rows={4}
                placeholder="Lifetime access, Commercial license, Instant download"
                {...register("features")}
                className="input"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Media */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h2 className="font-medium flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-md">
                  <ImageIcon className="w-4 h-4 text-indigo-600" />
                </div>
                Media & Gallery
              </h2>

              {/* Primary Image */}
              <div className="space-y-3">
                <label
                  htmlFor="primary-image"
                  className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
                >
                  <span>Primary Image</span>
                  <span className="text-red-500">*</span>
                </label>

                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition">
                  <UploadCloud className="mx-auto mb-2 text-indigo-500" />

                  <p className="text-sm text-gray-500">
                    Click or drag to upload
                  </p>

                  <input
                    id="primary-image"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handlePrimaryImageChange}
                    className="hidden"
                  />
                </label>

                {/* Status */}
                <p className="text-xs text-gray-500">
                  {primaryImageFile
                    ? `Selected: ${primaryImageFile.name}`
                    : "No image selected"}
                </p>

                {/* Preview */}
                {primaryImagePreview && (
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <img
                      src={primaryImagePreview}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Gallery */}
              <div className="space-y-3">
                <label
                  htmlFor="gallery-image"
                  className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
                >
                  <span>
                    Gallery Image
                    <span className="text-xs ml-2">(max 3)</span>
                  </span>
                  <span className="text-red-500">*</span>
                </label>

                {/* Upload Box */}
                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition">
                  <UploadCloud className="mx-auto mb-2 text-indigo-500" />

                  <p className="text-sm text-gray-500">
                    Click or drag to upload
                  </p>

                  <input
                    id="gallery-image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImagesChange}
                    className="hidden"
                  />
                </label>

                {/* Count */}
                <p className="text-xs text-gray-500">
                  {galleryImageFiles.length} of 3 images selected
                </p>

                {/* File names */}
                {galleryImageFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {galleryImageFiles.map((file) => (
                      <span
                        key={file.name}
                        className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded"
                      >
                        {file.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Preview Grid */}
                {galleryImagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {galleryImagePreviews.map((preview, i) => (
                      <div
                        key={i}
                        className="relative border rounded-lg overflow-hidden"
                      >
                        <img
                          src={preview}
                          className="h-24 w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Error */}
                {imageError && (
                  <p className="text-sm text-red-600">{imageError}</p>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h2 className="font-medium flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-md">
                  <Tag className="w-4 h-4 text-indigo-600" />
                </div>
                Product Information
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="badge"
                    className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
                  >
                    <span>Badge</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="Badge"
                    placeholder="Badge (e.g. Best Seller)"
                    {...register("badge")}
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
                  >
                    <span>Category</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    {...register("categoryId")}
                    className="input"
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label
                htmlFor="tools"
                className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
              >
                <span>Tools</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="tools"
                placeholder="Tools (Pr, Ae, Lr)"
                {...register("tools")}
                className="input"
              />
            </div>

            {/* Delivery */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h2 className="font-medium flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-md">
                  <Truck className="w-4 h-4 text-indigo-600" />
                </div>
                Delivery
              </h2>

              <label
                htmlFor="gdlink"
                className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
              >
                <span>Google Drive link</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                id="gdlink"
                placeholder="Google Drive link"
                {...register("driveLink")}
                className="input"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
