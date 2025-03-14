"use client";

import { CheckCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="px-4 md:px-12 lg:px-28 py-10">
      <div className="p-6 md:p-10 w-full min-h-[500px] bg-gradient-to-t rounded-xl mx-auto from-blue-800/10 to-purple-900/10 border border-teal-100/10">
        <h1 className="text-3xl font-bold mb-6 text-gray-200">
          Privacy Policy for agent-dispatch.com
        </h1>
        <p className="text-gray-400 mb-8">Effective Date: March 1st</p>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            1. Introduction
          </h2>
          <p className="text-gray-300">
            Welcome to agent-dispatch.com ("we," "our," or "us"). We are
            committed to providing AI-powered solutions that enhance user
            experiences while ensuring privacy and security. Our services aim to
            deliver efficiency, automation, and seamless AI interactions with
            transparency. This Privacy Policy outlines how we collect, use,
            share, and protect your data when you visit our website or use our
            services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            2. What We Do
          </h2>
          <p className="text-gray-300">
            Our platform offers AI-powered tools for content generation,
            automation, analytics, and scheduling. Users can access features
            based on their plan, with flexible credit usage and upgrade options.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            3. Information We Collect
          </h2>
          <ul className="list-none space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
              <span>
                <strong>Account Information:</strong> Email, username, and
                preferences for personalized experiences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-blue-500 w-6 h-6 mt-1" />
              <span>
                <strong>Usage Data:</strong> AI task usage to maintain fairness
                and improve performance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-yellow-500 w-6 h-6 mt-1" />
              <span>
                <strong>Payment & Transactions:</strong> Handled securely via
                trusted payment gateways.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-red-500 w-6 h-6 mt-1" />
              <span>
                <strong>Technical Data:</strong> IP address, browser type, OS,
                and platform interaction data.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-purple-500 w-6 h-6 mt-1" />
              <span>
                <strong>Security & Compliance:</strong> Strict protocols for
                legal compliance and user safety.
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            4. How We Use Your Data
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              Ensure platform functionality and improve overall user experience.
            </li>
            <li>Customize experiences based on preferences and behavior.</li>
            <li>
              Protect accounts from unauthorized access and ensure regulatory
              compliance.
            </li>
            <li>
              Send updates, newsletters, and promotions with user consent.
            </li>
            <li>Analyze behavior for product and performance improvements.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            5. Sharing of Information
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Service Providers:</strong> Third-party vendors aiding
              operations, payments, and support.
            </li>
            <li>
              <strong>Advertising Partners:</strong> Including Meta Platforms
              for targeted ads (with consent).
            </li>
            <li>
              <strong>Legal Requirements:</strong> When legally obligated or for
              security reasons.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            6. User Rights & Control
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <strong>Access & Update:</strong> Modify your personal data
              anytime.
            </li>
            <li>
              <strong>Usage Management:</strong> Adjust preferences and settings
              as needed.
            </li>
            <li>
              <strong>Account Deletion:</strong> Request full removal of data
              and account.
            </li>
          </ul>
          <p className="text-gray-400 mt-2">
            To exercise these rights, contact us at:{" "}
            <a
              href="mailto:info@agent-dispatch.com"
              className="underline text-blue-400"
            >
              info@agent-dispatch.com
            </a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            7. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-300">
            We use cookies and similar tools to enhance user experiences,
            analyze platform usage, and serve targeted ads.
          </p>
          <p className="text-gray-300 mt-2">
            Users can manage cookie settings through browser preferences.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            8. Security Measures
          </h2>
          <p className="text-gray-300">
            We implement strong technical and organizational measures to
            safeguard your personal data from unauthorized access, misuse, and
            alteration.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            9. Third-Party Links
          </h2>
          <p className="text-gray-300">
            Our website may include links to third-party sites. We are not
            responsible for their privacy practices and recommend reviewing
            their policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            10. Children’s Privacy
          </h2>
          <p className="text-gray-300">
            Our services are not intended for users under the age of 13. We do
            not knowingly collect data from children.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            11. Changes & Updates
          </h2>
          <p className="text-gray-300">
            We may revise this Privacy Policy as needed to reflect improvements
            or regulatory changes. Significant changes will be communicated
            transparently.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-gray-200">
            12. Contact Us
          </h2>
          <p className="text-gray-300">
            For questions or concerns regarding this Privacy Policy, reach out
            to us at:{" "}
            <a
              href="mailto:info@agent-dispatch.com"
              className="underline text-blue-400"
            >
              info@agent-dispatch.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
