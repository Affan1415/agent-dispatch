"use client";

import React, { useState, useEffect } from "react";
import ChatWidgetPreview from "@/components/ChatWidgetPreview";
import EmbeddedCodeGenerator from "@/components/EmbedCodeGenerator";
import CustomizationForm from "@/components/CustomizationForm";
import { supabase } from "@/utils/supabase";
import BlurredCircle from "./BlurredCircle";

interface CustomIntegrationProps {
  userId: string;
}

const CustomIntegrationComponent: React.FC<CustomIntegrationProps> = ({
  userId,
}) => {
  const [widgetColor, setWidgetColor] = useState("#2563eb");
  const [widgetPosition, setWidgetPosition] = useState("bottom-right");
  const [widgetMessage, setWidgetMessage] = useState(
    "Hi there! How can I help you?"
  );
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // Generate API key on mount
  useEffect(() => {
    const generateApiKey = async () => {
      try {
        const response = await fetch("/api/generateKey");
        if (!response.ok) {
          throw new Error("Failed to fetch API key");
        }
        const data = await response.json();
        console.log("API Key:", data);
        setApiKey(data.apiKey);
      } catch (error) {
        console.error("Error generating API key:", error);
      }
    };
    generateApiKey();

    // Mark this component as client-side once mounted
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      alert("User ID is missing.");
      setLoading(false);
      return;
    }

    try {
      // 1. Insert into 'chatbots' table
      const { data: chatbotData, error: chatbotError } = await supabase
        .from("chatbots")
        .insert([{ user_id: userId }])
        .select("chatbot_id")
        .single();

      if (chatbotError) {
        throw new Error(`Error creating chatbot: ${chatbotError.message}`);
      }
      const { chatbot_id } = chatbotData;

      // 2. Construct the widget script
      const encodedMessage = encodeURIComponent(widgetMessage);
      const encodedColor = encodeURIComponent(widgetColor);
      const widgetScript = `<script src="https://api.agent-dispatch.com/chat-widget.js?api_key=${apiKey}&color=${encodedColor}&message=${encodedMessage}&position=${widgetPosition}"></script>`;

      // 3. Insert into 'custom_website_chatbots' table
      const { error: websiteChatbotError } = await supabase
        .from("custom_website_chatbots")
        .insert([
          {
            chatbot_id,
            api_key: apiKey,
            widget_script: widgetScript,
          },
        ]);

      if (websiteChatbotError) {
        throw new Error(
          `Error creating website chatbot: ${websiteChatbotError.message}`
        );
      }

      // 4. Redirect after successful insertion
      window.location.href = `/instruction/${chatbot_id}`;
    } catch (error) {
      console.error("Error:", error);
      alert((error as Error).message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    // Render nothing (or a loader) until we confirm we're in a client environment
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center p-6 py-16  bg-gradient-to-t rounded-xl border   from-blue-800/10 to-purple-900/10  border-teal-100/10 text-white">
      <div className="absolute left-0 opacity-[0.7]  ">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-[0.7] scale-x-[-1]  ">
        <BlurredCircle />
      </div>
      <div className="text-center fleex flex-col items-center justify-center">
        <h2 className="text-4xl lg:text-5xl mt-2 font-semibold w-full  leading-tight">
          <span className="bg-gradient-to-r from-white to-blue-300 text-transparent bg-clip-text">
            Customization!
          </span>{" "}
          As You Like.
        </h2>
        <p className="text-gray-400 mt-6 text-sm sm:text-base max-w-4xl">
          Choose the colors, postion and integrate the bot into your website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-4 mt-6">
        {/* Customization Form */}
        <CustomizationForm
          widgetColor={widgetColor}
          setWidgetColor={setWidgetColor}
          widgetPosition={widgetPosition}
          setWidgetPosition={setWidgetPosition}
          widgetMessage={widgetMessage}
          setWidgetMessage={setWidgetMessage}
        />

        {/* Chat Widget Preview */}
        <section className="p-6 border border-gray-200 text-white rounded-lg shadow-md  bg-gradient-to-t  from-blue-800/10 to-purple-900/10  border-teal-100/10 ">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <p className="text-sm text-gray-500 mb-4">
            See how your chat widget will appear on your website.
          </p>
          <div className="relative w-full h-64 border border-dashed border-teal-700/50 rounded-lg  ">
            <ChatWidgetPreview
              widgetColor={widgetColor}
              widgetPosition={widgetPosition}
              widgetMessage={widgetMessage}
            />
          </div>
        </section>

        {/* Embed Code Section */}
        <section className="p-4 border rounded-lg bg-gradient-to-t  from-blue-800/10 to-purple-900/10  border-teal-100/10">
          <h2 className="text-lg font-semibold">Embed Code</h2>
          <EmbeddedCodeGenerator
            widgetColor={widgetColor}
            widgetPosition={widgetPosition}
            widgetMessage={widgetMessage}
            apikey={apiKey}
          />
        </section>

        <button
          type="submit"
          disabled={loading}
          className="px-10 py-4 rounded-full   border border-teal-700/30 w-full text-center bg-[#7B8CE5] justify-center flex flex-row items-center gap-3 to-black/0 text-white mt-6  hover:bg-indigo-300/80 transition"
        >
          {loading ? "Deploying..." : "Deploy the Bot"}
        </button>
      </form>
    </div>
  );
};

export default CustomIntegrationComponent;
