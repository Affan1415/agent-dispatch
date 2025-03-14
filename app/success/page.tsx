import React from "react";
import ThankYou from "@/components/ThankYou";
import Link from "next/link";
import BlurredCircle from "@/components/BlurredCircle";
import { ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center text-white relative">
      <div className="absolute left-0 opacity-90">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-90 scale-x-[-1]">
        <BlurredCircle />
      </div>
      <ThankYou />
    </div>
  );
};

export default Page;
