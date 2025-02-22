export type Message = {
    id: string
    content: string
    role: "user" | "assistant"
    createdAt: Date
  }
  
  export type LegalDocument = {
    id: string
    title: string
    content: string
    province: string
    category: string
    lastUpdated: Date
  }
  
  