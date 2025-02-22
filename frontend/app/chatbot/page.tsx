"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Input } from "@heroui/input";
import { ProvinceSelect } from "@/components/province-select";

interface Message {
  text: string;
  sender: "bot" | "user";
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "👋 Hello! Please select your province and ask me any tenant-related legal questions.", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [province, setProvince] = useState(""); // Province selection
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (): Promise<void> => {
    if (!inputValue.trim() || !province) {
      alert("Please select a province and enter a question.");
      return;
    }
  
    const newUserMessage: Message = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue("");
    setLoading(true);
  
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "testUser123", // Add a valid userId
          message: inputValue,
          province,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      setMessages((prevMessages) => [...prevMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Failed to fetch:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "❌ Error connecting to the AI service. Please try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-semibold">Legal Assistant</h1>
        <ProvinceSelect
          value={province}
          onChange={(value) => setProvince(value)}
        />
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {msg.sender === "bot" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-center p-3 rounded-full gap-5">
            <Input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              type="text"
              placeholder="Ask me about your tenant rights..."
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              className="flex-1 p-2 text-lg"
            />
          </div>
          <p className="text-xs text-center font-bold mt-4">
            ⚠️ The chatbot may provide general guidance but is not a substitute for legal advice. Always confirm with a professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
