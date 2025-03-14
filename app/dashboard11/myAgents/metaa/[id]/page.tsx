"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ConnectPage() {
  const { id } = useParams();

  if (!id)
    return <div className="text-center text-red-500">User ID is required</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Connect Your Accounts</h1>
      <div className="space-y-4">
        <Link href={`/meta/facebook`}>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Connect to Facebook
          </button>
        </Link>
        <Link href={`/dashboard/myAgents/metaa/instagram`}>
          <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
            Connect to Instagram
          </button>
        </Link>
      <Link href={`/meta/whatsapp`}>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Connect to WhatsApp
          </button>
        </Link>
      </div>
    </div>
  );
}
