"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { createClient } from "@/utils/supabase/client";
import { UploadIcon } from "lucide-react";

interface TextToPDFProps {
  userId: string;
  onUploadSuccess: (filePath: string) => void;
}

export default function TextToPDF({ userId, onUploadSuccess }: TextToPDFProps) {
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const supabase = createClient();

  const generatePDF = () => {
    if (!text.trim()) {
      alert("Please enter some text to convert into a PDF.");
      return null;
    }

    const doc = new jsPDF();
    const marginLeft = 10;
    const marginTop = 10;
    const maxWidth = doc.internal.pageSize.width - marginLeft * 2; // available width
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;

    // Split the text into lines that fit the maxWidth.
    const lines = doc.splitTextToSize(text, maxWidth);
    let cursorY = marginTop;

    // Loop through lines and add pages if needed.
    lines.forEach((line: string) => {
      if (cursorY + lineHeight > pageHeight - marginTop) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += lineHeight;
    });

    return doc;
  };

  const handleUpload = async () => {
    if (!userId) {
      setUploadStatus("User ID is missing.");
      return;
    }

    const doc = generatePDF();
    if (!doc) return;

    setUploading(true);
    setUploadStatus("Generating PDF...");

    const pdfBlob = doc.output("blob");
    // The file name will be: "TextPDF_<timestamp>.pdf"
    const fileName = `TextPDF_${Date.now()}.pdf`;

    // Create a blob URL for downloading the PDF locally.
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setPdfFileName(fileName);

    // Upload the PDF to Supabase Storage.
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`PDFS/${userId}/${fileName}`, pdfBlob, {
        contentType: "application/pdf",
      });

    setUploading(false);

    if (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      return;
    }

    setUploadStatus("Uploaded successfully!");
    setText("");
    onUploadSuccess(`PDFS/${userId}/${fileName}`);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6  mt-4 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Convert Text to PDF & Upload</h2>
      <textarea
        className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
        rows={5}
        placeholder="Enter text to convert into a PDF..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full mt-4 bg-blue-600/40 hover:bg-blue-700 text-white font-semibold py-2 rounded transition flex items-center justify-center gap-2"
      >
        <UploadIcon className="w-5 h-5" />
        {uploading ? "Uploading..." : "Generate & Upload PDF"}
      </button>
      {uploadStatus && (
        <p className="mt-4 text-center text-sm text-gray-300">{uploadStatus}</p>
      )}
      {pdfUrl && pdfFileName && (
        <div className="mt-4 text-center">
          <a
            href={pdfUrl}
            download={pdfFileName}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
