"use client";

import { useState, useRef, useEffect } from "react";
import { InfoIcon } from "lucide-react";
import { useParams } from "next/navigation";

type Message = {
  text: string;
  isUser: boolean;
};

export default function ProtectedPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]); // ✅ Correctly typed state
  const [isClient, setIsClient] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const params = useParams();
  const userid = params.userid as string | undefined; // ✅ Safer typing
  const chatEndRef = useRef<HTMLDivElement | null>(null); // ✅ Correct useRef type

  useEffect(() => {
    if (userid) {
      console.log("User ID from params:", userid);
      setUserId(userid); // ✅ Set userId safely
    }
    setIsClient(true);
  }, [userid]);

  const handleSubmit = async (e: React.FormEvent) => { // ✅ Fixed event type
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Prompt cannot be empty");
      return;
    }

    setError("");
    setMessages((prev) => [...prev, { text: prompt, isUser: true }]); // ✅ Type-safe update
    setPrompt("");

    try {
      const res = await fetch("https://api.thetasden.site/rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt, user_id: userId }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      setError("Failed to fetch response");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-6">
      <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
        <InfoIcon size="16" strokeWidth={2} />
        This is a protected page. You can only see it as an authenticated user.
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Chat with RAG</h2>
        <div className="flex flex-col gap-4 max-h-[400px] overflow-auto p-4 border rounded-lg bg-gray-50">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 mb-3 rounded-lg text-sm ${message.isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-4 mt-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className="p-3 border rounded w-full shadow-sm"
          />
          <button type="submit" className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
            Send
          </button>
        </form>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
