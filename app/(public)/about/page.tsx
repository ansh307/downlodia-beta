// components/AboutUs.tsx

import React from "react";
import {
  Package,
  Zap,
  Shield,
  Users,
  Download,
  Video,
  Music,
  Layers,
  Clock,
  CreditCard,
  Mail,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">Digital Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Downlodia
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Empowering creators with high-quality digital assets for video,
              motion graphics, and design projects.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-indigo-600 rounded mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Downlodia was founded with a simple mission: to provide
                creators, designers, and video professionals with instant access
                to high-quality digital assets at fair prices.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We understand that creative projects require the right tools and
                resources. That's why we've built a platform that connects
                talented creators with customers who need professional-grade
                assets for their work.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a YouTuber, video editor, motion designer, or
                content creator, Downlodia offers a curated selection of digital
                products designed to elevate your projects and save you valuable
                time.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-50 rounded-2xl p-8 text-center">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-indigo-600">500+</div>
                  <div className="text-gray-600 text-sm mt-1">
                    Digital Products
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-indigo-600">10K+</div>
                  <div className="text-gray-600 text-sm mt-1">
                    Happy Customers
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-indigo-600">24/7</div>
                  <div className="text-gray-600 text-sm mt-1">
                    Automated Delivery
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-indigo-600">100%</div>
                  <div className="text-gray-600 text-sm mt-1">
                    Digital Products
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <div className="w-20 h-1 bg-indigo-600 rounded mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              A curated collection of professional digital assets for every
              creative need
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Video,
                title: "Video Templates",
                description:
                  "Professional templates for YouTube, social media, and commercial projects",
                color: "bg-red-100 text-red-600",
              },
              {
                icon: Music,
                title: "Sound Effects",
                description:
                  "High-quality audio assets for videos, games, and multimedia projects",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Layers,
                title: "Motion Graphics",
                description:
                  "Animated assets and motion design elements for dynamic content",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: Package,
                title: "Design Resources",
                description:
                  "Creative templates and design assets for various applications",
                color: "bg-orange-100 text-orange-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-flex p-3 rounded-lg ${item.color} mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Downlodia Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Downlodia
            </h2>
            <div className="w-20 h-1 bg-indigo-600 rounded mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We've designed our platform with creators in mind
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Instant Delivery",
                description:
                  "Get your products immediately after purchase via email",
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description:
                  "All transactions processed through trusted payment providers",
              },
              {
                icon: Download,
                title: "Digital Only",
                description: "No shipping delays — access your files instantly",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description:
                  "Shop anytime, download instantly, work on your schedule",
              },
              {
                icon: CreditCard,
                title: "No Account Required",
                description: "Purchase as a guest without creating an account",
              },
              {
                icon: Users,
                title: "Creator Friendly",
                description:
                  "Fair license terms for personal and commercial use",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100"
              >
                <div className="flex-shrink-0">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="w-20 h-1 bg-indigo-600 rounded mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Getting your digital assets is quick and easy
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Browse",
                description: "Explore our collection of digital products",
              },
              {
                step: "02",
                title: "Purchase",
                description: "Complete checkout with your information",
              },
              {
                step: "03",
                title: "Receive",
                description: "Get delivery email with download link",
              },
              {
                step: "04",
                title: "Create",
                description: "Use assets in your creative projects",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-indigo-100 mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-gray-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* License Summary Section */}
        <div className="mb-20 bg-indigo-50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-sm mb-3">
                <CheckCircle className="w-4 h-4" />
                <span>License Overview</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Simple & Fair Licensing
              </h3>
              <p className="text-gray-600">
                Use our assets for personal and commercial projects. <br />
                Reselling or redistributing original files is not permitted.
              </p>
            </div>
            <a
              href="/legal/license-agreement"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Read License Agreement
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <Mail className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help with any questions about our
              products, licensing, or your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:shubhlaxmivisuals@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                shubhlaxmivisuals@gmail.com
              </a>
              <a
                href="https://downlodia.in"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
