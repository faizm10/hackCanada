import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CaseDetailsStepProps {
  description: string
  landlordInfo: {
    name: string
    email: string
    phone: string
  }
  onDescriptionChange: (value: string) => void
  onLandlordInfoChange: (field: keyof CaseDetailsStepProps["landlordInfo"], value: string) => void
}

export function CaseDetailsStep({
  description,
  landlordInfo,
  onDescriptionChange,
  onLandlordInfoChange,
}: CaseDetailsStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="description">Describe your dispute</Label>
          <Textarea
            id="description"
            placeholder="Please provide details about your case..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Landlord Information</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="landlordName">Landlord Name</Label>
              <Input
                id="landlordName"
                placeholder="Enter landlord's name"
                value={landlordInfo.name}
                onChange={(e) => onLandlordInfoChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordEmail">Landlord Email</Label>
              <Input
                id="landlordEmail"
                type="email"
                placeholder="Enter landlord's email"
                value={landlordInfo.email}
                onChange={(e) => onLandlordInfoChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordPhone">Landlord Phone</Label>
              <Input
                id="landlordPhone"
                type="tel"
                placeholder="Enter landlord's phone number"
                value={landlordInfo.phone}
                onChange={(e) => onLandlordInfoChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

