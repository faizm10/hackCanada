import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploadZone } from "./file-upload-zone"
import type { CaseFile } from "@/types/case"

interface DisputeDetailsStepProps {
  description: string
  landlordInfo: {
    name: string
    email: string
    phone: string
  }
  files: CaseFile[]
  onDescriptionChange: (value: string) => void
  onLandlordInfoChange: (field: keyof DisputeDetailsStepProps["landlordInfo"], value: string) => void
  onFilesChange: (files: CaseFile[]) => void
}

export function DisputeDetailsStep({
  description,
  landlordInfo,
  files,
  onDescriptionChange,
  onLandlordInfoChange,
  onFilesChange,
}: DisputeDetailsStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispute Details</CardTitle>
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
              <Label htmlFor="landlordName">Name</Label>
              <Input
                id="landlordName"
                placeholder="Enter landlord's name"
                value={landlordInfo.name}
                onChange={(e) => onLandlordInfoChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordEmail">Email</Label>
              <Input
                id="landlordEmail"
                type="email"
                placeholder="Enter landlord's email"
                value={landlordInfo.email}
                onChange={(e) => onLandlordInfoChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordPhone">Phone</Label>
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Evidence Files</h3>
          <FileUploadZone files={files} onFilesChange={onFilesChange} />
        </div>
      </CardContent>
    </Card>
  )
}

