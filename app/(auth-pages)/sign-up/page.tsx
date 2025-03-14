"use client"; // This makes it a Client Component

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react"; // Import useState
import GoogleAuthButton from "@/components/GoogleAuthButton";

function SignupForm() {
  const searchParams = useSearchParams();
  const message: Message | null = searchParams
    ? JSON.parse(searchParams.get("message") || "null")
    : null;

  const [formMessage, setFormMessage] = useState<Message | null>(null); // State to handle form messages

  const handleSignUp = async (formData: FormData) => {
    const result = await signUpAction(formData); // Call the signup action
    setFormMessage(result); // Set the message from the server action
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
    <div className="flex items-center justify-center bg-black px-4 py-16">
      <div className="flex w-full max-w-screen-xl min-h-[60vh] flex-col md:flex-row rounded-lg overflow-hidden bg-gradient-to-t from-teal-800/20 to-purple-900/10 border border-teal-100/10 bg-opacity-10 items-center justify-center gap-10 p-6">
        {/* Left Section - Robot Illustration */}
        <div className="hidden md:flex flex-col items-center">
          <div className="relative -translate-x-10">
            <div className="relative w-[300px] lg:w-[610px] mx-auto xl:translate-x-[10%] h-auto flex items-center justify-center z-[10]">
              <Image
                src="/images/1.png"
                className="z-[10]"
                alt="AI Bot"
                width={1200}
                height={1200}
              />
            </div>
            <div className="absolute -translate-x-[200px] lg:-translate-x-0 -translate-y-[80px] scale-90">
              <BlurredEllipse />
            </div>
          </div>
        </div>

        {/* Right Section - Sign Up Form or Message */}
        <div className="w-full md:w-1/2 max-w-md p-6 bg-opacity-10">
          {formMessage ? ( // Show form message if it exists
            <div className="flex items-center justify-center min-h-[300px]">
              <FormMessage message={formMessage} />
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                Create an account
              </h2>
              <p className="text-gray-400 text-sm text-center mb-6">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-400 hover:underline">
                  Login
                </Link>
              </p>
              <GoogleAuthButton />

              {/* Divider */}

              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="mx-3 text-gray-400 text-sm">
                  or Sign up with Email
                </span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>

              <form
                className="flex flex-col gap-4 text-gray-200"
                action={handleSignUp}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-800 focus:outline-none"
                />
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  placeholder="Agent"
                  required
                  className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-800 focus:outline-none"
                />
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  minLength={6}
                  required
                  className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-800 focus:outline-none"
                />
                <SubmitButton
                  pendingText="Signing up..."
                  className="w-full p-3 bg-[#7B8CE5] text-white rounded-md border border-gray-800 focus:outline-none"
                >
                  Sign Up
                </SubmitButton>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
