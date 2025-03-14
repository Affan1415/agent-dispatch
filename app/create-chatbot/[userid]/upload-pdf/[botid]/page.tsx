"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import BlurredCircle from "@/components/BlurredCircle";
import PDFUploadComponent from "@/components/PDFUploadComponent";
import TextToPDF from "@/components/TextToPDF";

export default function UploadPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.userid as string;
  const botid = params?.botid as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [uploadPath, setUploadPath] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"upload" | "text">(
    "upload"
  );

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

  // Handle document retrieval after upload
  const handleFetchDocument = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("API URL is not defined.");
      const response = await fetch(`${apiUrl}/fetch_latest_pdf/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch document.");
      alert("Document retrieved successfully!");
      router.push(`/chatbot/${userId}/${botid}`);
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-fit text-white flex flex-col  w-full items-center justify-center py-16 lg:py-32 relative">
      <div className="absolute left-0 opacity-80 -z-0">
        <BlurredCircle />
      </div>
      <div className="absolute right-0 opacity-80 -z-0 scale-x-[-1]">
        <BlurredCircle />
      </div>
      <h2 className="text-4xl lg:text-6xl w-full text-center font-semibold mb-8  leading-tight">
        <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-300 text-transparent bg-clip-text">
          Train Your Agent!
        </span>
      </h2>

      <div className="max-w-screen-xl md:min-w-[500px] flex items-center shadow-2xl shadow-teal-700/10 z-10 justify-center px-7 md:px-8 flex-col bg-gradient-to-t from-teal-800/20 to-purple-900/10 border border-teal-100/10 p-10 rounded-xl">
        <nav className="mb-4 text-sm text-white">
          <Link href="/upload">Upload PDF</Link> &gt;{" "}
          <Link href="#">Test Your Chatbot</Link> &gt;{" "}
          <Link href="#">Integrations</Link>
        </nav>
        <h1 className="text-4xl font-bold mb-4">Upload Your PDF</h1>

        {/* Two buttons to select the method */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setSelectedMethod("upload")}
            className={`py-2 px-4 rounded ${
              selectedMethod === "upload"
                ? "bg-blue-600/40"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Upload PDF
          </button>
          <button
            onClick={() => setSelectedMethod("text")}
            className={`py-2 px-4 rounded ${
              selectedMethod === "text"
                ? "bg-blue-600/40"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Convert Text to PDF
          </button>
        </div>

        {/* Conditionally render the component based on the selected method */}
        {selectedMethod === "upload" ? (
          <PDFUploadComponent userId={userId} onUploadSuccess={setUploadPath} />
        ) : (
          <TextToPDF userId={userId} onUploadSuccess={setUploadPath} />
        )}

        {/* Show "Test Your Chat Bot" only after successful upload */}
        {uploadPath && (
          <button
            onClick={handleFetchDocument}
            disabled={loading}
            className="mt-6 w-full bg-teal-900/60 hover:bg-teal-900/80 py-3 rounded-lg transition duration-200"
          >
            {loading ? "Processing..." : "Test Your Chat Bot"}
          </button>
        )}
      </div>
    </div>
  );
}
