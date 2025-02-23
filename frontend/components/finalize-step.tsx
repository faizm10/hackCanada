import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { CaseDetails, CaseType } from "@/types/case"
import { CheckCircle2 } from "lucide-react"

interface FinalizeStepProps {
  case: Partial<CaseDetails>
  uploadProgress: number
}

const caseTypeLabels: Record<CaseType, string> = {
  EVICTION: "Eviction Notice",
  RENT_INCREASE: "Rent Increase Dispute",
  MAINTENANCE: "Maintenance Issues",
  DEPOSIT: "Security Deposit Dispute",
  LEASE_TERMINATION: "Lease Termination",
  OTHER: "Other Issues",
}

export function FinalizeStep({ case: caseDetails, uploadProgress }: FinalizeStepProps) {
  // Helper function to safely get case type label
  const getCaseTypeLabel = (type: CaseType | undefined) => {
    if (!type || !(type in caseTypeLabels)) {
      return "Not selected"
    }
    return caseTypeLabels[type]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Case Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Type</p>
                <p className="font-medium">{getCaseTypeLabel(caseDetails.type)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Title</p>
                <p className="font-medium">{caseDetails.title || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Dispute Details</h3>
            <p className="text-sm whitespace-pre-wrap">{caseDetails.description || "No description provided"}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Landlord Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{caseDetails.landlordInfo?.name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{caseDetails.landlordInfo?.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{caseDetails.landlordInfo?.phone || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Evidence Files</h3>
            {caseDetails.files && caseDetails.files.length > 0 ? (
              <ul className="text-sm space-y-1">
                {caseDetails.files.map((file) => (
                  <li key={file.id} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {file.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No files uploaded</p>
            )}
          </div>
        </div>

        {uploadProgress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Uploading files...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <div className="rounded-lg border p-4 bg-muted/50">
          <h4 className="font-medium mb-2">Next Steps</h4>
          <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
            <li>Your case will be reviewed by our legal team</li>
            <li>The landlord will be notified and given a chance to respond</li>
            <li>You'll receive updates on your dashboard as the case progresses</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}

