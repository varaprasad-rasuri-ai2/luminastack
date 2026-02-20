"use client";

import { useState } from "react";

interface ChatMessage {
  id: string;
  prompt: string;
  response: string;
  createdAt: string;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setChatHistory([data, ...chatHistory]);
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex min-h-screen w-full max-w-3xl flex-col bg-white dark:bg-black border-l border-r border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-6">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            LuminaStack AI Studio
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Powered by Mistral AI
          </p>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Start a conversation
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                  Ask anything and Mistral AI will respond
                </p>
              </div>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div key={chat.id} className="space-y-3">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-xs bg-black text-white dark:bg-zinc-600 rounded-lg px-4 py-3 text-sm">
                    {chat.prompt}
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="max-w-xs bg-zinc-100 dark:bg-zinc-800 text-black dark:text-zinc-100 rounded-lg px-4 py-3 text-sm">
                    {chat.response}
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex justify-center">
                  <span className="text-xs text-zinc-400 dark:text-zinc-600">
                    {new Date(chat.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
          <div className="flex gap-3">
            <textarea
              rows={3}
              className="flex-1 resize-none rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-600"
              placeholder="Ask anything... (Shift+Enter for new line)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="rounded-lg bg-black dark:bg-zinc-600 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-900 dark:hover:bg-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-fit"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
