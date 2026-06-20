import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import Confetti from "@/components/Confetti";
import { Check } from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaPinterest,
} from "react-icons/fa";
import Image from "next/image";
export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ payment_id?: string }>;
}) {
  const { productId } = await params; // ✅ FIX
  const { payment_id } = await searchParams; // ✅ already fixed

  if (!payment_id) {
    redirect("/");
  }

  console.log("Search Params:", payment_id);

  const order = await prisma.order.findUnique({
    where: {
      dodoPaymentId: payment_id, // ✅ FIX HERE
    },
    include: {
      product: true,
    },
  });

  if (!order || order.paymentStatus !== "PAID") {
    redirect("/");
  }

  // ✅ FIX HERE
  if (order.productId !== productId) {
    redirect("/");
  }

  const product = order.product;

  if (!product) {
    redirect("/");
  }

  const socialLinks = [
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://www.youtube.com/@Downloadia",
      color: "hover:text-red-600",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: "https://www.facebook.com/Downloadia.in/",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/downloadia.in/",
      color: "hover:text-pink-500",
    },
    {
      name: "Pinterest",
      icon: FaPinterest,
      url: "https://in.pinterest.com/Dowloadia_in/",
      color: "hover:text-red-500",
    },
  ];

  const supportEmail = "shubhlaxmivisuals@gmail.com";
  const websiteUrl = "https://downlodia.in";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <Confetti /> {/* 🎉 HERE */}
      <div className="text-center max-w-xl w-full">
        {/* Success Icon */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
          <div className="relative bg-green-500 text-white w-20 h-20 flex items-center justify-center rounded-full text-3xl shadow-lg">
            <Check className="w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Payment Successful
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-8">
          Your purchase has been completed successfully.
        </p>

        {/* Product Info (clean, no card) */}
        <div className="mb-8">
          {product.image && (
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h2 className="text-lg font-semibold text-gray-900">
            {product.title}
          </h2>

          <p className="text-gray-500 text-sm">₹{product.price}</p>
        </div>

        {/* Email Notice (Main Focus) */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            Your download link has been sent to your email address.
            <br />
            Please check your inbox (and spam folder if needed).
          </p>
        </div>

        {/* Thank You + Social Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <p className="text-gray-800 text-sm font-medium mb-2">
            Thank you for trusting and buying from us 💙
          </p>

          <p className="text-gray-600 text-sm mb-4">
            Join us for exciting offers and new releases on our social
            platforms.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 transition ${social.color}`}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          {/* Extra Info */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              Support:{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="text-indigo-600 hover:underline"
              >
                {supportEmail}
              </a>
            </p>
            <p>
              Website:{" "}
              <a
                href={websiteUrl}
                target="_blank"
                className="text-indigo-600 hover:underline"
              >
                {websiteUrl}
              </a>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/all-products"
            className="bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Continue Browsing
          </Link>
        </div>

        {/* Payment Info */}
        <p className="text-xs text-gray-400 mt-6">Payment ID: {payment_id}</p>
      </div>
    </div>
  );
}
