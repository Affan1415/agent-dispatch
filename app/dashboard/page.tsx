"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardCards from "@/components/DashboardCards";
import BlurredCircle from "../../components/BlurredCircle";
import BlurredEllipse from "../../components/BlurredEllipse";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { LayoutGridIcon, Loader2Icon, PlusIcon } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [chatbots, setChatbots] = useState<any[]>([]);
  const [userId, setUserId] = useState<any>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [plan, setPlan] = useState<string>("FREE");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);

      // Fetch the user using Supabase auth
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      // Redirect to /sign-in if no user is authenticated
      if (!user) {
        router.push("/sign-in");
        return;
      }

      // Set user data
      setUserId(user.id);
      setUserEmail(user.email ?? "");

      // Fetch user plan
      const { data: userPlanData, error: planError } = await supabase
        .from("users")
        .select("plan_sub")
        .eq("userID", user.id)
        .single();

      if (planError) {
        console.error("Error fetching user plan:", planError);
      } else {
        setPlan(userPlanData?.plan_sub?.toLowerCase() || "free");
      }

      // Fetch chatbots for the logged-in user
      const { data, error: chatbotError } = await supabase
        .from("chatbots")
        .select("*")
        .eq("user_id", user.id);

      if (chatbotError) {
        console.error("Error fetching chatbots:", chatbotError);
      } else {
        setChatbots(data);
      }

      setIsLoading(false);
    }

    fetchUserData();
  }, [supabase, router]);

  // Define chatbot limits
  const chatbotLimit = plan === "pro" ? 5 : 1;
  const hasReachedLimit = chatbots.length >= chatbotLimit;

  const createCheckoutSession = async (userId: string, userEmail: string) => {
    setIsPurchasing(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userEmail,
          priceId: "price_1QzdpULSawqmEqNTbYbWNmre",
        }),
      });

      const data = await response.json();

      if (data.url) {
        setIsPurchasing(false);
        window.location.href = data.url;
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Map chatbots to expected format for DashboardCards
  const chatbotCards = chatbots.map((bot) => ({
    id: bot.chatbot_id,
    image: bot.image || "/images/1.png",
    alt: bot.name,
    title: bot.name,
    subtitle: bot.description || "Chatbot",
    capacity: 0,
  }));

  const agents = [
    {
      id: "1",
      name: "Nova - Social Media Manager",
      role: "AI Social Media Manager",
      description:
        "Seamlessly embed an intelligent, interactive chat agent into any website with a single script. Elevate engagement, automate customer support, and enhance user interactions effortlessly!",
      image: "images/Sophia.png",
      price: "49",
      glowColor: "#68E4FF",
    },
    {
      id: "2",
      name: "Sophia - Chatbot Developer",
      role: "Customer Service & Social Media Chatbot Agent",
      description:
        "Easily integrate smart, engaging chatbots into your webiste with just a simple script or with social media . Boost engagement, automate responses, and interact 24/7—all in minutes!",
      image: "images/Phone.png",
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
      image: "images/Business.png",
      glowColor: "#68E4FF",
    },
  ];

  const agents2 = [
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
  ];

  const totalSlides = agents.length;

  return (
    <>
      {isLoading ? (
        <div className="py-32 flex items-center justify-center w-fit mx-auto ">
          <Loader2Icon className="w-12 h-12 text-white animate-spin rotate-360" />
        </div>
      ) : (
        <div className="p-8 bg-black h-full min-h-[80vh] relative flex items-center justify-center">
          <div className="absolute left-0 opacity-90">
            <BlurredCircle />
          </div>
          <div className="absolute right-0 opacity-90 scale-x-[-1]">
            <BlurredCircle />
          </div>

          {plan === "pro" ? (
            <>
              {(chatbots?.length ?? 0) ? (
                <div className="max-w-screen-xl z-[50] flex flex-col self-start  w-full">
                  <div className="flex justify-between items-center w-full mb-6 max-w-screen-xl z-10  ">
                    <h1 className="text-3xl font-semibold text-white flex flex-row gap-2 items-center">
                      <LayoutGridIcon className="w-6 h-6 text-white" />
                      Dashboard
                    </h1>
                  </div>
                  <div className="p-2 rounded-xl">
                    <DashboardCards
                      cards={chatbotCards}
                      hasReachedLimit={hasReachedLimit}
                      userId={userId}
                    />
                  </div>
                </div>
              ) : (
                <section className="flex flex-col   z-[50] min-h-[70vh] h-auto  items-center justify-center gap-4 sm:gap-8 px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-12 md:py-16">
                  <h2 className="text-4xl lg:text-6xl font-semibold  leading-tight text-center w-full text-white">
                    <span className="bg-gradient-to-r from-blue-300 via-purple-200 to-pink-300 text-transparent bg-clip-text">
                      You are on Pro Plan!
                    </span>
                  </h2>
                  <h2 className="text-2xl lg:text-3xl -translate-y-2  leading-tight text-center w-full text-gray-400">
                    Choose the agent to deploy.
                  </h2>
                  <div className="relative flex items-center justify-center mt-8">
                    <div className="relative flex o w-full flex-col  items-center justify-center">
                      <div className="flex flex-col lg:flex-row gap-6 transition-transform duration-500">
                        {agents2.slice(0, 2).map((agent, i) => (
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
                              <p className="text-white font-medium mt-4">
                                {agent.role}
                              </p>
                              <p className="text-gray-400 text-md  mt-6">
                                {agent.description}
                              </p>

                              {hasReachedLimit ? (
                                <button
                                  onClick={() =>
                                    createCheckoutSession(userId, userEmail)
                                  }
                                  className="px-6 py-2 rounded-full cursor-pointer text-white hover:bg-blue-600 mt-8 bg-[#7B8CE5] disabled:bg-gray-600"
                                  disabled={isPurchasing}
                                >
                                  {isPurchasing ? (
                                    <span>Please Wait ...</span>
                                  ) : (
                                    <>Buy the Agent</>
                                  )}
                                </button>
                              ) : (
                                <Link
                                  href={`/create-chatbot/${userId}/upload-pdf/${agent.id}`}
                                >
                                  <button className="px-6 py-2 rounded-lg w-full transition mt-8 bg-[#7b8de557] hover:bg-blue-600 text-white">
                                    Deploy Agent
                                  </button>
                                </Link>
                              )}
                              {hasReachedLimit && (
                                <p className="text-red-400 mt-2 text-sm">
                                  Subscribe to Pro plan to increase limit to 5
                                  chatbots.
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          ) : (
            <section className="relative flex flex-col items-center justify-center  w-full px-4 sm:px-8 md:px-12 lg:px-20 py-4 mb-4 lg:mb-16 sm:py-12 md:py-20">
              <h2 className="text-4xl lg:text-6xl font-semibold  leading-tight text-center w-full text-white">
                <span className="bg-gradient-to-r from-blue-300 via-purple-200 to-pink-300 text-transparent bg-clip-text">
                  Subscribe to Pro Plan
                </span>
              </h2>
              <div className="relative flex items-center justify-center mt-8 md:mt-32">
                <div className="relative flex o w-full flex-col  items-center justify-center">
                  <div className="flex flex-col lg:flex-row gap-6 transition-transform duration-500">
                    {agents.map((agent, i) => (
                      <div
                        key={agent.name}
                        className={`relative w-[350px] lg:w-[360px] p-6 rounded-xl shadow-lg ${i === 0 ? "lg:-translate-x-8" : ""} ${i === 1 ? "lg:scale-[1.2] lg:z-10 lg:shadow-3xl lg:shadow-blue-700/20 lg:w-[350px]" : "w-[320]"} ${i === 2 ? "lg:translate-x-8" : ""}`}
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
                            <div className="absolute top-0 left-0 -z-[10] opacity-70 scale-125 translate-x-4 -translate-y-2 ">
                              <GlowEffect color={agent.glowColor} />
                            </div>
                          </div>
                          <h4 className="text-xl font-semibold text-white mt-8">
                            {agent.name}
                          </h4>
                          <p className="text-white font-medium mt-4">
                            {agent.role}
                          </p>
                          <p className="text-gray-400 text-md  mt-6">
                            {agent.description}
                          </p>

                          <p className="text-4xl text-white mt-8  ">
                            ${agent.price}{" "}
                            <span className="text-xl text-gray-500">
                              / month
                            </span>
                          </p>
                          {i === 1 ? (
                            <button
                              onClick={() =>
                                createCheckoutSession(userId, userEmail)
                              }
                              className="px-6 py-2 rounded-lg cursor-pointer text-white hover:bg-blue-600 mt-8 bg-[#7b8de56a] disabled:bg-gray-600"
                              disabled={isPurchasing}
                            >
                              {isPurchasing ? (
                                <span>Please Wait ...</span>
                              ) : (
                                <>Buy the Agent</>
                              )}
                            </button>
                          ) : (
                            <button
                              className="px-6 py-2 rounded-lg cursor-pointer text-white hover:bg-blue-600 mt-8 bg-[#7b8de56a] disabled:bg-gray-600"
                              disabled={true}
                            >
                              Coming Soon
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}

interface GlowEffectProps {
  color: string;
}

const GlowEffect: React.FC<GlowEffectProps> = ({ color }) => {
  return (
    <svg
      width="225"
      height="225"
      viewBox="0 0 365 365"
      className="scale-110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_77_165)">
        <circle
          cx="182.5"
          cy="182.5"
          r="125.5"
          fill={`url(#paint0_radial_77_165_${color})`}
          fillOpacity="0.7"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_77_165"
          x="0.91061"
          y="0.91061"
          width="363.179"
          height="363.179"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="28.0447"
            result="effect1_foregroundBlur_77_165"
          />
        </filter>
        <radialGradient
          id={`paint0_radial_77_165_${color}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(182.5 182.5) rotate(90) scale(125.5)"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
