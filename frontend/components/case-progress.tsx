import { Progress } from "@/components/ui/progress"

interface CaseProgressProps {
  progress: number
  status: string
}

export function CaseProgress({ progress, status }: CaseProgressProps) {
  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground">{status}</p>
    </div>
  )
}

