"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Use this for accessing query params
import ChatWidgetPreview from "@/components/ChatWidgetPreview";
import EmbeddedCodeGenerator from "@/components/EmbedCodeGenerator";
import CustomizationForm from "@/components/CustomizationForm";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";

const CreateAgentPage = () => {
  const [widgetColor, setWidgetColor] = useState("#2563eb");
  const [widgetPosition, setWidgetPosition] = useState("bottom-right");
  const [widgetMessage, setWidgetMessage] = useState(
    "Hi there! How can I help you?"
  );
  const [agentName, setAgentName] = useState("");
  const [agentDescription, setAgentDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [documentRetrieved, setDocumentRetrieved] = useState(false);
  const [apikey, setapikey] = useState("");
  // Get search parameters (e.g., userid) using useSearchParams
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  //const userid = searchParams.get("userid");
  const userid = params.userid as string;
  // Ensure the component is client-side before accessing state
  useEffect(() => {
    if (userid) {
      setUserId(userid); // Set the userId from the query parameter
    }
    setIsClient(true);
  }, [userid]);

  useEffect(() => {
    const generateApiKey = async () => {
      try {
        const response = await fetch("/api/generateKey"); // Calls the Next.js API route
        if (!response.ok) {
          throw new Error("Failed to fetch API key");
        }
        const data = await response.json();
        console.log(data);
        setapikey(data.apiKey);
      } catch (error) {
        console.error("Error generating API key:", error);
      }
    };
    generateApiKey(); // Call the function inside useEffect
  }, []);

  console.log(userid);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      setUploadStatus("User ID is missing.");
      setLoading(false);
      return;
    }

    try {
      // Insert chatbot data into Supabase
      const { error } = await supabase.from("chatbots").insert([
        {
          name: agentName,
          description: agentDescription || null, // Allow null values
          color: widgetColor || null,
          position: widgetPosition || null,
          message: widgetMessage || null,
          user_id: userId,
          api_key: apikey,
        },
      ]);

      if (error) throw new Error(`Error creating agent: ${error.message}`);

      // Fetch the latest PDF document
      const response = await fetch(
        `http://localhost:4000/chat/fetch_latest_pdf/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch document.");
      }

      console.log("✅ Document retrieved successfully!");
      alert("Document retrieved successfully!");

      // Redirect after successful insertion & document retrieval
      window.location.href = `/chatbot/${userId}`;
    } catch (error) {
      console.error("❌ Error:", error);
      setUploadStatus((error as Error).message || "An unknown error occurred.");
      alert("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !userId) {
      setUploadStatus("No file selected or user ID missing.");
      return;
    }

    setUploading(true);
    setUploadStatus("Uploading...");

    const getRandomDigits = () => Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
    const fileExtension = selectedFile.name.split(".").pop(); // Get file extension
    const fileNameWithoutExt = selectedFile.name.replace(
      `.${fileExtension}`,
      ""
    ); // Remove extension

    const randomDigits = getRandomDigits();
    const newFileName = `${fileNameWithoutExt}_${randomDigits}.${fileExtension}`;

    const filePath = `PDFS/${userId}/${newFileName}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    setUploading(false);

    if (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      return;
    }

    setUploadStatus("Upload successful!");
    setSelectedFile(null);
    console.log("File uploaded successfully:", data);
  };

  if (!isClient) {
    return null; // Return null or a loading spinner until the component is mounted client-side
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Create a New Chatbot
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <div>
          <label className="block text-gray-700">Chatbot Name:</label>
          <Input
            type="text"
            required
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Chatbot Description:</label>
          <Input
            type="text"
            required
            value={agentDescription}
            onChange={(e) => setAgentDescription(e.target.value)}
          />
        </div>

        <CustomizationForm
          widgetColor={widgetColor}
          setWidgetColor={setWidgetColor}
          widgetPosition={widgetPosition}
          setWidgetPosition={setWidgetPosition}
          widgetMessage={widgetMessage}
          setWidgetMessage={setWidgetMessage}
        />

        {/* File Upload Section */}
        <div className="p-4 border rounded-lg bg-black">
          <h2 className="text-lg font-semibold">Upload PDF</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-2"
          />

          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>

          {uploadStatus && (
            <p
              className={`mt-2 text-sm ${uploadStatus.includes("failed") ? "text-red-600" : "text-green-600"}`}
            >
              {uploadStatus}
            </p>
          )}
        </div>

        {/* Chat Widget Preview */}
        <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <p className="text-sm text-gray-500 mb-4">
            See how your chat widget will appear on your website.
          </p>
          <div className="relative w-full h-64 border border-dashed border-gray-300 rounded-lg bg-gray-100">
            <ChatWidgetPreview
              widgetColor={widgetColor}
              widgetPosition={widgetPosition}
              widgetMessage={widgetMessage}
            />
          </div>
        </section>

        {/* Embed Code Section */}
        <section className="p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold">Embed Code</h2>
          <EmbeddedCodeGenerator
            widgetColor={widgetColor}
            widgetPosition={widgetPosition}
            widgetMessage={widgetMessage}
            apikey={apikey} // ✅ Add this line
          />
        </section>

        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Chatbot"}
        </button>
      </form>
    </div>
  );
};

export default CreateAgentPage;
