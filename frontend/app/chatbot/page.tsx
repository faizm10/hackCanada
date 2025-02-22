"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the API Key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load Theme & Chat History from LocalStorage
  useEffect(() => {
    const savedChats = localStorage.getItem("saved-chats");
    if (savedChats) setMessages(JSON.parse(savedChats));

    const theme = localStorage.getItem("theme") === "light";
    setDarkMode(theme);
    document.body.classList.toggle("light_mode", theme);
  }, []);

  // Auto-scroll to Latest Message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("saved-chats", JSON.stringify(messages));
  }, [messages]);

  // Handle AI Response
  const fetchBotResponse = async (userMessage: string) => {
    
    setLoading(true);
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
          safetySettings: [
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
          },
        }),
      });
  
      const data = await response.json();
      console.log("Full API Response:", data);

      if (!response.ok || !data.candidates) {
        throw new Error(data.error?.message || "Invalid API response");
      }
  
      // Extract AI Response
      const botMessage = data.candidates[0]?.content?.parts[0]?.text || "🤖 Sorry, I couldn't process that request.";
      setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [...prev, { text: "❌ API Error. Try again later.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };
  

  // Handle User Message
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInputValue("");
    fetchBotResponse(userMessage);
  };

  // Handle Theme Toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light_mode");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  };

  // Handle Clear Chat
  const clearChat = () => {
    if (confirm("Are you sure you want to delete all chats?")) {
      setMessages([]);
      localStorage.removeItem("saved-chats");
    }
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Gemini Chatbot</h1>
        <div className="flex gap-3">
          <Button onClick={toggleTheme}>{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</Button>
          <Button onClick={clearChat} variant="destructive">
            🗑 Clear Chat
          </Button>
        </div>
      </header>

      {/* Chat Display */}
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg shadow-sm ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="px-4 py-2 rounded-lg bg-gray-300 text-black shadow-sm">
              ⏳ Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input & Send Button */}
      <div className="mt-4 flex gap-3">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 text-lg"
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={loading} className="bg-black text-white hover:bg-black/90">
          {loading ? "Thinking..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;
