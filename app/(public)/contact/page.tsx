// components/ContactUs.tsx

import React from "react";
import {
  MdEmail,
  MdLanguage,
  MdFacebook,
  MdAccessTime,
  MdCheckCircle,
  MdSend,
  MdLaunch,
  MdMessage,
} from "react-icons/md";
import {
  FaInstagram,
  FaClock,
  FaYoutube,
  FaFacebook,
  FaPinterest,
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const ContactUs: React.FC = () => {
  // Social links configuration - Update with your actual URLs
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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section - Consistent with policy pages */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Contact Us
            </h1>
            <p className="text-indigo-100 mt-2">
              For compliance, support, or general inquiries
            </p>
          </div>

          {/* Content Section */}
          <div className="px-6 py-8 sm:px-10">
            {/* Two Column Layout for larger screens */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Contact Info */}
              <div>
                {/* Email Support */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-4">
                    <MdEmail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Email Support
                  </h2>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-lg transition-colors break-all"
                  >
                    {supportEmail}
                  </a>
                  <div className="flex items-center gap-2 mt-3">
                    <FiClock className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-500 text-sm">
                      Response within 24-48 hours
                    </p>
                  </div>
                </div>

                {/* Website */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-4">
                    <MdLanguage className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Website
                  </h2>
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors inline-flex items-center gap-1"
                  >
                    {websiteUrl}
                    <MdLaunch className="w-4 h-4" />
                  </a>
                </div>

                {/* Quick Response Note */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex gap-3">
                    <MdCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 text-sm">
                        Quick Response Guarantee
                      </p>
                      <p className="text-green-700 text-xs mt-1">
                        We aim to respond to all inquiries within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Social Links & Info */}
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-4">
                    <MdMessage className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Connect With Us
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Follow us on social media for updates and announcements
                  </p>
                </div>

                {/* Social Links Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 transition-all duration-200 ${social.color} hover:border-gray-300 hover:bg-white hover:shadow-sm`}
                    >
                      <social.icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{social.name}</span>
                    </a>
                  ))}
                </div>

                {/* Business Hours Note */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FaClock className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Business Hours
                      </p>
                      <p className="text-xs text-gray-500">
                        Monday - Friday: 9:00 AM - 6:00 PM IST
                      </p>
                      <p className="text-xs text-gray-500">
                        Email support available 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <MdSend className="w-4 h-4 text-gray-400" />
                  <p className="text-xs text-gray-400">
                    For compliance matters, legal inquiries, or partnership
                    opportunities
                  </p>
                </div>
                <a
                  href="mailto:shubhlaxmivisuals@gmail.com"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <MdEmail className="w-4 h-4" />
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-indigo-600 font-bold text-xl">500+</div>
            <div className="text-gray-500 text-xs">Digital Products</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-indigo-600 font-bold text-xl">24/7</div>
            <div className="text-gray-500 text-xs">Automated Delivery</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-indigo-600 font-bold text-xl">Secure</div>
            <div className="text-gray-500 text-xs">Payment Processing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
