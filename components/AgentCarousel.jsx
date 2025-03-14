import { useState } from "react";

const AgentCarousel = () => {
  const [index, setIndex] = useState(0);

  const agents = [
    {
      name: "Sophia - Website Agent",
      role: "AI Customer Service Chatbot Agent",
      description:
        "Effortlessly integrate smart, dynamic chatagent into any website with just a simple script. Boost engagement, automate support, and enhanceinteractions, all in minutes!",
      image: "images/Sophia.png",

      glowColor: "#68E4FF",
    },
    {
      name: "Sophia - Social Agent",
      role: "Social Media Messaging Chatbot Agent",
      description:
        "Easily integrate smart, engaging chatbots into your social media with just a simple script. Boost engagement, automate responses, and interact 24/7—all in minutes!",
      image: "images/Phone.png",
      glowColor: "#DC75F5",
    },
    {
      name: "Neon. eCommerce Expert.",
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
  const nextSlide = () => setIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section className="relative py-16  w-full">
      <h3 className="text-center text-3xl font-semibold text-white">
        Our Agents
      </h3>
      <div className="relative flex items-center justify-center mt-8 md:mt-32">
        {/* Left Arrow */}
        {/* <button
          onClick={prevSlide}
          className="absolute left-4 text-white text-3xl z-10"
        >
          ❮
        </button> */}

        {/* Carousel Container */}
        <div className="relative flex o w-full flex-col  items-center justify-center">
          <div
            className="flex flex-col lg:flex-row gap-6 transition-transform duration-500"
            style={{ transform: `translateX(-${index * 220}px)` }} // Adjust slide movement
          >
            {agents.map((agent, i) => (
              <div
                key={agent.name}
                className={`relative w-[350px] lg:w-[320px] p-6 rounded-xl shadow-lg ${i === 0 ? "lg:-translate-x-8" : ""} ${i === 1 ? "lg:scale-[1.2] lg:z-10 lg:shadow-3xl lg:shadow-teal-700/20 lg:w-[350px]" : "w-[320]"} ${i === 2 ? "lg:translate-x-8" : ""}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-t rounded-xl from-teal-800/20 to-purple-900/10 border border-teal-100/10 `}
                ></div>
                <div className="relative  z-10">
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
                  <p className="text-white font-medium mt-2">{agent.role}</p>
                  <p className="text-gray-400 text-md  mt-2">
                    {agent.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {/* <button
          onClick={nextSlide}
          className="absolute right-4 text-white text-3xl z-10"
        >
          ❯
        </button> */}
      </div>
    </section>
  );
};

export default AgentCarousel;
