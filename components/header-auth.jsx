"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();
  const baseurl = process.env.NEXT_BASE_URL || "";
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    redirect(baseurl);
  };

  return (
    <header className="w-screen h-[80px] fixed z-[200] flex items-center justify-center bg-black">
      <div className="w-full max-w-screen-xl mx-autopx-2 px-2 md:px-6 py-6  lg;:px-0 flex justify-between items-center text-white">
        {/* Logo */}
        <Link href="/">
          <img
            src="/images/LOGO1.png"
            alt="Agent Dispatch Logo"
            className="w-32 h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          <Link href="/#features" className="hover:text-gray-400">
            Features
          </Link>
          <Link href="/#agents" className="hover:text-gray-400">
            Agents
          </Link>
          <Link href="/pricing" className="hover:text-gray-400">
            Pricing
          </Link>
          <Link href="/contact-us" className="hover:text-gray-400">
            Contact Us
          </Link>
          <Link href="/sign-in" className="hover:text-gray-400">
            Log In
          </Link>

          {user ? (
            <Button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600"
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/pricing">
              <Button className="bg-[#7B8CE5] px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:bg-indigo-600 hover:scale-105">
                Get Started
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden block text-white text-2xl focus:outline-none pr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <MenuIcon className="w-5 h-5 text-white" />
          ) : (
            <XIcon className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed top-16 left-0 w-full h-screen bg-black bg-opacity-80 backdrop-blur-md text-white flex flex-col items-center py-5 space-y-5 lg:hidden z-50">
          {/* Close Button */}

          <Link href="/features" className="text-lg hover:text-gray-400">
            Features
          </Link>
          <Link href="/agents" className="text-lg hover:text-gray-400">
            Agents
          </Link>
          <Link href="/pricing" className="text-lg hover:text-gray-400">
            Pricing
          </Link>
          <Link href="/contact-us" className="text-lg hover:text-gray-400">
            Contact Us
          </Link>
          <Link href="/sign-in" className="hover:text-gray-400">
            Login
          </Link>
          {user ? (
            <Button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 w-11/12"
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/pricing">
              <Button className="bg-indigo-500 px-6 py-3 w-11/12 text-center rounded-full hover:bg-indigo-600 transition">
                GET STARTED
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
