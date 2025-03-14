"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  CheckCircle,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  RefreshCcw,
  Clock,
  HelpCircle,
  Zap,
} from "lucide-react";
import BlurredCircle from "@/components/BlurredCircle";
import AgentCarousel from "@/components/AgentCarousel";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

// Dynamically import PricingCarousel to disable SSR for Swiper components
const PricingCarousel = dynamic(() => import("@/components/PricingCarousel"), {
  ssr: false,
});

const plans = [
  {
    name: "Nova - AI Custom Chatbot",
    description:
      "Nova is an AI-powered agent that effortlessly creates intelligent chatbots, seamlessly integrating into any website with just a simple script. Enhance customer engagement, automate support, and deliver dynamic interactions—all with minimal setup.",
    price: 49,
    image: "images/Inspector.png",
  },
  {
    name: "Lumi  - Social Media Chatbot Agent",
    description:
      "Lumi is a powerful AI agent that effortlessly creates and deploys bots, seamlessly integrating them into Telegram. Automate conversations, enhance engagement, and streamline interactions with ease..",
    price: 49,
    image: "images/Magni.png",
  },
  {
    name: "Luna - Creative AI Coming Soon",
    description: "AI-powered assistant for designers, writers, and creatives.",
    price: 49,
    image: "images/Builder.png",
  },
];

const createCheckoutSession = async (userId, userEmail) => {
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

const PricingPage = () => {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    };

    getUser();
  }, []); // Removed supabase from dependency array to avoid unnecessary re-fetches.

  const agents = [
    {
      id: "1",
      name: "Nova - Social Media Manger",
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
  const totalSlides = agents.length;
  const GlowEffect = ({ color }) => (
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
  return (
    <div className="bg-black text-white flex items-center justify-center w-full relative">
      <div className="absolute left-0 opacity-[0.8]  ">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-[0.8] scale-x-[-1]  ">
        <BlurredCircle />
      </div>

      <div className="max-w-screen-xl w-full flex flex-col  ">
        <div>
          <section className="relative py-16 md:py-32  w-full">
            <h3 className="text-center text-3xl lg:text-5xl font-semibold text-white">
              Pricing Plans
            </h3>
            <div className="relative flex items-center justify-center  mt-8 md:mt-32">
              <div className="relative flex o w-full flex-col  items-center justify-center">
                <div
                  className="flex flex-col lg:flex-row gap-6 transition-transform duration-500"
                  style={{ transform: `translateX(-${index * 220}px)` }} // Adjust slide movement
                >
                  {agents.map((agent, i) => (
                    <div
                      key={agent.name}
                      className={`relative w-[350px] lg:w-[360px] p-6 rounded-xl shadow-lg ${i === 0 ? "lg:-translate-x-8" : ""} ${i === 1 ? "lg:scale-[1.2] lg:z-10 lg:shadow-3xl lg:shadow-blue-700/20 lg:w-[350px]" : "w-[320]"} ${i === 2 ? "lg:translate-x-8" : ""}`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-t rounded-xl from-blue-800/20 to-purple-900/10 border border-teal-100/10 `}
                      ></div>
                      <div className="relative  flex flex-col justify-between h-full z-10">
                        <div className="relative mt-12">
                          <img
                            src={agent.image}
                            alt={agent.name}
                            className="mx-auto h-48 z-[100]"
                          />
                          <div className="absolute top-0 left-0 -z-[10] opacity-70 scale-125 translate-x-4 -translate-y-2 ">
                            <GlowEffect color={agent.glowColor} />
                          </div>
                        </div>
                        <h4 className="text-xl font-semibold text-white mt-16">
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
                          <span className="text-xl text-gray-500">/ month</span>
                        </p>
                        {user ? (
                          agent.id === 1 ? (
                            <button
                              onClick={() => {
                                createCheckoutSession(user.id, user.email);
                              }}
                              className="bg-[#7b8de570] self-end w-full px-6 py-2 rounded-lg mt-6 text-white  transition-all duration-300 hover:bg-indigo-600 hover:scale-105"
                            >
                              Get the Agent
                            </button>
                          ) : (
                            <button className="bg-[#7b8de570] self-end w-full px-6 py-2 rounded-lg mt-6 text-white  transition-all duration-300 hover:bg-indigo-600 hover:scale-105">
                              Coming Soon
                            </button>
                          )
                        ) : (
                          <Link href="/sign-in">
                            <p className="bg-[#7b8de570] self-end w-full px-6 py-2 rounded-lg mt-6 text-white  transition-all duration-300 hover:bg-indigo-600 hover:scale-105">
                              Get the Agent
                            </p>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Resource Usage */}
        {/* <div className="px-4 mf:px-12 lg:px-28 mt-12">
          <div className="p-6 md:p-10 w-full min-h-[500px]  bg-gradient-to-t rounded-xl mx-auto from-blue-800/10 to-purple-900/10 border border-teal-100/10 ">
            <h2 className="text-2xl font-bold mb-4">Usage</h2>
            <ul className="list-none space-y-4 text-gray-800">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
                <span className="text-gray-200">
                  <strong>Monthly Credits:</strong> Each plan includes a set
                  number of credits per month, which can be used for AI-powered
                  tasks such as content generation, scheduling, and analytics.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CreditCard className="text-blue-500 w-6 h-6 mt-1" />
                <span className="text-gray-200">
                  <strong>Usage Limits:</strong> Actions like AI-driven
                  scheduling, text-to-image generation, and automation workflows
                  deduct credits from your balance.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="text-yellow-500 w-6 h-6 mt-1" />
                <span className="text-gray-200">
                  <strong>Top-Up Anytime:</strong> Need more credits? You can
                  purchase additional credits or upgrade your plan at any time
                  for uninterrupted service.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-purple-500 w-6 h-6 mt-1" />
                <span className="text-gray-200">
                  <strong>Fair Usage Policy:</strong> To maintain a high-quality
                  experience, fair usage limits apply. If you exceed your
                  limits, you may need to upgrade or wait for the next renewal
                  cycle.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <RefreshCcw className="text-red-500 w-6 h-6 mt-1" />
                <span className="text-gray-200">
                  <strong>Auto-Renewal & Expiry:</strong> Credits automatically
                  renew monthly, and unused credits may not roll over unless
                  specified in your plan.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-orange-500 w-6 h-6 mt-1" />
                <span className="text-gray-200">
                  <strong>Priority Access:</strong> Higher-tier plans may
                  include priority processing for AI tasks, ensuring faster
                  response times and improved performance.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="text-indigo-500 w-6 h-6 mt-1" />
                <span className="text-gray-200">
                  <strong>Bonus Credits & Discounts:</strong> Get exclusive
                  discounts or bonus credits on special occasions, promotions,
                  or through loyalty programs.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <HelpCircle className="text-teal-500 w-6 h-6 mt-1" />
                <span className="text-gray-200">
                  <strong>Support & Assistance:</strong> Higher plans may
                  include premium support, faster response times, and direct
                  assistance from our expert team.
                </span>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PricingPage;
