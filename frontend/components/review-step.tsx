import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CaseDetails } from "@/types/case"

interface ReviewStepProps {
  case: Partial<CaseDetails>
}

const caseTypeLabels: Record<string, string> = {
  EVICTION: "Eviction Notice",
  RENT_INCREASE: "Rent Increase Dispute",
  MAINTENANCE: "Maintenance Issues",
  DEPOSIT: "Security Deposit Dispute",
  LEASE_TERMINATION: "Lease Termination",
  OTHER: "Other Issues",
}

export function ReviewStep({ case: caseDetails }: ReviewStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Case Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Case Type</h3>
          <p className="text-sm text-muted-foreground">
            {caseDetails.type ? caseTypeLabels[caseDetails.type] : "Not selected"}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Case Description</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {caseDetails.description || "No description provided"}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Landlord Information</h3>
          <div className="text-sm text-muted-foreground">
            <p>Name: {caseDetails.landlordInfo?.name || "Not provided"}</p>
            <p>Email: {caseDetails.landlordInfo?.email || "Not provided"}</p>
            <p>Phone: {caseDetails.landlordInfo?.phone || "Not provided"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Uploaded Evidence</h3>
          {caseDetails.files && caseDetails.files.length > 0 ? (
            <ul className="text-sm text-muted-foreground space-y-1">
              {caseDetails.files.map((file) => (
                <li key={file.id}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No files uploaded</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

