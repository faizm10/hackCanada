import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface DisputeDetailsStepProps {
  description: string
  landlordInfo: {
    name: string
    email: string
    phone: string
  }
  files: string[]
  onDescriptionChange: (description: string) => void
  onLandlordInfoChange: (field: string, value: string) => void
  onFilesChange: (files: string[]) => void
}

export function DisputeDetailsStep({
  description,
  landlordInfo,
  files,
  onDescriptionChange,
  onLandlordInfoChange,
  onFilesChange,
}: DisputeDetailsStepProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      onFilesChange([...files, ...newFiles])
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe your dispute in detail"
          className="min-h-[150px]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Landlord Information</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="landlord_name">Name</Label>
            <Input
              id="landlord_name"
              value={landlordInfo.name}
              onChange={(e) => onLandlordInfoChange("name", e.target.value)}
              placeholder="Landlord's name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="landlord_email">Email</Label>
            <Input
              id="landlord_email"
              type="email"
              value={landlordInfo.email}
              onChange={(e) => onLandlordInfoChange("email", e.target.value)}
              placeholder="Landlord's email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="landlord_phone">Phone</Label>
            <Input
              id="landlord_phone"
              type="tel"
              value={landlordInfo.phone}
              onChange={(e) => onLandlordInfoChange("phone", e.target.value)}
              placeholder="Landlord's phone number"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Supporting Documents</Label>
        <div className="grid gap-4">
          <Button variant="outline" className="w-full" onClick={() => document.getElementById("file-upload")?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
          {files.length > 0 && (
            <div className="grid gap-2">
              {files.map((file, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {file.split("/").pop()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

