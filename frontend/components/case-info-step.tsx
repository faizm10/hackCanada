import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import type { CaseType } from "@/types/case"

interface CaseInfoStepProps {
  type: CaseType | undefined
  title: string
  onTypeChange: (type: CaseType) => void
  onTitleChange: (title: string) => void
}

export function CaseInfoStep({ type, title, onTypeChange, onTitleChange }: CaseInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Case Type</Label>
        <RadioGroup
          value={type}
          onValueChange={(value) => onTypeChange(value as CaseType)}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { value: "RENT_INCREASE", label: "Rent Increase" },
            { value: "EVICTION", label: "Eviction" },
            { value: "DEPOSIT", label: "Deposit" },
            { value: "MAINTENANCE", label: "Maintenance" },
            { value: "OTHER", label: "Other" },
          ].map((option) => (
            <Card key={option.value} className={`cursor-pointer ${type === option.value ? "border-primary" : ""}`}>
              <CardContent className="flex items-center space-x-2 p-4">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Case Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter a title for your case"
        />
      </div>
    </div>
  )
}

