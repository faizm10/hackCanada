import { GoogleGenerativeAI } from "@google/generative-ai";
import { experimental_generateImage, streamText } from "ai";
import { searchLegalDocuments } from "@/lib/firebase";
import { getSystemPrompt } from "./context";

// Initialize Gemini AI with error handling
const initializeGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  return new GoogleGenerativeAI(apiKey);
};

export async function POST(req: Request) {
  try {
    const { messages, province } = await req.json();

    // Validate required fields
    if (!province) {
      return new Response("Province is required", { status: 400 });
    }
    if (!messages || messages.length === 0) {
      return new Response("Messages are required", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];

    // Get relevant legal documents
    const relevantDocs = await searchLegalDocuments(
      lastMessage.content,
      province
    );

    // Prepare context from legal documents
    const legalContext = relevantDocs
      .map((doc) => `${doc.title}:\n${doc.content}`)
      .join("\n\n");

    // Get system prompt
    const systemPrompt = getSystemPrompt(province);

    // Prepare the complete prompt
    const prompt = `${systemPrompt}

Legal Context:
${legalContext}

User's Question: ${lastMessage.content}`;

    // Initialize Gemini with error handling
    const genAI = initializeGemini();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate response with safety settings
    const response = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    // Convert response to stream
    const stream = GoogleGenerativeAIStream(response);

    // Return streaming response
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Chat API Error:", error);

    // Return appropriate error messages
    if (error instanceof Error) {
      if (error.message.includes("GEMINI_API_KEY")) {
        return new Response("API configuration error", { status: 500 });
      }
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
    return new Response("An unexpected error occurred", { status: 500 });
  }
}
