import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CaseType } from "@/types/case"

interface CaseTypeStepProps {
  value: CaseType
  onChange: (value: CaseType) => void
}

const caseTypes = [
  { value: "EVICTION", label: "Eviction Notice" },
  { value: "RENT_INCREASE", label: "Rent Increase Dispute" },
  { value: "MAINTENANCE", label: "Maintenance Issues" },
  { value: "DEPOSIT", label: "Security Deposit Dispute" },
  { value: "LEASE_TERMINATION", label: "Lease Termination" },
  { value: "OTHER", label: "Other Issues" },
]

export function CaseTypeStep({ value, onChange }: CaseTypeStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Case Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={value} onValueChange={onChange as (value: string) => void}>
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
      </CardContent>
    </Card>
  )
}

