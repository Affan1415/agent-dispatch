"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { UploadIcon } from "lucide-react";

interface PDFUploadComponentProps {
  userId: string;
  onUploadSuccess: (filePath: string) => void;
}

export default function PDFUploadComponent({ userId, onUploadSuccess }: PDFUploadComponentProps) {
  const supabase = createClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle file upload to Supabase Storage
  const handleUpload = async () => {
    if (!selectedFile || !userId) {
      setUploadStatus("No file selected or user ID missing.");
      return;
    }
    setUploading(true);
    setUploadStatus("Uploading...");

    const getRandomDigits = () => Math.floor(1000 + Math.random() * 9000);
    const fileExtension = selectedFile.name.split(".").pop();
    const fileNameWithoutExt = selectedFile.name.replace(`.${fileExtension}`, "");
    const newFileName = `${fileNameWithoutExt}_${getRandomDigits()}.${fileExtension}`;

    const filePath = `PDFS/${userId}/${newFileName}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, selectedFile, { cacheControl: "3600", upsert: false });

    setUploading(false);
    if (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      return;
    }
    setUploadStatus("Uploaded successfully!");
    setSelectedFile(null);
    onUploadSuccess(filePath); // Notify parent about successful upload
  };

  return (
    <div className="w-full max-w-md mt-8 border border-teal-500/20 bg-black shadow-blue-800/10 backdrop-blur-2xl p-8 text-white rounded-xl shadow-2xl">
      <div className="mb-6">
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-[#365b862e] hover:bg-blue-800/40 text-white px-4 py-2 rounded-lg shadow-md transition flex items-center justify-center"
        >
          Choose File
        </label>
        {selectedFile && (
          <>
            <p className="text-[#96a2e0] text-md w-full text-center mt-4">
              {selectedFile.name}
            </p>
            <p className="text-white gap-2 font-light flex flex-row text-md w-full text-center mt-4">
              <UploadIcon className="w-5 h-5 text-white" /> Please click on
              upload to upload the document
            </p>
          </>
        )}
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full py-3 bg-[#24426b83] hover:bg-blue-800/40 rounded-lg transition duration-200"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
      {uploadStatus && (
        <p className="mt-4 text-center text-sm text-gray-300">
          Your Document is {uploadStatus}
        </p>
      )}
    </div>
  );
}
