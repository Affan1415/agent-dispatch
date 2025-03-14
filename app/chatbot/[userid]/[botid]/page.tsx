"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlurredCircle from "@/components/BlurredCircle";
import { createClient } from "@/utils/supabase/client";

export default function ProtectedPage() {
  const router = useRouter();
  const params = useParams();
  const botid = params?.botid as string;
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<
    { text: string; isUser: boolean }[]
  >([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Authentication check: redirect to sign-in if no user is authenticated
  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
        return;
      }
      // Retrieve user id from params if available
      const userid = params?.userid as string;
      if (userid) {
        setUserId(userid);
      }
    }
    checkAuth();
  }, [router, params, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Prompt cannot be empty");
      return;
    }

    setError("");

    // Append the user message to state
    const newUserMessage = { text: prompt, isUser: true };
    setMessages((prev) => [...prev, newUserMessage]);
    setPrompt("");

    setIsBotTyping(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }

      const res = await fetch(`${apiUrl}/rag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: prompt,
          user_id: userId,
          history: [...messages, newUserMessage].slice(-5),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("API Response:", data);

      const responseText =
        data.response?.content &&
        typeof data.response.content === "string"
          ? data.response.content
          : "No valid response from server";

      // Append bot message to state
      const newBotMessage = { text: responseText, isUser: false };
      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch response");
    } finally {
      setIsBotTyping(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isBotTyping]);

  return (
    <div className="w-full flex items-center gap-6 sm:p-6 flex-col relative">
      <div className="max-w-screen-xl w-full flex flex-col gap-2 z-50">
        <div className="flex flex-col items-center justify-center gap-4 text-white z-[100]">
          <div className="max-w-full flex flex-col items-center justify-center text-center z-[100]">
            <h2 className="text-4xl lg:text-6xl font-semibold w-full leading-tight">
              <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-200/40 text-transparent bg-clip-text">
                Kaboom!
              </span>{" "}
              Chatbot is Created
            </h2>
            <p className="text-gray-400 mt-6 text-sm sm:text-base max-w-4xl">
              Test the bot using the provided window and ask relevant questions
              based on the document. After testing, click on 'Integration' to
              integrate the bot.
            </p>

            <Link
              href={`/integrations/${userId}/${botid}`}
              className="px-10 py-4 rounded-full border border-teal-700/20 bg-gradient-to-r from-blue-700/30 via-blue-700/20 to-black/0 text-white mt-6 hover:bg-blue-700/40 transition"
            >
              Go to Integrations{" "}
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>

            <div className="flex flex-row gap-2 items-center flex-wrap mt-6">
              <h1 className="pr-6">Ask Some Question Like:</h1>
              <div className="px-5 py-2 rounded-full border border-blue-700/40">
                What is this document about?
              </div>
              <div className="px-5 py-2 rounded-full border border-blue-700/40">
                Anything about the document?
              </div>
              <div className="px-5 py-2 rounded-full border border-blue-700/40">
                Give summary for the document?
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col gap-4 mt-8 bg-gradient-to-t z-50 relative max-h-[600px] from-blue-800/20 to-purple-900/10 border border-teal-100/10 rounded-lg shadow-lg p-4 min-h-[600px]">
          <div
            ref={chatContainerRef}
            className="flex-1 flex flex-col gap-4 overflow-y-auto"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? "bg-blue-700/40 text-white rounded-br-none"
                      : "bg-teal-700/20 text-gray-200 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-teal-700/40 text-gray-800 p-3 rounded-lg rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-700 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-700 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-700 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 bg-transparent"
          >
            <div className="w-full h-full bg-gradient-to-r from-black/20 to-teal-900/10 border-teal-700/10">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 border text-white border-teal-700/30 rounded-lg w-full bg-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700/40"
              />
            </div>
            <button
              type="submit"
              className="p-3 bg-[#7B8CE5] text-white rounded-lg hover:bg-blue-700/40 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      <div className="absolute left-0 opacity-[0.5] -z-10">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-[0.5] scale-x-[-1] -z-10">
        <BlurredCircle />
      </div>
    </div>
  );
}
