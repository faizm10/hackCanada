import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  input: string;
  handleInputChange: (value: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="flex items-center gap-2 border-t p-4">
      <Textarea
        rows={1}
        value={input}
        onChange={(e) => handleInputChange(e.target?.value || "")} // Prevents undefined errors
        placeholder="Type your legal question here..."
        className="resize-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <Button
        onClick={handleSubmit}
        disabled={isLoading || !input.trim()}
        className="bg-black text-white hover:bg-black/90"
      >
        <SendIcon className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
}
