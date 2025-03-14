import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "../components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Authnullnavbar from "@/components/Authnullnavbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AI Agents",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  // Fetch user data on the server side
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background bg-black text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-stretch w-full">
            <div className="flex-1 w-full flex flex-col gap-0">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                {user ? <Authnullnavbar /> : <HeaderAuth />}
              </nav>
              <script src="https://api.agent-dispatch.com/chat-widget.js?api_key=124b0e2778f2d6087e95d9002f144369&color=%232563eb&message=Hi%20there!%20How%20can%20I%20help%20you%3F&position=bottom-right"></script>
              <div>{children}</div>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
