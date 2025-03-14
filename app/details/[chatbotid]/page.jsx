import React from "react";
import CustomDetails from "@/components/CustomDetails";
import TelegramDetails from "@/components/TelegramDetails";
import { supabase } from "@/utils/supabase";

export default async function DetailsPage({ params }) {
  const chatbotid = params.chatbotid;

  // Fetch chatbot details from custom_website_chatbots
  const { data: customData, error: customError } = await supabase
    .from("custom_website_chatbots")
    .select("*")
    .eq("chatbot_id", chatbotid)
    .single();

  if (customData) {
    return <CustomDetails widget_script={customData.widget_script} />;
  }

  // Fetch chatbot details from telegram_chatbots
  const { data: telegramData, error: telegramError } = await supabase
    .from("telegram_chatbots")
    .select("*")
    .eq("chatbot_id", chatbotid)
    .single();

  if (telegramData) {
    return <TelegramDetails data={telegramData} />;
  }

  // Show a message if no chatbot is found
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <p className="text-xl">Chatbot not found.</p>
    </div>
  );
}
