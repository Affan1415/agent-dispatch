"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ChatWidgetPreview from "@/components/ChatWidgetPreview";
import EmbeddedCodeGenerator from "@/components/EmbedCodeGenerator";
import CustomizationForm from "@/components/CustomizationForm";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";

const EditAgentPage = () => {
    const [widgetColor, setWidgetColor] = useState("#2563eb");
    const [widgetPosition, setWidgetPosition] = useState("bottom-right");
    const [widgetMessage, setWidgetMessage] = useState("Hi there! How can I help you?");
    const [agentName, setAgentName] = useState("");
    const [agentDescription, setAgentDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [apikey, setApikey] = useState("");
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchAgent = async () => {
            if (!params?.id) return;
            const { data, error } = await supabase.from("chatbots").select("*").eq("id", params.id).single();

            if (error) {
                console.error("Error fetching chatbot details:", error);
                return;
            }
            setApikey(data.api_key);
            setAgentName(data.name);
            setAgentDescription(data.description);
            setWidgetColor(data.color || "#2563eb");
            setWidgetPosition(data.position || "bottom-right");
            setWidgetMessage(data.message || "Hi there! How can I help you?");
            setUserId(data.user_id);
        };

        fetchAgent();
    }, [params?.id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("chatbots").update({
            name: agentName,
            description: agentDescription,
            color: widgetColor,
            position: widgetPosition,
            message: widgetMessage,

        }).eq("id", params.id);

        if (error) {
            console.error("Error updating agent:", error);
            setLoading(false);
            return;
        }

        router.push("/dashboard/myAgents");
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-white">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Chatbot</h1>
            <form onSubmit={handleUpdate} className="w-full max-w-lg space-y-4">
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

                <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                    <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
                    <p className="text-sm text-gray-500 mb-4">See how your chat widget will appear on your website.</p>
                    <div className="relative w-full h-64 border border-dashed border-gray-300 rounded-lg bg-gray-100">
                        <ChatWidgetPreview
                            widgetColor={widgetColor}
                            widgetPosition={widgetPosition}
                            widgetMessage={widgetMessage}
                        />
                    </div>
                </section>

                <section className="p-4 border rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold">Embed Code</h2>
                    <EmbeddedCodeGenerator
                        widgetColor={widgetColor}
                        widgetPosition={widgetPosition}
                        widgetMessage={widgetMessage}
                        apikey=""
                    />
                </section>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                    {loading ? "Updating..." : "Update Chatbot"}
                </button>
            </form>
        </div>
    );
};

export default EditAgentPage;
