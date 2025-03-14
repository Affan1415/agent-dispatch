"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ThankYou = () => {
  const [isLoading, setIslLoading] = useState(true);
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Validating session...");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const userId = searchParams.get("userId");
    const referrer = document.referrer;

    if (!sessionId) {
      setStatus("Invalid session or unauthorized access.");
      return;
    }

    validateSession(sessionId, userId);
  }, [searchParams]);

  async function validateSession(sessionId: string, userId: string | null) {
    try {
      const res = await fetch(`/api/validate-session?session_id=${sessionId}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("Payment validation failed.");
        return;
      }

      setIsValid(true);
      setIslLoading(false);
      if (userId) updateUserPlan(userId);
    } catch (error) {
      setStatus("An error occurred during validation.");
    }
  }

  async function updateUserPlan(userId: string) {
    const { error } = await supabase
      .from("users")
      .update({ plan_sub: "PRO" })
      .eq("userID", userId);

    if (error) {
      setStatus("Failed to update plan.");
    } else {
      setStatus("Plan updated to PRO successfully!");
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center text-center">
        <h2 className="text-4xl lg:text-6xl font-semibold w-full leading-tight">
          <span className="bg-gradient-to-r from-blue-500 via-purple-200 to-pink-300 text-transparent bg-clip-text">
            Retrieving...!
          </span>
          <br /> 
          <span className="block">Payment Plan.</span>
        </h2>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="max-w-xl text-center items-center justify-center flex flex-col gap-6 z-20">
        <h2 className="text-4xl lg:text-6xl font-semibold w-full leading-tight text-red-500">
          Error!
        </h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          {status} Please contact support if this issue persists.
        </p>
        <Link
          href="/"
          className="bg-red-500 px-4 sm:px-6 py-2 sm:py-3 w-fit text-white font-semibold hover:bg-red-600 transition rounded-full flex flex-row items-center gap-2"
        >
          Go Home <ArrowRight className="w-5 h-5 text-white" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl text-center items-center justify-center flex flex-col gap-6 z-20">
      <h2 className="text-4xl lg:text-6xl font-semibold w-full leading-tight">
        <span className="bg-gradient-to-r from-blue-500 via-purple-200 to-pink-300 text-transparent bg-clip-text">
          Thank You!
        </span>
        <br /> Dear Customer
      </h2>
      <p className="text-gray-400 mt-2 text-sm sm:text-base">{status}</p>
      <Link
        href="/dashboard"
        className="bg-[#7B8CE5] px-4 sm:px-6 py-2 sm:py-3 w-fit text-white font-semibold hover:bg-blue-600 transition rounded-full flex flex-row items-center gap-2"
      >
        Go to Dashboard <ArrowRight className="w-5 h-5 text-white" />
      </Link>
    </div>
  );
};

export default ThankYou;
