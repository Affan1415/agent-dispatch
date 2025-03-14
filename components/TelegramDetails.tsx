"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlurredCircle from "./BlurredCircle";

interface TelegramDetailsProps {
  data: {
    telegram_bot_token: string;
  };
}

const TelegramDetails: React.FC<TelegramDetailsProps> = ({ data }) => {
  const [copyMessage, setCopyMessage] = useState("");
  const [username, setUsername] = useState("");

  // Function to fetch bot details from Telegram API
  const fetchBotUsername = async () => {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${data.telegram_bot_token}/getMe`
      );
      const result = await response.json();

      if (result.ok) {
        setUsername(result.result.username);
        console.log(result.result.username)
      } else {
        console.error("Failed to fetch bot username:", result);
      }
    } catch (error) {
      console.error("Error fetching bot username:", error);
    }
  };

  useEffect(() => {
    if (data.telegram_bot_token) {
      fetchBotUsername();
    }
  }, [data.telegram_bot_token]);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.telegram_bot_token);
    setCopyMessage("Token copied to clipboard!");
    setTimeout(() => setCopyMessage(""), 3000);
  };

  return (
    <div className="h-auto text-white flex flex-col items-center p-8 relative">
      <div className="absolute left-0 opacity-90">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-90 scale-x-[-1]">
        <BlurredCircle />
      </div>
      <div className="max-w-5xl w-full from-blue-800/20 to-purple-900/10 border-teal-100/10 border p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Telegram Bot Details</h1>
        <p className="mb-6 text-gray-400">
          Your Telegram bot has been successfully created.
        </p>

        {/* Bot Token Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Bot Token
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              value={data.telegram_bot_token}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
            />
            <Button onClick={handleCopy} className="bg-blue-500 hover:bg-blue-600">
              Copy
            </Button>
          </div>
          {copyMessage && <p className="mt-2 text-green-400 text-sm">{copyMessage}</p>}
        </div>

        {/* Integration Instructions Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Integration Instructions</h2>
          <p className="text-gray-400 mb-4">
            To integrate your Telegram bot, use the Telegram app or visit BotFather to manage your bot settings. You can customize integration options below.
          </p>
          <h2 className="text-2xl font-bold text-gray-200 mb-6 border-b pb-2">
            Set Up Your Telegram Bot
          </h2>
          <ol className="list-decimal list-inside text-gray-200 mb-6 space-y-1">
            <li>Open Telegram and search for <strong>BotFather</strong>.</li>
            <li>Start a chat and use the command <code>/newbot</code>.</li>
            <li>Choose a name and a unique username for your bot.</li>
            <li>BotFather will provide you with an API token. Copy it.</li>
            <li>Paste the token below and submit.</li>
          </ol>
          <div className="flex flex-row flex-wrap items-center justify-center w-full gap-4">
            {username ? (
              <Link href={`https://t.me/${username}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-purple-500/70 hover:bg-purple-600">Use Telegram App</Button>
              </Link>
            ) : (
              <Button disabled className="bg-gray-500 cursor-not-allowed">
                Fetching Bot Username...
              </Button>
            )}
            <Button className="bg-green-500/70 hover:bg-green-600">Use BotFather Plugin</Button>
          </div>
          <p className="mt-6 text-gray-400 text-sm mx-auto w-full text-center">
            For more help, visit{" "}
            <Link href="https://t.me/botfather" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              BotFather
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TelegramDetails;
