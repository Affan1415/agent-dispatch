"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TelegramIntegration from "@/components/TelegramIntegration";
import CustomBotIntegration from "@/components/CustomBotIntegration";
import BlurredCircle from "@/components/BlurredCircle";
import { createClient } from "@/utils/supabase/client";

const Integrations: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  // Authentication check: redirect to sign-in if no user is authenticated
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

  // Extract parameters and ensure they are strings
  const userIdParam = params?.userId;
  const botidParam = params?.botid;
  const userId = Array.isArray(userIdParam)
    ? userIdParam[0]
    : userIdParam || "";
  const botid = Array.isArray(botidParam) ? botidParam[0] : botidParam || "";

  return (
    <div className="h-full bg-black w-full flex items-center justify-center text-white">
      <div className="max-w-screen-xl w-full flex items-center justify-center">
        {botid === "2" ? (
          <TelegramIntegration userId={userId} />
        ) : botid === "1" ? (
          <CustomBotIntegration userId={userId} />
        ) : (
          <p className="mt-6 text-center text-gray-400">
            No integration available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Integrations;
