import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const supabase = await createClient();

  // Fetch user data on the server side
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to sign-in if the user is not authenticated
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      {/* Navbar */}

      <div className="w-full max-w-4xl flex flex-col items-center">
        <h2 className="text-xl font-medium">Your Agents</h2>
        <p className="text-gray-400 text-sm mb-6">
          Select an agent to view details.
        </p>

        <div className="grid grid-cols-2 gap-6">
          {/* Agent Card 1 */}
          <div className="bg-gray-900 rounded-xl p-6 text-center shadow-lg">
            <img
              src="images/1.png"
              alt="Nova"
              className="mx-auto w-24 h-24 mb-4"
            />
            <h3 className="text-lg font-bold">Nova</h3>
            <p className="text-gray-400 text-sm">AI Assistant</p>
            <p className="mt-2 text-sm">
              Current Capacity: <span className="font-bold">1</span>
            </p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
              Details
            </Button>
          </div>

          {/* Agent Card 2 */}
          <div className="bg-gray-900 rounded-xl p-6 text-center shadow-lg">
            <img
              src="images/2.png"
              alt="Lumi"
              className="mx-auto w-24 h-24 mb-4"
            />
            <h3 className="text-lg font-bold">Lumi</h3>
            <p className="text-gray-400 text-sm">Sales Strategist</p>
            <p className="mt-2 text-sm">
              Current Capacity: <span className="font-bold">2</span>
            </p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
              Details
            </Button>
          </div>
        </div>

        {/* Add New Agent */}
        <div className="mt-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
            <span className="text-3xl">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
