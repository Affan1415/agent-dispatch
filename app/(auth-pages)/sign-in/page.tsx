import React from "react";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
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
    <div className="flex  items-center justify-center bg-black px-4 py-16">
      <div className="flex flex-col md:flex-row items-center min-h-[60vh]   justify-center w-full max-w-screen-xl overflow-hidden bg-gradient-to-t  from-teal-800/20 to-purple-900/10 border border-teal-100/10 bg-opacity-10 p-8 rounded-lg">
        {/* Left Section - Robot Illustration */}
        <div className="hidden md:flex flex-col items-center">
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
            <div className="absolute -translate-x-[200px] lg:-translate-x-0 -translate-y-[80px]  scale-90 ">
              <BlurredEllipse />
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Login to your account
          </h2>
          <p className="text-gray-400 text-sm mb-6 text-center">
            New User?{" "}
            <Link href="/sign-up" className="text-blue-400 hover:underline">
              Sign Up Here
            </Link>
          </p>
          <GoogleAuthButton />

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-3 text-gray-400 text-sm">
              or Login with Email
            </span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <form className="flex flex-col gap-4 mt-4 text-gray-200">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <div className="flex justify-between items-center text-gray-200">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-foreground underline !text-blue-400"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <SubmitButton
              className="bg-[#7B8CE5]"
              pendingText="Signing In..."
              formAction={signInAction}
            >
              Sign in
            </SubmitButton>
            <FormMessage message={searchParams} />
          </form>
        </div>
      </div>
    </div>
  );
}
