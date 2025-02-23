import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import type { CaseDetails } from "@/types/case"

interface FinalizeStepProps {
  caseDetails: Partial<CaseDetails>
  onStatusChange?: (status: string) => void
  onProgressChange?: (progress: { text: string; percentage: number }) => void
  uploadProgress: number
}

const STATUS_TO_PERCENTAGE: { [key: string]: number } = {
  DRAFT: 0,
  IN_PROGRESS: 25,
  SUBMITTED: 50,
  RESOLVED: 100,
}

export function FinalizeStep({
  caseDetails,
  onStatusChange = () => {}, // Default empty function
  onProgressChange = () => {}, // Default empty function
  uploadProgress,
}: FinalizeStepProps) {
  const [progressText, setProgressText] = useState(caseDetails.progress?.text || "")
  const [progressPercentage, setProgressPercentage] = useState(
    caseDetails.progress?.percentage || 0
  )

  // Handle status change and update slider percentage accordingly
  const handleStatusChange = (status: string) => {
    if (!onStatusChange) return
    onStatusChange(status)
    const percentage = STATUS_TO_PERCENTAGE[status] || 0
    setProgressPercentage(percentage)
    if (onProgressChange) onProgressChange({ text: progressText, percentage })
  }

  // Update progress manually when the slider is moved
  const handleSliderChange = (value: number[]) => {
    setProgressPercentage(value[0])
    if (onProgressChange) onProgressChange({ text: progressText, percentage: value[0] })
  }

  // Update progress description
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressText(e.target.value)
    if (onProgressChange) onProgressChange({ text: e.target.value, percentage: progressPercentage })
  }

  return (
    <div className="space-y-6">
      {/* Case Status Selection */}
      <div className="space-y-2">
        <Label>Case Status</Label>
        <Select onValueChange={handleStatusChange} defaultValue="DRAFT">
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="SUBMITTED">Submitted</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Progress Slider & Description */}
      <div className="space-y-4">
        <Label>Progress</Label>
        <div className="space-y-2">
          <Slider
            value={[progressPercentage]}
            onValueChange={handleSliderChange}
            max={100}
            step={1}
          />
          <div className="text-sm text-muted-foreground">{progressPercentage}%</div>
        </div>
        <Input
          placeholder="Progress description (e.g., Waiting for landlord response)"
          value={progressText}
          onChange={handleTextChange}
        />
      </div>

      {/* Upload Progress Bar */}
      {uploadProgress > 0 && (
        <div className="space-y-2">
          <Label>Upload Progress</Label>
          <Progress value={uploadProgress} />
        </div>
      )}
    </div>
  )
}
