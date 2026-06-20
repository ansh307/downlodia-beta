"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Product, Bundle } from "@/types/product";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface CheckoutFormProps {
  item: Product | Bundle;
  type: "product" | "bundle";
}
// Define the shape of your form data
type CheckoutFormData = {
  name: string;
  email: string;
  confirmEmail: string;
  mobile: string;
  termsAccepted: boolean;
};

export default function CheckoutForm({ item, type }: CheckoutFormProps) {
  const id = item.id;
  const title = item.title;
  const price = item.price;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    mode: "onBlur", // Validate on blur for better UX
  });
  const termsAccepted = watch("termsAccepted");

  const [loading, setLoading] = useState(false);

  const emailValue = watch("email");
  const confirmEmailValue = watch("confirmEmail");
  const isEmailMismatch =
    Boolean(emailValue) &&
    Boolean(confirmEmailValue) &&
    emailValue !== confirmEmailValue;

  // The onSubmit function receives the validated form data directly
  const onSubmit = async (data: CheckoutFormData) => {
    if (loading) return;

    setLoading(true);

    try {
      // 1. Create order
      const orderRes = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: type === "product" ? id : null,
          bundleId: type === "bundle" ? id : null,
          customerName: data.name,
          customerEmail: data.email,
          customerMobile: data.mobile,
        }),
      });

      if (!orderRes.ok) {
        const errText = await orderRes.text();

        console.error("Order API error:", errText);

        toast.error("Failed to create checkout session.");

        setLoading(false);
        return;
      }

      const checkoutData = await orderRes.json();

      console.log("CHECKOUT RESPONSE:", checkoutData);

      window.location.href = checkoutData.checkout_url;
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
        <p className="text-sm text-indigo-600 mb-2 flex gap-2 items-center">
          <LockKeyhole className="w-4.5 h-4.5" /> Secure Checkout
        </p>

        <h2 className="text-2xl font-semibold mb-1">
          Enter Your Details below
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Complete your purchase by providing your details below.
        </p>

        {/* Pass handleSubmit from react-hook-form to the form's onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Full name is required" })}
              className="w-full px-4 py-3 border border-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 border border-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Confirm Email Address"
              {...register("confirmEmail", {
                required: "Please confirm your email",
                validate: (value) =>
                  value === emailValue || "Email addresses do not match",
              })}
              className="w-full px-4 py-3 border border-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Real-time mismatch warning */}
          {isEmailMismatch && (
            <div className="flex items-center gap-1 text-xs text-red-500 -mt-2 mb-2">
              <span>Email addresses do not match</span>
            </div>
          )}

          <div>
            <input
              type="tel"
              placeholder="Mobile Number"
              maxLength={10}
              onInput={(e: any) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              {...register("mobile", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit Indian phone number",
                },
              })}
              className="w-full px-4 py-3 border border-gray-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {errors.mobile && (
              <p className="text-xs text-red-500 mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-800 mb-2">
              Important Delivery Notice
            </p>

            <ul className="text-xs text-amber-700 space-y-1 list-disc pl-4">
              <li>
                Your digital product download link will be delivered to the
                email address entered above.
              </li>
              <li>
                Please ensure the email address is correct and accessible before
                proceeding with payment.
              </li>
              <li>
                Once payment is successfully completed and the download email is
                sent, delivery is considered fulfilled.
              </li>
              <li>
                Customers are solely responsible for providing a valid email
                address.
              </li>
              <li>
                Refunds or replacements may not be available for purchases made
                using an incorrect email address.
              </li>
            </ul>
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                {...register("termsAccepted", {
                  required: "You must agree to the terms before proceeding",
                })}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span>
                I have read and agree to the{" "}
                <a
                  href="/legal/terms-and-conditions"
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  Terms & Conditions
                </a>
                ,{" "}
                <a
                  href="/legal/privacy-policy"
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  Privacy Policy
                </a>
                ,{" "}
                <a
                  href="/legal/refund-policy"
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  Refund Policy
                </a>
                ,{" "}
                <a
                  href="/legal/delivery-policy"
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  Delivery Policy
                </a>
                , and{" "}
                <a
                  href="/legal/license-agreement"
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  License Agreement
                </a>
                .
              </span>
            </label>

            {errors.termsAccepted && (
              <p className="text-xs text-red-500 mt-1">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          {/* Total Box */}
          <div className="flex justify-between items-center border border-indigo-200 rounded-lg px-4 py-3 bg-indigo-50">
            <span className="text-gray-600 text-sm">Total Amount</span>
            <span className="text-lg font-semibold text-indigo-600">
              ₹{price.toFixed(2)}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || isEmailMismatch || !termsAccepted}
            className="w-full bg-linear-to-r from-indigo-600 to-indigo-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Proceed to Secure Payment"}
          </button>

          {/* Footer */}
          <p className="text-xs text-center text-gray-500 mt-2 flex justify-center gap-2">
            <ShieldCheck className="text-indigo-600 w-4.25 h-4.25 " /> Powered
            by Dodo Payments
          </p>

          {/* Payment Icons */}
          <div className="flex justify-center gap-4 mt-4 text-sm">
            {[
              "visa",
              "mastercard",
              "paypal",
              "apple-pay",
              "google-pay",
              "stripe",
            ].map((item, i) => (
              <div
                key={i}
                className="px-3 py-2 border border-gray-100 rounded-md bg-gray-50 flex items-center justify-center"
              >
                <Image
                  src={`/payments/${item}.png`}
                  alt={item}
                  width={100}
                  height={40}
                  className="h-4 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
