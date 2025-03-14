"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Plan {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface GlowEffectProps {
  color: string;
}

const GlowEffect: React.FC<GlowEffectProps> = ({ color }) => (
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

interface PricingCarouselProps {
  plans: Plan[];
}

const PricingCarousel: React.FC<PricingCarouselProps> = ({ plans }) => {
  return (
    <section className="flex flex-col justify-center items-center p-6 relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        autoplay={{ delay: 3000 }}
        className="w-[85%]"
      >
        {plans.map((plan, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gradient-to-t from-blue-800/10 to-purple-900/10 border border-teal-100/10 rounded-xl flex flex-col md:flex-row items-center justify-between w-full gap-8 p-6">
              <div className="relative">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-56 h-56 object-cover flex-shrink-0 rounded-lg"
                />
              </div>
              <div className="text-center md:text-left flex-1 px-6">
                <h2 className="text-3xl font-bold">{plan.name}</h2>
                <p className="text-lg mt-2 max-w-md mx-auto md:mx-0">
                  {plan.description}
                </p>
              </div>
              <p className="text-6xl font-bold text-center md:text-left mr-8 ">
                ${plan.price}
                <span className="text-lg">/month</span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev absolute !left-12 top-1/2 -translate-y-1/2  !text-white p-3 rounded-full shadow-lg flex items-center justify-center">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="swiper-button-next absolute !right-12 top-1/2 -translate-y-1/2  !text-white p-3 rounded-full shadow-lg flex items-center justify-center">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination flex justify-center mt-4 space-x-2"></div>
    </section>
  );
};

export default PricingCarousel;
