
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers"; // For reading cookies on the server side

export default async function MyAgents() {
  // Use cookies API to read cookies on the server side
  const cookieStore = cookies();
  const supabase = await createClient();

  // Get the session from cookies
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }
console.log(user)

  // Fetch agents data for the logged-in user
  const { data: agents, error } = await supabase
    .from("chatbots")
    .select("id, name, description")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching agents:", error);
    return <p className="text-red-500">Failed to load chatbots.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-start p-6">
      <div className="shadow-lg rounded-xl p-8 w-full max-w-lg bg-white">
        <h1 className="text-3xl font-semibold text-gray-800">My Chatbots</h1>
        <p className="text-gray-600 mt-2">Here are your registered chatbots:</p>

        <div className="mt-6">
          {agents.length ? (
            <ul className="space-y-4">
              {agents.map((agent) => (
                <li
                  key={agent.id}
                  className="p-4 bg-gray-100 rounded-lg shadow"
                >
                  <p className="text-lg font-medium text-gray-900">
                    {agent.name}
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {agent.description}
                  </p>
                  <Link
                    href={`/dashboard/myAgents/${agent.id}/edit`}
                    className="mt-2 inline-block text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No chatbots found.</p>
          )}
        </div>

        <div className="mt-6">
          <Link
            href={`/dashboard/myAgents/create/${user.id}`}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
          >
            Create New Chatbot
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href={`/dashboard/myAgents/meta`}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
          >
            Create facebook Chatbot
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href={`/dashboard/myAgents/telegram/${user.id}`}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
          >
            Create New Telegram Chatbot
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href={`/dashboard/myAgents/metaa/${user.id}`}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
          >
            Create New Meta Chatbot
          </Link>
        </div>
      </div>
    </div>
  );
}
