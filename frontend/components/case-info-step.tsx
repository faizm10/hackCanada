import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CaseType } from "@/types/case"

interface CaseInfoStepProps {
  type: CaseType | undefined
  title: string
  onTypeChange: (value: CaseType) => void
  onTitleChange: (value: string) => void
}

const caseTypes = [
  { value: "EVICTION", label: "Eviction Notice" },
  { value: "RENT_INCREASE", label: "Rent Increase Dispute" },
  { value: "MAINTENANCE", label: "Maintenance Issues" },
  { value: "DEPOSIT", label: "Security Deposit Dispute" },
  { value: "LEASE_TERMINATION", label: "Lease Termination" },
  { value: "OTHER", label: "Other Issues" },
]

export function CaseInfoStep({ type, title, onTypeChange, onTitleChange }: CaseInfoStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Case Type</label>
          <Select value={type} onValueChange={onTypeChange as (value: string) => void}>
            <SelectTrigger>
              <SelectValue placeholder="Select the type of dispute" />
            </SelectTrigger>
            <SelectContent>
              {caseTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Case Title</label>
          <Input
            placeholder="Enter a title for your case"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Current Status</h3>
          <p className="text-sm text-muted-foreground">Draft - Complete all required information to submit your case</p>
        </div>
      </CardContent>
    </Card>
  )
}

