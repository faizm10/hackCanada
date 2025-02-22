export type CaseType = 
  | "EVICTION"
  | "RENT_INCREASE"
  | "MAINTENANCE"
  | "DEPOSIT"
  | "LEASE_TERMINATION"
  | "OTHER"

export interface CaseFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  progress?: number
}

export interface CaseDetails {
  id?: string
  userId: string
  type: CaseType
  description: string
  landlordInfo: {
    name: string
    email: string
    phone: string
  }
  files: CaseFile[]
  status: "DRAFT" | "PENDING" | "IN_PROGRESS" | "RESOLVED"
  createdAt: Date
  updatedAt: Date
}
