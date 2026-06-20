// components/RefundPolicy.tsx

import React from "react";

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Refund Policy
          </h1>
          <p className="text-indigo-100 mt-2">Last Updated: June 2026</p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 sm:px-10 space-y-8">
          <Section title="Welcome to Downlodia">
            <p>Thank you for shopping at Downlodia.</p>
            <p className="mt-2">
              Please read this Refund Policy carefully before making a purchase.
              By completing a purchase on Downlodia.in, you acknowledge and
              agree to the terms outlined below.
            </p>
          </Section>

          <Section title="1. Nature of Digital Products">
            <p>
              Downlodia sells digital products that are delivered electronically
              through email after successful payment.
            </p>
            <p className="mt-2">
              Because digital products cannot be physically returned and can be
              permanently retained once accessed or downloaded, all purchases
              are generally considered final.
            </p>
          </Section>

          <Section title="2. No Refunds After Successful Delivery">
            <p>
              A product is considered successfully delivered when the delivery
              email containing the product access or download link has been sent
              to the email address provided during checkout.
            </p>
            <p className="mt-2">Once successful delivery has occurred:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Refund requests will not be accepted.</li>
              <li>Cancellations will not be accepted.</li>
              <li>Exchanges will not be provided.</li>
            </ul>
            <p className="mt-2">
              Customers are strongly encouraged to review product information
              carefully before completing their purchase.
            </p>
          </Section>

          <Section title="3. Customer Responsibility for Email Information">
            <p>Before payment, customers are required to provide:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Confirmation Email Address</li>
              <li>Mobile Number</li>
            </ul>
            <p className="mt-2">
              By completing a purchase, customers confirm that the information
              provided is accurate.
            </p>
            <p className="mt-2">
              Downlodia is not responsible for delivery issues resulting from:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Incorrect email addresses entered by customers</li>
              <li>Typographical errors in email addresses</li>
              <li>Failure to verify the confirmation email field</li>
              <li>Inaccessible email accounts</li>
              <li>Full mailboxes</li>
              <li>Spam or junk mail filtering</li>
              <li>Customer-side email service issues</li>
            </ul>
            <p className="mt-2">
              Products delivered to the email address provided during checkout
              shall be considered successfully delivered.
            </p>
          </Section>

          <Section title="4. Exceptions">
            <p className="font-semibold text-gray-800">
              Refunds may be considered only under the following circumstances:
            </p>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Duplicate Payment</p>
              <p className="mt-1">
                If a customer is charged multiple times for the same order due
                to a payment processing error.
              </p>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">
                Failed Delivery Due to Our Error
              </p>
              <p className="mt-1">
                If payment is successfully completed but the product is not
                delivered due to a verified technical issue on Downlodia's
                systems.
              </p>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">
                Corrupted or Inaccessible Files
              </p>
              <p className="mt-1">
                If a delivered file is corrupted, damaged, or inaccessible and a
                working replacement cannot be provided within a reasonable
                timeframe.
              </p>
              <p className="mt-1">
                In most cases, we will attempt to resolve the issue by providing
                a replacement file before considering a refund.
              </p>
            </div>
          </Section>

          <Section title="5. Non-Refundable Situations">
            <p className="font-semibold text-gray-800">
              Refunds will not be issued for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Change of mind</li>
              <li>Accidental purchases</li>
              <li>Purchasing the wrong product</li>
              <li>Failure to read product descriptions</li>
              <li>Lack of required software or technical knowledge</li>
              <li>
                Software compatibility issues not explicitly guaranteed by the
                product description
              </li>
              <li>Incorrect email addresses entered during checkout</li>
              <li>Failure to check spam or junk folders</li>
              <li>Delays caused by customer email providers</li>
              <li>
                Customer dissatisfaction with subjective aspects of a product
              </li>
              <li>Failure to download or save delivered files</li>
            </ul>
          </Section>

          <Section title="6. Chargebacks and Payment Disputes">
            <p>
              Customers are encouraged to contact us before initiating a
              chargeback or payment dispute.
            </p>
            <p className="mt-2">
              For dispute investigations, we may provide evidence including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Order records</li>
              <li>Payment confirmation records</li>
              <li>Delivery logs</li>
              <li>Email delivery records</li>
              <li>Customer-provided checkout information</li>
            </ul>
            <p className="mt-2">
              Fraudulent or abusive chargebacks may result in restrictions on
              future purchases.
            </p>
          </Section>

          <Section title="7. Processing Approved Refunds">
            <p>If a refund is approved under this policy:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>
                The refund will be issued to the original payment method used
                for the purchase.
              </li>
              <li>
                Processing times may vary depending on the payment provider or
                banking institution.
              </li>
              <li>
                Additional processing delays may occur outside our control.
              </li>
            </ul>
          </Section>

          <Section title="8. Policy Changes">
            <p>
              Downlodia reserves the right to modify this Refund Policy at any
              time.
            </p>
            <p className="mt-2">
              Any updates will be published on this page along with a revised
              "Last Updated" date.
            </p>
          </Section>

          <Section title="9. Contact Information">
            <p>For refund-related questions or assistance, please contact:</p>
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
          read, understood, and agree to this Refund Policy.
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

export default RefundPolicy;
