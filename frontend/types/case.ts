export type CaseType = 'RENT_INCREASE' | 'EVICTION' | 'DEPOSIT' | 'MAINTENANCE' | 'OTHER';

export type CaseStatus = "DRAFT" | "PENDING_REVIEW" | "AWAITING_LANDLORD" | "IN_PROGRESS" | "RESOLVED"

export type CaseFile = {
  name: string;
  url: string;
};

export interface CaseDetails {
  id?: number;
  type: CaseType;
  title: string;
  description: string;
  landlord_name: string;
  landlord_email: string;
  landlord_phone: string;
  files: string[];
  created_at?: string;
  user_id?: string;
  status: string;
  progress: {
    text: string;
    percentage: number;
  };
}

export type Case = {
  id: number
  type: string
  description: string
  landlord_name: string
  landlord_email: string
  landlord_phon: string
  files: string
  created_at: string
  user_id: string
  status: string
  title: string
}




