// components/DeliveryPolicy.tsx

import React from "react";

const DeliveryPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Delivery Policy
          </h1>
          <p className="text-indigo-100 mt-2">Last Updated: June 2026</p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 sm:px-10 space-y-8">
          <Section title="Welcome to Downlodia">
            <p>Thank you for purchasing from Downlodia.</p>
            <p className="mt-2">
              This Delivery Policy explains how digital products purchased
              through Downlodia.in are delivered to customers.
            </p>
          </Section>

          <Section title="1. Digital Product Delivery">
            <p>All products sold on Downlodia are digital products.</p>
            <p className="mt-2">
              No physical goods are shipped, mailed, or delivered by courier.
            </p>
            <p className="mt-2">
              Products are delivered electronically through email after
              successful payment confirmation.
            </p>
          </Section>

          <Section title="2. Delivery Process">
            <p>The delivery process generally follows these steps:</p>
            <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-700">
              <li>Customer selects a product.</li>
              <li>Customer proceeds to checkout.</li>
              <li>Customer provides:</li>
            </ol>
            <ul className="list-disc pl-12 mt-1 space-y-1 text-gray-700">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Confirmation Email Address</li>
              <li>Mobile Number</li>
            </ul>
            <ol
              className="list-decimal pl-6 mt-2 space-y-1 text-gray-700"
              start={4}
            >
              <li>Customer completes payment through our payment provider.</li>
              <li>Payment is verified.</li>
              <li>
                A delivery email is sent to the email address provided during
                checkout.
              </li>
              <li>
                The delivery email contains the product access or download link.
              </li>
            </ol>
          </Section>

          <Section title="3. Delivery Method">
            <p>Products may be delivered through:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Download links</li>
              <li>Cloud storage links</li>
              <li>Google Drive links</li>
              <li>Third-party file hosting services</li>
              <li>Other secure digital delivery methods</li>
            </ul>
            <p className="mt-2">
              The delivery email will contain instructions for accessing the
              purchased product.
            </p>
          </Section>

          <Section title="4. Delivery Time">
            <p>
              Most orders are delivered automatically within a few minutes after
              successful payment confirmation.
            </p>
            <p className="mt-2">However, delivery times may vary due to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Payment verification delays</li>
              <li>Email provider delays</li>
              <li>Temporary technical issues</li>
              <li>High order volumes</li>
              <li>Maintenance activities</li>
            </ul>
            <p className="mt-2">
              In exceptional circumstances, delivery may take up to 24 hours.
            </p>
          </Section>

          <Section title="5. Customer Responsibility">
            <p>
              Customers are responsible for ensuring that all information
              entered during checkout is accurate.
            </p>
            <p className="mt-2">This includes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Confirmation Email Address</li>
              <li>Mobile Number</li>
            </ul>
            <p className="mt-2">
              Before submitting payment, customers should carefully verify all
              information.
            </p>
            <p className="mt-2">
              Downlodia cannot guarantee successful delivery if incorrect
              information is provided during checkout.
            </p>
          </Section>

          <Section title="6. Successful Delivery">
            <p>
              A product shall be considered successfully delivered when the
              delivery email containing the product access or download link has
              been sent to the email address provided during checkout.
            </p>
            <p className="mt-2">Customers acknowledge that:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Email delivery constitutes order fulfillment.</li>
              <li>
                Delivery is performed using the email address submitted during
                checkout.
              </li>
              <li>
                Incorrect customer information may prevent successful receipt of
                the product.
              </li>
            </ul>
          </Section>

          <Section title="7. If You Do Not Receive Your Product">
            <p>
              If you do not receive your delivery email within a reasonable time
              after payment:
            </p>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Step 1</p>
              <p className="mt-1">Check your:</p>
              <ul className="list-disc pl-6 mt-1 space-y-1 text-gray-700">
                <li>Spam folder</li>
                <li>Junk folder</li>
                <li>Promotions folder</li>
                <li>Updates folder</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Step 2</p>
              <p className="mt-1">
                Verify that the email address entered during checkout was
                correct.
              </p>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Step 3</p>
              <p className="mt-1">
                Allow additional time for email delivery, especially during
                periods of high traffic or temporary delays.
              </p>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Step 4</p>
              <p className="mt-1">Contact our support team for assistance.</p>
            </div>
          </Section>

          <Section title="8. Delivery Limitations">
            <p>
              Downlodia shall not be responsible for delivery issues caused by:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Incorrect email addresses entered by customers</li>
              <li>Typographical errors in customer information</li>
              <li>Full mailboxes</li>
              <li>Spam filtering systems</li>
              <li>Email provider outages</li>
              <li>Internet connectivity issues</li>
              <li>Customer device or software problems</li>
              <li>Restricted access to third-party file hosting services</li>
            </ul>
          </Section>

          <Section title="9. Product Access">
            <p>Customers are encouraged to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Download purchased files promptly after receiving access.</li>
              <li>Store downloaded files securely.</li>
              <li>Retain purchase confirmation emails for future reference.</li>
            </ul>
            <p className="mt-2">
              Downlodia may update, change, or reorganize storage systems over
              time, and long-term access to previously delivered links may not
              be guaranteed unless specifically stated on the product page.
            </p>
          </Section>

          <Section title="10. Support">
            <p>
              If you experience delivery issues related to an order, please
              contact us with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Your Full Name</li>
              <li>Order Information</li>
              <li>Email Address Used During Checkout</li>
              <li>Payment Details (if available)</li>
            </ul>
            <p className="mt-2">
              Our team will make reasonable efforts to investigate and assist
              with legitimate delivery concerns.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              Downlodia reserves the right to modify this Delivery Policy at any
              time.
            </p>
            <p className="mt-2">
              Updated versions will be published on this page with a revised
              "Last Updated" date.
            </p>
          </Section>

          <Section title="12. Contact Information">
            <p>For delivery-related questions or assistance, please contact:</p>
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">Downlodia</p>
              <p className="text-gray-800 mt-1">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:shubhlaxmivisuals@gmail.com"
                  className="text-indigo-600 hover:underline"
                >
                  shubhlaxmivisuals@gmail.com
                </a>
              </p>
              <p className="text-gray-800 mt-1">
                <strong>Website:</strong>{" "}
                <a
                  href="https://downlodia.in"
                  className="text-indigo-600 hover:underline"
                >
                  https://downlodia.in
                </a>
              </p>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 text-center text-sm text-gray-500">
          By completing a purchase on Downlodia, you acknowledge that you have
          read, understood, and agree to this Delivery Policy.
        </div>
      </div>
    </div>
  );
};

// Helper component for each section
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-600 space-y-2 leading-relaxed">{children}</div>
    </div>
  );
};

export default DeliveryPolicy;
