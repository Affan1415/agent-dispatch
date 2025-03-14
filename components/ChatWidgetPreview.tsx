export default function ChatWidgetPreview({
    widgetColor,
    widgetPosition,
    widgetMessage,
}: {
    widgetColor: string;
    widgetPosition: string;
    widgetMessage: string;
}) {
    const positionStyles: Record<string, string> = {
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
    };

    return (
        <div
            className={`absolute ${positionStyles[widgetPosition]} p-4 rounded-lg shadow-lg bg-white max-w-xs w-full`}
            style={{
                backgroundColor: widgetColor,
                color: "#fff",
                cursor: "pointer",
            }}
        >
            {/* Chat Widget Header */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Chat with Us</span>
                <button className="text-xs text-gray-400">X</button>
            </div>

            {/* Chat Messages */}
            <div className="mb-2">
                <div className="flex justify-start">
                    <div className="bg-gray-200 p-2 rounded-md max-w-xs">
                        <p className="text-sm text-gray-800">{widgetMessage}</p>
                    </div>
                </div>
                {/* Placeholder for additional chat messages */}
            </div>

            {/* Input Area */}
            <div className="flex">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <button className="ml-2 bg-blue-500 text-white p-2 rounded-full">
                    Send
                </button>
            </div>
        </div>
    );
}
