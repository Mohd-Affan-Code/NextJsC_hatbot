"use client";

import { useState } from "react";
import Message from "./Message";

export default function ChatInterFace() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // User ka message add karein
    const userMessage = { id: crypto.randomUUID(), role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Apne API route ko call karein
      const apiResponse = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await apiResponse.json();

      if (data.response) {
        // Bot ka response add karein
        const botMessage = {
          id: crypto.randomUUID(),
          role: "bot",
          text: data.response,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Error handling
        const errorMessage = {
          role: "bot",
          text: "Error: Could not get response from Gemini.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "bot",
        text: "An unexpected error occurred.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-3xl h-screen p-4 mx-auto rounded-xl mt-5 shadow flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-0.5">
        <div className="h-10 w-10">
          <img
            className="h-full w-full object-cover rounded-full"
            src="https://img.freepik.com/premium-vector/chat-logo-design_93835-108.jpg"
            alt="logo"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Mera Ai Assistant</h2>
          <p className="text-sm text-gray-700">
            online — model: gemini-2.0-flash
          </p>
        </div>

        <div className="ml-auto">Dark</div>
      </div>

      {/* Message Section (Scrollable) */}
      <div className="flex-1 overflow-y-auto mt-3 pr-2">
        <Message messages={messages} isLoading={isLoading} />
      </div>

      {/* Input Section */}
      <div className="flex items-center mt-4 gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isLoading && sendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Push
        </button>
      </div>
    </div>
  );
}
