"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlowEffect from "@/components/GlowEffect";
import BlurredCircle from "@/components/BlurredCircle";
import { createClient } from "@/utils/supabase/client";

export default function CreateChatBot() {
  const params = useParams();
  const userId = params?.userid as string; // Ensure that your route is /create-chatbot/[userId]
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
      }
    }
    checkAuth();
  }, [router, supabase]);

  const agents = [
    {
      id: "1",
      name: "Sophia - Website Agent",
      role: "AI Customer Service Chatbot Agent",
      description:
        "Effortlessly integrate smart, dynamic chatagent into any website with just a simple script. Boost engagement, automate support, and enhanceinteractions, all in minutes!",
      image: "/images/Sophia.png",
      price: "49",
      glowColor: "#68E4FF",
    },
    {
      id: "2",
      name: "Sophia - Social Agent",
      role: "Social Media Messaging Chatbot Agent",
      description:
        "Easily integrate smart, engaging chatbots into your social media with just a simple script. Boost engagement, automate responses, and interact 24/7—all in minutes!",
      image: "/images/Phone.png",
      price: "49",
      glowColor: "#DC75F5",
    },
    {
      id: "3",
      name: "Neon. eCommerce Expert.",
      price: "49",
      role: "eCommerce Expert. Coming Soon!",
      description:
        "Your go-to AI for online business success, helping with store setup, product launches, and optimizing eCommerce operations for smooth growth..",
      image: "/images/Business.png",
      glowColor: "#68E4FF",
    },
  ];

  return (
    <div className="min-h-[70vh] bg-black text-white flex flex-col items-center p-6 relative">
      <div className="absolute left-0 opacity-90 -z-0 -translate-y-64 ">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-90 -z-0 scale-x-[-1] -translate-y-64 ">
        <BlurredCircle />
      </div>

      <div className="max-w-screen-xl flex items-center justify-center flex-col gap-12 ">
        <div className="w-full max-w-5xl text-center">
          <h2 className="text-5xl font-semibold">
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
              Choose the Agent
            </span>
          </h2>
          <p className="text-gray-400 text-xl mt-4">
            Select the agent to create
          </p>
        </div>

        {/* Agents Grid */}
        <div className="flex flex-row gap-8 items-center justify-center ">
          {agents.slice(0, 2).map((agent, i) => (
            <div
              key={agent.name}
              className={`relative w-[350px] lg:w-[460px] p-6 rounded-xl shadow-lg`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-t rounded-xl from-blue-800/20 to-purple-900/10 border border-teal-100/10 `}
              ></div>
              <div className="relative  flex flex-col justify-between h-full z-10">
                <div className="relative mt-8">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="mx-auto h-48 z-[100]"
                  />
                  <div className="absolute top-0 left-0 -z-[10] opacity-70 scale-125 translate-x-12 -translate-y-2 ">
                    <GlowEffect color={agent.glowColor} />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-white mt-8">
                  {agent.name}
                </h4>
                <p className="text-white font-medium mt-4">{agent.role}</p>
                <p className="text-gray-400 text-md  mt-6">
                  {agent.description}
                </p>

                <Link href={`/create-chatbot/${userId}/upload-pdf/${agent.id}`}>
                  <button className="px-6 py-2 rounded-lg w-full transition mt-8 bg-[#7b8de557] hover:bg-blue-600 text-white">
                    Create the Chatbot
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add Button */}
      </div>
    </div>
  );
}
