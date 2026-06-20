// components/TermsAndConditions.tsx

import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Terms and Conditions
          </h1>
          <p className="text-indigo-100 mt-2">Last Updated: June 2026</p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 sm:px-10 space-y-8">
          <Section title="Welcome to Downlodia">
            <p>
              Welcome to Downlodia ("Downlodia", "we", "our", or "us"). These
              Terms and Conditions govern your access to and use of Downlodia.in
              and the purchase of digital products through our platform.
            </p>
            <p className="mt-2">
              By accessing the website, browsing products, or making a purchase,
              you agree to be bound by these Terms and Conditions.
            </p>
          </Section>

          <Section title="1. About Downlodia">
            <p>
              Downlodia is an online marketplace that offers digital products
              including, but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Video templates</li>
              <li>Motion graphics assets</li>
              <li>Sound effects</li>
              <li>Creative resources</li>
              <li>Design assets</li>
              <li>Other downloadable digital products</li>
            </ul>
            <p className="mt-2">
              All products available on the platform are delivered
              electronically.
            </p>
            <p className="mt-2">No physical goods are shipped.</p>
          </Section>

          <Section title="2. Eligibility">
            <p>By using this website, you confirm that:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>
                You are at least 18 years of age or have permission from a
                parent or legal guardian.
              </li>
              <li>
                You have the legal authority to enter into binding agreements.
              </li>
              <li>
                All information provided during checkout is accurate and
                complete.
              </li>
            </ul>
          </Section>

          <Section title="3. Product Information">
            <p>
              We strive to provide accurate product descriptions, previews,
              specifications, and pricing information.
            </p>
            <p className="mt-2">
              However, we do not guarantee that all descriptions, screenshots,
              previews, or other content will be completely error-free.
            </p>
            <p className="mt-2">
              Customers are encouraged to review product information carefully
              before making a purchase.
            </p>
          </Section>

          <Section title="4. Checkout Information">
            <p>
              Before completing a purchase, customers are required to provide:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Confirmation Email Address</li>
              <li>Mobile Number</li>
            </ul>
            <p className="mt-2">
              The email address provided during checkout will be used for
              product delivery.
            </p>
            <p className="mt-2">
              By proceeding with payment, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>
                You have verified the accuracy of the information submitted.
              </li>
              <li>The email address entered is valid and accessible by you.</li>
              <li>
                Product delivery will be performed using the information
                supplied during checkout.
              </li>
            </ul>
            <p className="mt-2">
              Customers are solely responsible for ensuring that all submitted
              information is correct.
            </p>
          </Section>

          <Section title="5. Orders and Payments">
            <p>
              Payments are processed securely through authorized third-party
              payment providers.
            </p>
            <p className="mt-2">
              An order is considered confirmed only after successful payment
              authorization and receipt of payment confirmation.
            </p>
            <p className="mt-2">
              We reserve the right to refuse, suspend, or cancel orders if:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Fraudulent activity is suspected.</li>
              <li>Payment authorization fails.</li>
              <li>Information provided is inaccurate or misleading.</li>
              <li>The transaction violates applicable laws or these Terms.</li>
            </ul>
          </Section>

          <Section title="6. Digital Product Delivery">
            <p>All products sold on Downlodia are delivered digitally.</p>
            <p className="mt-2">After successful payment:</p>
            <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-700">
              <li>The order is verified.</li>
              <li>A delivery email is generated.</li>
              <li>
                The delivery email is sent to the email address provided during
                checkout.
              </li>
              <li>
                The email contains a download or access link for the purchased
                product.
              </li>
            </ol>
            <p className="mt-2">Products may be delivered through:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Download links</li>
              <li>Cloud storage links</li>
              <li>Third-party file hosting services</li>
              <li>Other digital delivery methods</li>
            </ul>
            <p className="mt-2">
              Delivery is generally automated and typically occurs within a few
              minutes after successful payment, although occasional delays may
              occur.
            </p>
          </Section>

          <Section title="7. Delivery Completion">
            <p>
              An order shall be considered successfully fulfilled when the
              delivery email containing the product access link has been
              successfully sent to the email address provided during checkout.
            </p>
            <p className="mt-2">Customers acknowledge that:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Email delivery constitutes successful delivery.</li>
              <li>
                It is their responsibility to verify the email address before
                payment.
              </li>
              <li>Incorrect email addresses may prevent delivery.</li>
            </ul>
            <p className="mt-2">
              Downlodia shall not be liable for delivery failures resulting
              from:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Incorrect email addresses entered by customers.</li>
              <li>Typographical errors in customer information.</li>
              <li>Spam or junk mail filtering.</li>
              <li>Full inboxes.</li>
              <li>Email service provider issues.</li>
              <li>Customer-side technical problems.</li>
            </ul>
          </Section>

          <Section title="8. No Account Requirement">
            <p>Customers may purchase products without creating an account.</p>
            <p className="mt-2">
              Because purchases may be completed as a guest, customers are
              responsible for maintaining access to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>The email address used during checkout.</li>
              <li>The delivery email.</li>
              <li>Download links provided after purchase.</li>
            </ul>
            <p className="mt-2">
              Loss of access to an email account does not create an obligation
              for Downlodia to provide refunds.
            </p>
          </Section>

          <Section title="9. License Grant">
            <p>
              Upon successful purchase, customers receive a limited,
              non-exclusive, non-transferable license to use the purchased
              digital product.
            </p>
            <p className="mt-2">
              Unless otherwise stated on the product page, customers may:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Use products for personal projects.</li>
              <li>Use products in commercial projects.</li>
              <li>Modify products for their own use.</li>
              <li>Use products for client work.</li>
            </ul>
            <p className="mt-2">
              This license does not transfer ownership of the original product.
            </p>
          </Section>

          <Section title="10. Prohibited Uses">
            <p>Customers may not:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Resell purchased files.</li>
              <li>Redistribute purchased files.</li>
              <li>Share delivery emails or download links.</li>
              <li>Upload purchased products to marketplaces.</li>
              <li>Upload purchased products to file-sharing services.</li>
              <li>Claim ownership of original assets.</li>
              <li>
                Create competing asset libraries using purchased products.
              </li>
              <li>Transfer licenses to other individuals or organizations.</li>
            </ul>
            <p className="mt-2">
              Violation of these terms may result in termination of usage rights
              and legal action where applicable.
            </p>
          </Section>

          <Section title="11. Intellectual Property">
            <p>
              All website content and digital products available on Downlodia
              remain the intellectual property of their respective owners and
              licensors.
            </p>
            <p className="mt-2">This includes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Product files</li>
              <li>Product previews</li>
              <li>Website content</li>
              <li>Logos</li>
              <li>Branding</li>
              <li>Graphics</li>
              <li>Documentation</li>
            </ul>
            <p className="mt-2">
              No ownership rights are transferred through a purchase.
            </p>
          </Section>

          <Section title="12. Refunds">
            <p>Refunds are governed by our Refund Policy.</p>
            <p className="mt-2">
              Due to the nature of digital products and instant electronic
              delivery, all sales are generally final once the delivery email
              has been sent.
            </p>
            <p className="mt-2">
              Customers are encouraged to review product information carefully
              and verify checkout information before completing payment.
            </p>
          </Section>

          <Section title="13. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Downlodia shall
              not be liable for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Loss of profits</li>
              <li>Business interruption</li>
              <li>Data loss</li>
              <li>Loss of business opportunities</li>
              <li>Indirect damages</li>
              <li>Consequential damages</li>
              <li>Delivery issues caused by incorrect customer information</li>
            </ul>
            <p className="mt-2">
              Our maximum liability for any claim shall not exceed the amount
              paid for the specific product involved.
            </p>
          </Section>

          <Section title="14. Disclaimer">
            <p>
              All products and services are provided on an "as is" and "as
              available" basis.
            </p>
            <p className="mt-2">We make no guarantees regarding:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Continuous website availability</li>
              <li>Uninterrupted access</li>
              <li>Compatibility with all software or systems</li>
              <li>Suitability for specific purposes</li>
              <li>Particular business outcomes</li>
            </ul>
            <p className="mt-2">
              Customers are responsible for verifying product compatibility
              before purchase.
            </p>
          </Section>

          <Section title="15. Modifications to Terms">
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time.
            </p>
            <p className="mt-2">
              Updated versions will be posted on this page with a revised "Last
              Updated" date.
            </p>
            <p className="mt-2">
              Continued use of the website after updates constitutes acceptance
              of the revised Terms.
            </p>
          </Section>

          <Section title="16. Governing Law">
            <p>
              These Terms and Conditions shall be governed and interpreted in
              accordance with the laws of India.
            </p>
            <p className="mt-2">
              Any disputes arising from the use of the website or purchases made
              through the website shall be subject to the jurisdiction of the
              appropriate courts in India.
            </p>
          </Section>

          <Section title="17. Contact Information">
            <p>
              For questions regarding these Terms and Conditions, please
              contact:
            </p>
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
          By using Downlodia, you acknowledge that you have read, understood,
          and agree to be bound by these Terms and Conditions.
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

export default TermsAndConditions;
