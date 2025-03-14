import { Link } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="h-[500px] w-full flex items-center justify-center">
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-4xl lg:text-6xl font-semibold w-full  leading-tight">
          <span className="bg-gradient-to-r from-blue-500 via-purple-200 to-pink-300 text-transparent bg-clip-text">
            Cancel
          </span>
          <br /> Dear Customer
        </h2>
        <p className="text-gray-400 mt-8 text-sm sm:text-base">We are sorry!</p>
        <Link
          href="/dashboard"
          className="mt-8 sm:mt-6 bg-[#7B8CE5] px-4 sm:px-6 py-2 sm:py-3  text-white font-semibold hover:bg-blue-600 transition rounded-full"
        >
          Go to Dahsboard
        </Link>
      </div>
    </div>
  );
};

export default Page;
