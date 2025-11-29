"use client";
import { useState } from "react";

export default function Message({ messages, isLoading }) {
  return (
    <div className="flex-1 p-4 space-y-4 overflow-auto bg-linear-to-b from-white to-gray-50">
      {/* 1. Render all existing messages */}
      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex ${
            m.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
              m.role === "user"
                ? "bg-indigo-600 text-white rounded-br-none"
                : "bg-white border"
            }`}
          >
            <div className="text-sm whitespace-pre-line">{m.text}</div>
            <div className="text-[10px] text-gray-400 mt-1 text-right">
              {m.time}
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] p-3 rounded-2xl shadow-sm bg-white border">
            <div className="text-sm text-gray-500 italic">AI is typing...</div>
          </div>
        </div>
      )}
    </div>
  );
}
