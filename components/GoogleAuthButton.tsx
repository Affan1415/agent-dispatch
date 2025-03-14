"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function GoogleAuthButton() {
    const supabase = createClient();
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL || "https://agent-dispatch.com/";
    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            },
        });
        if (error) console.error("Google sign-in error:", error.message);
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition mb-4"
        >
            <Image
                src="\images\icons8-google.svg" // ensure you have a google-icon.svg in your public folder
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
            />
            Sign in with Google
        </button>
    );
}
