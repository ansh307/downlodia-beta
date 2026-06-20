// app/admin/bundles/new/page.tsx
"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

import { getAdminSecretFromDocument } from "@/lib/admin-secret";

import { Tag, Layers, Truck, House, Zap } from "lucide-react";
import { toast } from "sonner";

type BundleFormValues = {
  title: string;
  desc: string;
  price: Number;
  originalPrice: Number;
  discount: Number;
  badge: string;

  features: string;

  driveLink: string;
  isFeatured: boolean;
  isActive: boolean;
};

const defaultValues: BundleFormValues = {
  title: "",
  desc: "",
  price: 0,
  originalPrice: 0,
  discount: 0,
  badge: "",
  features: "",
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

export default function NewBundlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bundleExists, setBundleExists] = useState(false);

  useEffect(() => {
    const checkBundle = async () => {
      const adminSecret =
        new URLSearchParams(window.location.search).get("admin_secret") ??
        getAdminSecretFromDocument();

      if (!adminSecret) return;

      const res = await fetch(`/api/admin/bundles`);

      const data = await res.json();

      if (data.bundles?.length > 0) {
        setBundleExists(true);
      }
    };

    checkBundle();
  }, []);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<BundleFormValues>({ defaultValues });

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

  const onSubmit: SubmitHandler<BundleFormValues> = async (values) => {
    setLoading(true);

    const adminSecret =
      new URLSearchParams(window.location.search).get("admin_secret") ??
      getAdminSecretFromDocument();

    if (!adminSecret) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/bundles?admin_secret=${adminSecret}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: values.title,
            desc: values.desc,
            price: values.price,
            originalPrice: values.originalPrice,
            discount: values.discount,
            badge: values.badge,
            features: splitList(values.features),
            driveLink: values.driveLink,
            isFeatured: values.isFeatured,
            isActive: values.isActive,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || "Failed to create Bundles");
      }
      toast.success("Bundles created successfully!");
      reset(defaultValues);

      router.push("/admin/bundles");
    } catch (error) {
      console.error("Failed to create Bundles:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleFormSubmit(onSubmit)}
        className={`space-y-6 ${bundleExists ? "pointer-events-none" : ""}`}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Add New Bundle
            </h1>
            <p className="text-sm text-gray-500">
              Create a new bundle and publish it to your store.
            </p>

            {bundleExists && (
              <div className="p-3 mt-3 bg-red-100 text-red-600 rounded-lg text-sm">
                Only one bundle is allowed. Delete existing bundle to create a
                new one.
              </div>
            )}
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
              disabled={loading || bundleExists}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {bundleExists
                ? "Only 1 bundle allowed"
                : loading
                  ? "Saving..."
                  : "Save Bundle"}
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
                placeholder="Enter bundle title"
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
                      Display this bundle on the homepage
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
                      Make this bundle available right away
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Bundle Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <h2 className="font-medium flex items-center gap-2">
                <div className="p-2 bg-indigo-50 rounded-md">
                  <Tag className="w-4 h-4 text-indigo-600" />
                </div>
                Bundle Information
              </h2>

              {/* Features */}
              <label
                htmlFor="features"
                className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"
              >
                <span>Features</span>
                <span className="text-red-500">*</span>
              </label>

              <textarea
                id="features"
                rows={4}
                placeholder="Lifetime access, Commercial license, Instant download"
                {...register("features")}
                className="input"
              />

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
