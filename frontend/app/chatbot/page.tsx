"use client"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ChatInput } from "@/components/chat-input"
import { ChatMessage } from "@/components/chat-message"
import { ProvinceSelect } from "@/components/province-select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ChatbotPage() {
  const [province, setProvince] = useState("")
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      province,
    },
    onError: (error) => {
      console.error("Chat Error:", error)
      setError("Sorry, there was an error processing your request. Please try again.")
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!province) {
      setError("Please select a province before asking a question.")
      return
    }
    setError(null)
    handleSubmit(input)
  }

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Legal Assistant</h1>
        <ProvinceSelect
          value={province}
          onChange={(value) => {
            setProvince(value)
            setError(null)
          }}
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="flex h-[600px] flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground p-4">
              👋 Hello! I'm your AI legal assistant. Please select your province and ask me any questions about tenant
              rights in Canada.
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSend}
          isLoading={isLoading}
        />
      </Card>
    </div>
  )
}

