"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function TelegramBotSetup() {
  const [userID, setUserID] = useState("");
  const [telegramToken, setTelegramToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      setUserID(Array.isArray(params.id) ? params.id[0] : params.id);
    }
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramToken) {
      setMessage("Please enter a valid Telegram bot token.");
      return;
    }
    setLoading(true);
    setMessage("");

    // Data to be sent
    const payload = {
      userID,
      telegram_bot_token: telegramToken,
    };

    try {
      // 2. Send data to external API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      console.log(userID);
      const response = await fetch(`${apiUrl}/telegram/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const apiResult = await response.json();
      console.log(apiResult);
      if (!response.ok)
        throw new Error(apiResult.message || "Failed to send data to API");

      setMessage("Bot token successfully saved and sent to API!");
      setTelegramToken("");
    } catch (err) {
      if (err instanceof Error) {
        setMessage(`Error: ${err.message}`);
      } else {
        setMessage("An unknown error occurred");
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-xl font-bold mb-4">Set Up Your Telegram Bot</h2>
      <p className="mb-2">
        1. Open Telegram and search for <strong>BotFather</strong>.
      </p>
      <p className="mb-2">
        2. Start a chat and use the command <code>/newbot</code>.
      </p>
      <p className="mb-2">
        3. Choose a name and a unique username for your bot.
      </p>
      <p className="mb-2">
        4. BotFather will provide you with an API token. Copy it.
      </p>
      <p className="mb-4">5. Paste the token below and submit.</p>

      {userID ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Telegram Bot Token"
            value={telegramToken}
            onChange={(e) => setTelegramToken(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Token"}
          </button>
        </form>
      ) : (
        <p className="text-red-500">User ID not found. Please try again.</p>
      )}

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
