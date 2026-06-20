// components/LicenseAgreement.tsx

import React from "react";

const LicenseAgreement: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            License Agreement
          </h1>
          <p className="text-indigo-100 mt-2">Last Updated: June 2026</p>
        </div>

        {/* Content */}
        <div className="px-6 py-8 sm:px-10 space-y-8">
          <Section title="Welcome to Downlodia">
            <p>
              This License Agreement ("Agreement") governs the use of digital
              products purchased from Downlodia ("Downlodia", "we", "our", or
              "us").
            </p>
            <p className="mt-2">
              By purchasing, downloading, accessing, or using any digital
              product obtained through Downlodia.in, you agree to comply with
              the terms of this Agreement.
            </p>
            <p className="mt-2">
              If you do not agree to these terms, you must not use the purchased
              product.
            </p>
          </Section>

          <Section title="1. License Grant">
            <p>
              Upon successful purchase, Downlodia grants you a limited,
              non-exclusive, non-transferable, non-sublicensable license to use
              the purchased digital product in accordance with this Agreement.
            </p>
            <p className="mt-2">
              The license is granted to the individual or organization that
              completed the purchase and may not be transferred to another party
              without written permission.
            </p>
            <p className="mt-2">
              This license grants usage rights only and does not transfer
              ownership of the original product or any associated intellectual
              property.
            </p>
          </Section>

          <Section title="2. Permitted Uses">
            <p className="font-semibold text-gray-800">
              Unless otherwise stated on a specific product page, you may:
            </p>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Personal Use</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Use purchased assets in personal projects.</li>
                <li>Modify assets for personal use.</li>
                <li>Incorporate assets into personal creative works.</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Commercial Use</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Use assets in commercial projects.</li>
                <li>Use assets in client projects.</li>
                <li>
                  Include assets in videos, advertisements, social media
                  content, websites, presentations, and other end products.
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Modification</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>
                  Edit, customize, resize, adapt, or modify assets as necessary
                  for your projects.
                </li>
              </ul>
            </div>
          </Section>

          <Section title="3. Ownership">
            <p>
              All products available on Downlodia remain the intellectual
              property of their respective creators, licensors, or rights
              holders.
            </p>
            <p className="mt-2">Purchasing a product does not transfer:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Copyright ownership</li>
              <li>Trademark rights</li>
              <li>Intellectual property rights</li>
              <li>Distribution rights</li>
              <li>Resale rights</li>
            </ul>
            <p className="mt-2">
              Only the usage rights described in this Agreement are granted.
            </p>
          </Section>

          <Section title="4. Restrictions">
            <p className="font-semibold text-gray-800">You may NOT:</p>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Resell Products</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Resell original files.</li>
                <li>
                  Resell modified versions of original files as standalone
                  products.
                </li>
                <li>Offer products for sale on marketplaces.</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">
                Redistribute Products
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Share purchased files with others.</li>
                <li>Distribute files publicly or privately.</li>
                <li>
                  Upload products to forums, communities, or file-sharing
                  services.
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Share Access</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Share delivery emails.</li>
                <li>Share download links.</li>
                <li>
                  Provide access to purchased files to unauthorized individuals.
                </li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">
                Create Competing Products
              </p>
              <p className="mt-1">
                You may not use purchased assets to create:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Asset bundles</li>
                <li>Stock resource libraries</li>
                <li>Template marketplaces</li>
                <li>Downloadable resource packs</li>
                <li>Competing digital product collections</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-gray-800">Claim Ownership</p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Claim authorship of original assets.</li>
                <li>Represent products as your own original creation.</li>
                <li>Remove copyright notices where applicable.</li>
              </ul>
            </div>
          </Section>

          <Section title="5. End Products">
            <p>
              Assets may be incorporated into completed end products, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Videos</li>
              <li>Advertisements</li>
              <li>Client projects</li>
              <li>Websites</li>
              <li>Presentations</li>
              <li>Marketing materials</li>
              <li>Social media content</li>
              <li>Creative productions</li>
            </ul>
            <p className="mt-2">
              Provided that the original asset itself is not being redistributed
              as a standalone downloadable file.
            </p>
          </Section>

          <Section title="6. One Purchase, One License">
            <p>Each purchase grants a license to the purchaser only.</p>
            <p className="mt-2">
              Unless expressly permitted, a purchase does not authorize:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Team-wide distribution</li>
              <li>Company-wide distribution</li>
              <li>Client redistribution</li>
              <li>Public redistribution</li>
            </ul>
            <p className="mt-2">
              If multiple users require access to the same asset, separate
              licenses may be required.
            </p>
          </Section>

          <Section title="7. Third-Party Rights">
            <p>
              Certain products may contain elements subject to additional
              third-party licenses, restrictions, or usage requirements.
            </p>
            <p className="mt-2">
              Where applicable, such restrictions will be described on the
              relevant product page.
            </p>
            <p className="mt-2">
              Customers are responsible for complying with any additional
              licensing requirements.
            </p>
          </Section>

          <Section title="8. Termination of License">
            <p>
              This license automatically terminates if you violate any provision
              of this Agreement.
            </p>
            <p className="mt-2">Upon termination, you must immediately:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Stop using the product.</li>
              <li>Delete all copies in your possession or control.</li>
              <li>Cease any unauthorized distribution.</li>
            </ul>
            <p className="mt-2">
              Termination does not affect any legal rights or remedies available
              to Downlodia.
            </p>
          </Section>

          <Section title="9. Disclaimer">
            <p>
              All products are provided "as is" without warranties of any kind.
            </p>
            <p className="mt-2">Downlodia does not guarantee:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Compatibility with every software application.</li>
              <li>Suitability for every project.</li>
              <li>Continuous updates or support.</li>
              <li>Specific business or creative outcomes.</li>
            </ul>
            <p className="mt-2">
              Customers are responsible for evaluating product suitability
              before purchase.
            </p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Downlodia shall not be
              liable for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Indirect damages</li>
              <li>Consequential damages</li>
              <li>Loss of profits</li>
              <li>Loss of business opportunities</li>
              <li>Data loss</li>
              <li>Project delays</li>
            </ul>
            <p className="mt-2">
              arising from the use or inability to use purchased products.
            </p>
            <p className="mt-2">
              Our maximum liability shall not exceed the amount paid for the
              specific product involved.
            </p>
          </Section>

          <Section title="11. Modifications to This Agreement">
            <p>
              Downlodia reserves the right to update or modify this License
              Agreement at any time.
            </p>
            <p className="mt-2">
              Any changes will be published on this page with an updated "Last
              Updated" date.
            </p>
            <p className="mt-2">
              Continued use of purchased products after changes are published
              constitutes acceptance of the revised Agreement.
            </p>
          </Section>

          <Section title="12. Contact Information">
            <p>
              For licensing questions or permission requests, please contact:
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
          By purchasing, downloading, or using any digital product from
          Downlodia, you acknowledge that you have read, understood, and agree
          to be bound by this License Agreement.
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

export default LicenseAgreement;
