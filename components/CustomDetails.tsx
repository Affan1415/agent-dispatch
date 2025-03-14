"use client";
import React, { useState } from "react";
import BlurredCircle from "@/components/BlurredCircle";

interface CustomDetailsProps {
  widget_script: string;
}

const CustomDetails: React.FC<CustomDetailsProps> = ({ widget_script }) => {
  const [selectedIntegration, setSelectedIntegration] = useState<
    "wordpress" | "shopify" | "custom"
  >("wordpress");

  const handleCopy = () => {
    navigator.clipboard.writeText(widget_script);
    alert("Widget script copied to clipboard!");
  };

  const renderInstructions = () => {
    switch (selectedIntegration) {
      case "wordpress":
        return (
          <div className="mt-4 p-4 bg-gradient-to-t rounded-xl border from-teal-800/20 to-purple-900/10 border-teal-100/10">
            <h3 className="text-lg font-semibold mb-2">
              WordPress Integration
            </h3>
            <p>
              To integrate your chat widget into WordPress, install a plugin
              like <strong>"Insert Headers and Footers"</strong> or use a custom
              HTML widget. Paste the script code in your theme’s header or
              footer. Consult the plugin documentation for further guidance.
            </p>
          </div>
        );
      case "shopify":
        return (
          <div className="mt-4 p-4 bg-gradient-to-t rounded-xl border from-teal-800/20 to-purple-900/10 border-teal-100/10">
            <h3 className="text-lg font-semibold mb-2">Shopify Integration</h3>
            <p>
              For Shopify, edit your theme's <code>theme.liquid</code> file and
              paste the script tag right before the closing{" "}
              <code>&lt;/body&gt;</code> tag. Alternatively, use an app that
              allows you to add custom scripts. This will load the chat widget
              across your store.
            </p>
          </div>
        );
      case "custom":
        return (
          <div className="mt-4 p-4 bg-gradient-to-t rounded-xl border from-teal-800/20 to-purple-900/10 border-teal-100/10">
            <h3 className="text-lg font-semibold mb-2">
              Custom Website Integration
            </h3>
            <p>
              For a custom website, simply add the embed code to your
              HTML—ideally in the header or footer. Paste the script tag into
              your website’s code where you want the chat widget to appear.
              Ensure that it is loaded on every page where the widget is
              required.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-8 relative">
      {/* Background Blur Effects */}
      <div className="absolute left-0 opacity-90">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-90 scale-x-[-1]">
        <BlurredCircle />
      </div>

      <div className="max-w-screen-xl flex flex-col items-center justify-center gap-4 z-10">
        {/* Header Section */}
        <div className="text-center flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl lg:text-5xl mt-2 font-semibold w-full leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-300 text-transparent bg-clip-text">
              For Integration!
            </span>{" "}
            Read the Instructions
          </h2>
          <p className="text-gray-400 mt-6 text-sm sm:text-base max-w-4xl">
            Follow our instruction to deploy your wonderful {" "}
            <span className="bg-gradient-to-r from-white to-blue-300 text-transparent bg-clip-text">
            Chatbot.
            </span>{" "}
          </p>
        </div>

        {/* Widget Script Display */}
        <div className="w-full  text-white p-6 mt-6 rounded-xl shadow-lg bg-gradient-to-t border from-blue-800/10 to-purple-900/10 border-teal-100/10">
          <h2 className="text-2xl font-semibold mb-4">Your Widget Script</h2>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
            {widget_script}
          </pre>
          <button
            onClick={handleCopy}
            className="mt-4 px-4 py-2 bg-teal-700/50 text-white rounded hover:bg-blue-600 transition"
          >
            Copy Script
          </button>
        </div>

        {/* Integration Options */}
        <div className="mt-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Integration Options</h2>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded ${
                selectedIntegration === "wordpress"
                  ? "bg-teal-700/50 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedIntegration("wordpress")}
            >
              WordPress
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedIntegration === "shopify"
                  ? "bg-teal-700/50 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedIntegration("shopify")}
            >
              Shopify
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedIntegration === "custom"
                  ? "bg-teal-700/50 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSelectedIntegration("custom")}
            >
              Custom Website
            </button>
          </div>
          {renderInstructions()}
        </div>
      </div>
    </div>
  );
};

export default CustomDetails;
