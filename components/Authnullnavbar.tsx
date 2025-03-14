"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function AuthNavbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();
  const baseurl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://agent-dispatch.com/";

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push(baseurl); // `redirect(baseurl)` is removed because `router.push()` is enough.
  };

  return (
    <header className="w-screen h-[80px] overflow-hidden flex items-center justify-center border-b border-b-gray-800 z-[100]">
      <div className="w-full max-w-screen-xl mx-auto py-6 px-4 md:px-0 flex justify-between items-center text-white">
        {/* Logo */}
        <Link href="/">
          <img
            src="/images/LOGO1.png"
            alt="Agent Dispatch Logo"
            className="w-32 h-auto brightness-[1.9]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center space-x-10">
          <Link
            href="/dashboard"
            className="text-white hidden lg:block hover:underline underline-offset-2"
          >
            Dashboard
          </Link>

          {user ? (
            <Button
              onClick={handleSignOut}
              className="text-white hover:underline bg-[#7B8CE5]  hover:bg-indigo-600   underline-offset-2"
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-[#7B8CE5] px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:bg-indigo-600 hover:scale-105">
                Log In
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
