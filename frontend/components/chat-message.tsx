import type { Message } from "@/types/chat"
import { cn } from "@/lib/utils"

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-2 py-2",
        message.role === "assistant" ? "flex-row" : "flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2",
          message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground",
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}

