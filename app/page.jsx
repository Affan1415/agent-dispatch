"use client";
import Head from "next/head";
import { useState } from "react";
import AgentCarousel from "../components/AgentCarousel";
import Image from "next/image";

import { ChevronDown, ChevronUp } from "lucide-react";

const FAQs = [
  {
    question: "What can I use Agent Dispatch for?",
    answer:
      "Agent Dispatch helps automate customer support, task management, and AI-driven interactions for businesses.",
  },
  {
    question: "Can Sophia work on a website and my social media?",
    answer:
      "Yes! You can integrate Sophia with any website and Telegram for now, with more platforms coming soon.",
  },
  {
    question: "Does Agent Dispatch integrate with other software?",
    answer:
      "Currently, it works with Telegram and websites. Soon, Instagram, WhatsApp, and Facebook will be added.",
  },
  {
    question: "What do I do if I need a more custom AI solution?",
    answer:
      "Contact us on the Contact page and submit the form. We'll get back to you with a tailored solution!",
  },
  {
    question: "How do I get started?",
    answer:
      "Click on 'Get Started,' log in, upload your PDF, and your agent is ready to go!",
  },
];

export default function Home() {
  const [faqOpen, setFaqOpen] = useState(null);

  const BlurredCircle = () => {
    return (
      <svg
        width="647"
        height="1295"
        viewBox="0 0 647 1295"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <g filter="url(#filter0_f_8_1191)">
          <circle
            cx="647.5"
            cy="647.5"
            r="447.5"
            fill="url(#paint0_radial_8_1191)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_8_1191"
            x="0"
            y="0"
            width="1295"
            height="1295"
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
              stdDeviation="100"
              result="effect1_foregroundBlur_8_1191"
            />
          </filter>
          <radialGradient
            id="paint0_radial_8_1191"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(647.5 647.5) rotate(90) scale(447.5)"
          >
            <stop stopColor="#1B255E" />
            <stop offset="1" stopColor="#1B255E" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );
  };

  const BlurredCircleLeft = () => {
    return (
      <svg
        width="648"
        height="1295"
        viewBox="0 0 648 1295"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <g filter="url(#filter0_f_10_1514)">
          <circle
            cx="0.5"
            cy="647.5"
            r="447.5"
            fill="url(#paint0_radial_10_1514)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_10_1514"
            x="-647"
            y="0"
            width="1295"
            height="1295"
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
              stdDeviation="100"
              result="effect1_foregroundBlur_10_1514"
            />
          </filter>
          <radialGradient
            id="paint0_radial_10_1514"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(0.5 647.5) rotate(90) scale(447.5)"
          >
            <stop stopColor="#1B255E" />
            <stop offset="1" stopColor="#1B255E" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );
  };
  const BlurredEllipse = () => {
    return (
      <svg
        width="747"
        height="222"
        viewBox="0 0 747 222"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <g filter="url(#filter0_f_5_874)">
          <ellipse
            cx="391"
            cy="111"
            rx="371"
            ry="91"
            fill="url(#paint0_radial_5_874)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_5_874"
            x="0"
            y="0"
            width="782"
            height="222"
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
              stdDeviation="10"
              result="effect1_foregroundBlur_5_874"
            />
          </filter>
          <radialGradient
            id="paint0_radial_5_874"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(391 111) rotate(90) scale(91 371)"
          >
            <stop stopColor="#1B255E" />
            <stop offset="1" stopColor="#1B255E" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="h-full bg-black text-white relative overflow-x-hidden ">
      <Head>
        <title>AI-Powered Agents | Agent Dispatch</title>
      </Head>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row h-[40vh] lg:h-[80vh] mt-32 lg:mt-4 items-center justify-center relative w-full bg-[url('/images/bg.jpeg')] bg-cover bg-[position:-0%]">
        <div className="bg-gradient-to-b from-black/90 via-black/0 to-black/90 absolute w-full h-full z-0"></div>

        <div className="bg-gradient-to-r from-black/80 via-black/0 to-black/80 absolute w-full h-full z-0"></div>
        <div className="max-w-screen-xl flex flex-row z-[10] items-center justify-centergap-12 sm:gap-8 px-7 sm:px-0   py-8 sm:py-12 md:py-16">
          <div className="max-w-3xl text-center md:text-left bg-gradient-to-r from-black/20 via-black/0 to-black/10 backdrop-blur-lg p-10 lg:p-16 rounded-xl border border-blue-400/20 ">
            <h2 className="text-4xl lg:text-6xl font-semibold w-full  leading-tight">
              <span className="bg-gradient-to-r from-blue-500 via-purple-200 to-pink-300 text-transparent bg-clip-text">
                Your employees that never sleep!
              </span>
            </h2>
            <p className="text-gray-400 mt-8 text-sm sm:text-base">
              Agent-Dispatch is your all-in-one command center to streamline
              operations, boost productivity, and maximize profits. Manage and
              coordinate your agents effortlessly! anytime, anywhere!
            </p>
            <button className="mt-8 sm:mt-6 bg-[#7B8CE5] px-4 sm:px-6 py-2 sm:py-3  text-white font-semibold hover:bg-blue-600 transition rounded-full">
              Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* AI Models Section */}

      <section className="py-8 mt-32 md:mt-8 sm:mt-0 sm:py-12 flex z-50 items-center justify-center md:py-32">
        <div className="max-w-screen-xl px-7 sm:px-8 md:px-12 lg:px-20 w-full flex flex-col items-center justify-center gap-12 ">
          <h1 className="text-2xl md:text-4xl text-center lg:text-3xl max-w-[750px] font-medium ">
            The Next Generation of AI Workforce, Tailored to Your business.
            Transforming Work into Effortless Efficiency.
          </h1>

          <div className="w-[40%] lg:mt-4   h-[1px] bg-gradient-to-r from-purple-400 via-blue-500 to-green-300"></div>
        </div>
      </section>

      <section
        id="agents"
        className="py-0 sm:py-12 flex items-center justify-center md:py-0 relative lg:mb-8"
      >
        <div className="absolute left-0 opacity-90 ">
          <BlurredCircleLeft />
        </div>
        <div className="bg-black max-w-screen-xl w-full flex justify-center items-center">
          <AgentCarousel />
        </div>
      </section>

      {/* 24/7 Availability */}
      <section className="py-8 sm:py-12 md:py-32 gap-32 flex items-center justify-center relative">
        <div className="absolute right-0 opacity-90 -z-0 ">
          <BlurredCircle />
        </div>
        <div className="max-w-screen-xl items-center justify-between z-10 flex flex-col lg:flex-row w-full gap-12  px-7 sm:px-8 md:px-12 lg:px-20 ">
          <div className=" max-w-4xl  flex items-center justify-center flex-col text-center md:text-left w-full ">
            <h3 className="text-2xl sm:text-2xl md:text-3xl w-full font-semibold text-center ">
              <span className="bg-gradient-to-r from-blue-300 via-purple-200 to-pink-200 text-transparent bg-clip-text">
                A Tireless Workforce, Always on Duty.
              </span>
            </h3>
            <p className="text-gray-300 max-w-xl mt-4 text-sm sm:text-base text-center font-light">
              <span className=" underline underline-offset-2">
                Available 24/7,
              </span>{" "}
              our Al-powered agents work{" "}
              <span className=" underline underline-offset-2">
                around the clock,
              </span>{" "}
              so you don't have to.{" "}
              <span className=" underline underline-offset-2">
                Automate tasks, enhance customer support,
              </span>{" "}
              and maximize efficiency while{" "}
              <span className=" underline underline-offset-2">
                saving valuable time.
              </span>{" "}
            </p>

            <p className="text-gray-300 max-w-xl  text-sm sm:text-base font-light text-center mt-8">
              Break barriers and scale globally with Al that speaks,
              understands, and delivers in{" "}
              <span className="underline underline-offset-2">
                over 100 languages.
              </span>{" "}
            </p>
            <p className="text-gray-300 max-w-xl  text-sm sm:text-base font-light mt-8">
              {"    "}
            </p>
            <h3 className="text-2xl sm:text-2xl md:text-3xl  text-center font-semibold">
              <span className="bg-gradient-to-r from-blue-300 via-purple-200 to-pink-200 text-center  text-transparent bg-clip-text">
                A Tireless Workforce, Always on Duty.
              </span>
            </h3>
            <p className="text-gray-300 max-w-xl mt-4 text-sm sm:text-base text-center font-light">
              Your{" "}
              <span className=" underline underline-offset-2">
                Al team learns
              </span>{" "}
              the ins and outs of your business, delivering accurate and
              personalized responses.{" "}
              <span className=" underline underline-offset-2">Simply</span>{" "}
              upload files, share instructions, or{" "}
              <span className=" underline underline-offset-2">integrate</span>{" "}
              your website—the more they know, the better they perform.
            </p>
          </div>

          {/* Right Content */}
          <div className="w-full flex md:items-end md:justify-end gap-2 z-10 md:gap-6 flex-col  max-w-fit">
            <div className="fleex flex-col gap-6 h-full items-center justify-center">
              <h2 className=" text-center text-8xl md:text-[150px] z-10 font-bold bg-gradient-to-r from-purple-500 via-blue-300 to-teal-300 text-transparent bg-clip-text ">
                24/7
              </h2>
              <p className="text-center text-lg md:text-2xl mt-4">
                Availability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Integration */}
      <section
        id="features"
        className="relative py-16 md:py-24  text-white px-7 sm:px-8 md:px-12 w-full lg:px-20 h-auto overflow-hidden"
      >
        {/* Centered Text */}
        <div className="text-center flex flex-col items-center justify-center  w-full  mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center  ">
            Tailored to Your Business, Just Like Real Employees.
          </h2>
          <p className="text-gray-400 max-w-2xl mt-4 lg:mt-8 text-sm sm:text-base text-center">
            Your AI team learns the ins and outs of your business, giving
            personalized answers about your brand. Upload files, share
            instructions, or link your website to enhance results—the more they
            know, the better they perform.
          </p>
        </div>

        {/* Floating Integration Cards */}
        <div className="relative w-full h-auto mt-8 sm:mt-12 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-5xl px-4 sm:px-0">
            {/* Facebook Insights */}
            <div className="bg-gray-900 p-4 sm:p-5 rounded-xl shadow-md flex items-center gap-3 sm:gap-4 min-w-[260px] hover:scale-105 transition duration-300">
              <img
                src="/images/fb-icon.png"
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
              <div>
                <h4 className="text-base sm:text-lg font-semibold">
                  Facebook Insights
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Trustpilot, 43 reviews
                </p>
              </div>
            </div>

            {/* Brand Website */}
            <div className="bg-gray-900 p-4 sm:p-5 rounded-xl shadow-md flex items-center gap-3 sm:gap-4 min-w-[260px] hover:scale-105 transition duration-300">
              <img
                src="/images/globe-icon.png"
                className="w-6 h-6 sm:w-12 sm:h-12"
              />
              <div>
                <h4 className="text-base sm:text-lg font-semibold">
                  Brand Website
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Customer Serice Bot Integrations
                </p>
              </div>
            </div>

            {/* Conversation with Julia */}
            <div className="bg-gray-900 p-4 sm:p-5 rounded-xl shadow-md flex items-center gap-3 sm:gap-4 min-w-[280px] whitespace-nowrap hover:scale-105 transition duration-300">
              <img
                src="/images/telegram.png"
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
              <div>
                <h4 className="text-base sm:text-lg font-semibold">
                  Telegram Integration
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Chatbot which responds efficiently and correctly.
                </p>
              </div>
            </div>

            {/* Team Photos */}
            <div className="bg-gray-900 p-4 sm:p-5 rounded-xl shadow-md flex items-center gap-3 sm:gap-4 min-w-[260px] hover:scale-105 transition duration-300">
              <img
                src="/images/drive-icon.png"
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
              <div>
                <h4 className="text-base sm:text-lg font-semibold">
                  Team Photos
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Company retreat 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Bot Image at Bottom Right */}
        <div className="absolute bottom-0 right-10 md:right-[15%] w-24 md:w-56 flex justify-end">
          <img src="/images/Board.png" alt="AI Bot" className="w-full" />
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 gap-32 flex items-center justify-center relative">
        <div className="absolute right-0  opacity-90 -z-0 ">
          <BlurredCircle />
        </div>
        <div className="max-w-screen-xl items-center justify-between z-10 flex flex-col lg:flex-row w-full gap-12  px-7 sm:px-8 md:px-12 lg:px-20 ">
          <div className=" max-w-4xl  flex flex-col items-center justify-center text-center md:text-left w-full ">
            <h3 className="text-2xl sm:text-2xl text-center md:text-6xl w-full font-semibold  ">
              <span className="bg-gradient-to-r  from-blue-300 via-purple-200 to-pink-200 text-transparent bg-clip-text">
                A co-worker who's always on the clock.
              </span>
            </h3>
            <p className="text-gray-300 max-w-xl text-center mt-6 text-sm sm:text-base  font-light">
              Available 24/7. The only employees who love overtime. Always ready
              to save your most valuable asset your time.
            </p>

            <p className="text-gray-300 max-w-xl text-center  text-sm sm:text-base font-light  mt-8">
              Speaks in 100+ languages. Go global, select, communicate, and
              complete your work in over 100 languages.
            </p>
            <p className="text-gray-300 max-w-xl  text-sm sm:text-base font-light mt-8">
              {"    "}
            </p>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-[35%] flex justify-center overflow-hiden">
            <div className="relative ">
              <div className="relative w-[300px] lg:w-[610px]   mx-auto xl:translate-x-[10%] h-auto flex items-center justify-center z-[10]">
                <Image
                  src="/images/1.png"
                  className=" z-[10]"
                  alt="AI Bot"
                  width={1200}
                  height={1200}
                />
              </div>
              <div className="absolute opacity-40 md:opacity-65 -translate-x-[200px] lg:-translate-x-0 -translate-y-[80px]  scale-90 ">
                <BlurredEllipse />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Integration Grid */}
      <section className=" text-white py-16 md:py-32 flex items-center justify-center w-full relative ">
        <div className="absolute left-0 opacity-90  -z-0">
          <BlurredCircleLeft />
        </div>
        <div className="max-w-screen-xl px-7 sm:px-8 md:px-12 lg:px-20 w-full z-10">
          <div className="text-center md:text-left items-center justify-center flex flex-col w-full mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-center  max-w-3xl ">
              Seamlessly Connect with Your Favorite Tools.
            </h3>
            <p className="text-gray-400 mt-4 md:mt-6 text-center text-sm sm:text-base max-w-2xl">
              Enhance your workflow by uniting AI-powered assistants with the
              tools you already use. Smart automation makes managing
              integrations smoother than ever.
            </p>
          </div>

          {/* Grid Layout for Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 bg-gradient-to-tr from-purple-400/30 via-blue-600/40 to-teal-300/20   p-[1px] md:grid-cols-4 gap-[1px]  w-full   mt-8 sm:mt-16  mx-auto">
            {[
              { name: "Whatsapp", logo: "images/whatsapp.png" },
              { name: "Instagram", logo: "images/instagram.png" },
              { name: "Shopify", logo: "images/shopify.png" },
              { name: "Wix", logo: "images/wix.png" },
              { name: "telegram", logo: "images/telegram.png" },
              { name: "wordpress", logo: "images/wordpress (1).png" },
              { name: "Facebook", logo: "images/communication.png" },
              { name: "Webflow", logo: "images/Webflow.svg" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="p-4 sm:p-6 bg-black flex items-center flex-col gap-3 justify-center "
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="size-6 sm:size-8 md:size-16 rounded-lg "
                />
                <span className=" tracking-wide">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Bubbles Section */}
      <section className="py-8 sm:py-12 md:py-16 gap-32 flex items-center justify-center relative">
        <div className="absolute right-0 opacity-90 -z-0 ">
          <BlurredCircle />
        </div>
        <div className="max-w-screen-xl items-center justify-between z-10 flex flex-col lg:flex-row w-full gap-12  px-7 sm:px-8 md:px-12 lg:px-20 ">
          {/* Right Content */}
          <div className="w-full md:w-[30%]  flex justify-center overflow-hiden">
            <div className="relative ">
              <div className="relative w-[300px] lg:w-[610px]   mx-auto xl:translate-x-[10%] h-auto flex items-center justify-center z-[10]">
                <Image
                  src="/images/1.png"
                  className=" z-[10]"
                  alt="AI Bot"
                  width={1200}
                  height={1200}
                />
              </div>
              <div className="absolute opacity-40 md:opacity-65 -translate-x-[200px] lg:-translate-x-0 -translate-y-[80px]  scale-90 ">
                <BlurredEllipse />
              </div>
            </div>
          </div>
          <div className=" max-w-5xl  lg:ml-24  flex items-center justify-center flex-col text-center md:text-left w-full ">
            <h3 className="text-2xl sm:text-2xl text-center md:text-6xl w-full font-semibold  ">
              <span className="bg-gradient-to-r  from-blue-300 via-purple-200 to-pink-200 text-transparent bg-clip-text">
                Work Gets Done - Even While You Rest.
              </span>
            </h3>
            <p className="text-gray-300 text-center max-w-xl mt-6 text-sm sm:text-base  font-light">
              Let AI handle the routine — automate tasks like creating social
              media posts, responding to comments, and more with powerful
              business automation tools.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="to-black w-full flex items-center justify-center text-white px-6 py-8 sm:py-12 md:py-32  relative">
        <div className="absolute right-0 opacity-90  -z-0">
          <BlurredCircle />
        </div>
        <div className="bg-gradient-to-b from-gray-900 to-black px-4 sm:px-8 md:px-12 lg:px-20 rounded-2xl py-10 max-w-screen-xl z-10">
          <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-500 via-blue-300/80 to-teal-300/70 text-transparent bg-clip-text">
              World Class
            </span>{" "}
            Companies
          </h3>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-2 sm:mt-10 max-w-4xl mx-auto">
            {[
              {
                name: "Emma Clarke",
                title: "Head of Support, Nexora Solutions",
                review:
                  "Sophia Customer Service Bot has revolutionized our support system! It handles queries instantly, resolves issues efficiently, and has improved our response time by 70%. Our customers love it!",
              },
              {
                name: "Daniel Foster",
                title: "Marketing Lead, Virex Media",
                review:
                  "The Sophia Social Media Bot on Telegram is a lifesaver! It handle all the queries of our customer and reply efficiently. Now, I could'nt imagine how we had handled customer queries before. ",
              },
              {
                name: "Samantha Rodriguez",
                title: "Founder, EcomEase",
                review:
                  "I was skeptical at first, but Sophia AI exceeded my expectations. The customer service bot provides round-the-clock support, reducing workload for my team while keeping our customers happy.",
              },
              {
                name: "Liam Harrison",
                title: "Community Manager, Digitech Group",
                review:
                  "Using Sophia Social Media Bot on Telegram has boosted our engagement significantly. It replies to messages, shares updates, and even interacts with users in real time. A must-have for any brand!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-black p-4 sm:p-6 rounded-lg shadow-lg "
              >
                <div className="flex flex-row gap-1 items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index}>⭐️</div>
                  ))}
                </div>
                <p className="text-gray-400 mt-2 text-xs sm:text-sm">
                  "{testimonial.review}"
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="mt-6 sm:mt-16 flex justify-center items-center gap-4 text-gray-400">
            <button className="px-2 sm:px-3 py-1 rounded-full bg-gray-800">
              {"<"}
            </button>
            <span className="text-xs sm:text-sm">1 / 7</span>
            <button className="px-2 sm:px-3 py-1 rounded-full bg-gray-800">
              {">"}
            </button>
          </div> */}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-7 sm:px-8 md:px-12 lg:px-20 bg-black text-white relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-10 z-10">
          {/* Left Section: Title & Description */}
          <div className="md:w-1/2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Questions & Answers.
            </h3>
            <p className="mt-2 text-gray-400 text-sm sm:text-base">
              Learn more about Agent Dispatch
            </p>
          </div>

          {/* Right Section: FAQ List */}
          <div className="md:w-1/2 space-y-3 sm:space-y-4 duration-200 ease-in-out transition-all">
            {FAQs.map((faq, index) => (
              <div key={index} className="bg-gray-900 rounded-lg">
                <button
                  className="w-full flex justify-between items-center p-4 text-left"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  {faqOpen === index ? (
                    <ChevronUp className="text-gray-400 w-5 h-5" />
                  ) : (
                    <ChevronDown className="text-gray-400 w-5 h-5" />
                  )}
                </button>
                {faqOpen === index && (
                  <p className="p-4 text-gray-300 text-sm sm:text-base">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
