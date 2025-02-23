export type CaseType = "EVICTION" | "RENT_INCREASE" | "MAINTENANCE" | "DEPOSIT" | "LEASE_TERMINATION" | "OTHER"

export type CaseStatus = "DRAFT" | "PENDING_REVIEW" | "AWAITING_LANDLORD" | "IN_PROGRESS" | "RESOLVED"

export interface CaseFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  path?: string
  progress?: number
}

export interface CaseDetails {
  id?: string
  userId: string
  type: CaseType
  title: string
  status: CaseStatus
  description: string
  landlordInfo: {
    name: string
    email: string
    phone: string
  }
  files: CaseFile[]
  createdAt: Date
  updatedAt: Date
}

