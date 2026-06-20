// components/PrivacyPolicy.tsx

import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="text-indigo-100 mt-2">Last Updated: June 2026</p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 sm:px-10 space-y-8">
          <Section title="Welcome to Downlodia">
            <p>
              Welcome to Downlodia ("Downlodia", "we", "our", or "us"). This
              Privacy Policy explains how we collect, use, store, and protect
              information when you visit Downlodia.in or purchase digital
              products through our platform.
            </p>
            <p className="mt-2">
              By using our website, you agree to the practices described in this
              Privacy Policy.
            </p>
          </Section>

          <Section title="1. Information We Collect">
            <p className="font-semibold text-gray-800">
              To process orders and deliver digital products, we may collect the
              following information:
            </p>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">
                Information Provided by Customers
              </p>
              <p className="mt-1">When making a purchase, you may provide:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Confirmation Email Address</li>
                <li>Mobile Number</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">
                When contacting us, you may also voluntarily provide:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Contact information</li>
                <li>Support requests</li>
                <li>
                  Any information submitted through forms or email
                  communications
                </li>
              </ul>
            </div>
          </Section>

          <Section title="2. Information Collected Automatically">
            <p>
              When you visit our website, certain information may be collected
              automatically, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>IP Address</li>
              <li>Browser Type</li>
              <li>Device Information</li>
              <li>Operating System</li>
              <li>Referring Website</li>
              <li>Pages Visited</li>
              <li>Date and Time of Access</li>
              <li>Website Usage Information</li>
            </ul>
            <p className="mt-2">
              This information helps us improve our services, maintain security,
              and analyze website performance.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We may use collected information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Process and verify purchases</li>
              <li>Deliver purchased digital products</li>
              <li>Send order confirmations</li>
              <li>Send download or access links</li>
              <li>Respond to customer support inquiries</li>
              <li>Detect and prevent fraudulent transactions</li>
              <li>Improve website functionality and user experience</li>
              <li>Maintain platform security</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-2">
              We only collect information that is reasonably necessary for
              providing our services.
            </p>
          </Section>

          <Section title="4. Product Delivery">
            <p>The email address provided during checkout is used to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Deliver purchased products</li>
              <li>Send order confirmations</li>
              <li>Communicate regarding your purchase</li>
            </ul>
            <p className="mt-2">
              Customers are responsible for ensuring that the email address
              provided during checkout is accurate and accessible.
            </p>
            <p className="mt-2">
              Failure to receive delivery due to an incorrectly entered email
              address may prevent successful product access.
            </p>
          </Section>

          <Section title="5. Payment Processing">
            <p>
              Payments on Downlodia are processed through trusted third-party
              payment providers.
            </p>
            <p className="mt-2 font-semibold text-gray-800">We do not store:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Credit Card Numbers</li>
              <li>Debit Card Numbers</li>
              <li>UPI PINs</li>
              <li>Banking Passwords</li>
              <li>CVV Numbers</li>
            </ul>
            <p className="mt-2">
              Payment information is processed directly by our payment service
              providers in accordance with their own privacy and security
              policies.
            </p>
          </Section>

          <Section title="6. Cookies and Similar Technologies">
            <p>Our website may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Maintain website functionality</li>
              <li>Improve user experience</li>
              <li>Analyze website traffic</li>
              <li>Remember user preferences</li>
              <li>Enhance website security</li>
            </ul>
            <p className="mt-2">
              You may disable cookies through your browser settings; however,
              certain website features may not function correctly.
            </p>
          </Section>

          <Section title="7. Sharing of Information">
            <p className="font-semibold text-gray-800">
              We do not sell, rent, or trade customer personal information.
            </p>
            <p className="mt-2">
              We may share information only when necessary with:
            </p>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Service Providers</p>
              <p className="mt-1">Including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Payment processors</li>
                <li>Email delivery providers</li>
                <li>Hosting providers</li>
                <li>Analytics providers</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Legal Requirements</p>
              <p className="mt-1">
                We may disclose information when required by:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Applicable laws</li>
                <li>Government authorities</li>
                <li>Court orders</li>
                <li>Legal proceedings</li>
              </ul>
            </div>
          </Section>

          <Section title="8. Data Retention">
            <p>
              We retain customer information only for as long as reasonably
              necessary to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Process purchases</li>
              <li>Provide customer support</li>
              <li>Maintain transaction records</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and abuse</li>
            </ul>
            <p className="mt-2">
              After information is no longer required, it may be deleted or
              anonymized.
            </p>
          </Section>

          <Section title="9. Data Security">
            <p>
              We implement reasonable administrative, technical, and
              organizational measures to protect customer information.
            </p>
            <p className="mt-2">These measures are designed to prevent:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Unauthorized access</li>
              <li>Unauthorized disclosure</li>
              <li>Data misuse</li>
              <li>Data alteration</li>
            </ul>
            <p className="mt-2">
              However, no online system can guarantee absolute security, and
              users acknowledge the inherent risks associated with
              internet-based services.
            </p>
          </Section>

          <Section title="10. Third-Party Services">
            <p>
              Our website may contain links to third-party websites, services,
              or platforms.
            </p>
            <p className="mt-2">Examples may include:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Payment gateways</li>
              <li>Cloud storage providers</li>
              <li>File hosting services</li>
              <li>External resources</li>
            </ul>
            <p className="mt-2">
              We are not responsible for the privacy practices, content, or
              policies of third-party websites.
            </p>
            <p className="mt-2">
              Users should review the privacy policies of those services
              separately.
            </p>
          </Section>

          <Section title="11. Customer Rights">
            <p>Subject to applicable laws, users may have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Request access to their information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of information where legally permitted</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p className="mt-2">
              Requests may be submitted through our support email.
            </p>
          </Section>

          <Section title="12. Children's Privacy">
            <p>
              Our services are not directed toward children under the age of 13.
            </p>
            <p className="mt-2">
              We do not knowingly collect personal information from children.
            </p>
            <p className="mt-2">
              If we become aware that information has been collected from a
              child without appropriate consent, we may remove such information.
            </p>
          </Section>

          <Section title="13. Changes to This Privacy Policy">
            <p>
              We reserve the right to update or modify this Privacy Policy at
              any time.
            </p>
            <p className="mt-2">
              Any changes will be posted on this page along with an updated
              "Last Updated" date.
            </p>
            <p className="mt-2">
              Continued use of the website after updates constitutes acceptance
              of the revised Privacy Policy.
            </p>
          </Section>

          <Section title="14. Contact Information">
            <p>
              For questions regarding this Privacy Policy or your personal
              information, please contact:
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
          and agree to this Privacy Policy.
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

export default PrivacyPolicy;
