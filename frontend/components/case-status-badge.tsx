import { Badge } from "@/components/ui/badge"

type Status = "active" | "pending" | "resolved"

interface CaseStatusBadgeProps {
  status: Status
}

const statusStyles = {
  active: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  resolved: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
}

const statusText = {
  active: "Active",
  pending: "Pending",
  resolved: "Resolved",
}

export function CaseStatusBadge({ status }: CaseStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={statusStyles[status]}>
      {statusText[status]}
    </Badge>
  )
}

