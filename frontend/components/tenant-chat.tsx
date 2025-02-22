"use client";

import * as React from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function TenantChat() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI legal assistant. I can help answer questions about tenant rights in Canada. Please select your province and ask your question.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !province) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate AI response - Replace with actual AI integration
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Based on ${province}'s tenant laws, here's what you should know about your question: "${userMessage}"...`,
          },
        ]);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I encountered an error processing your request. Please try again.",
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-max mx-auto h-[720px] flex flex-col align-middle justify-center">
      <CardHeader className="space-y-2">
        <CardTitle className="">Tenant Rights AI Assistant</CardTitle>
        <Select value={province} onValueChange={setProvince}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ontario">Ontario</SelectItem>
            {/* <SelectItem value="British Columbia">British Columbia</SelectItem>
            <SelectItem value="Quebec">Quebec</SelectItem>
            <SelectItem value="Alberta">Alberta</SelectItem>
            <SelectItem value="Manitoba">Manitoba</SelectItem>
            <SelectItem value="Saskatchewan">Saskatchewan</SelectItem>
            <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
            <SelectItem value="New Brunswick">New Brunswick</SelectItem>
            <SelectItem value="Newfoundland">
              Newfoundland and Labrador
            </SelectItem>
            <SelectItem value="PEI">Prince Edward Island</SelectItem> */}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            placeholder="Type your legal question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || !province}
          />
          <Button
            type="submit"
            disabled={isLoading || !province || !input.trim()}
            className="bg-blue-600"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
