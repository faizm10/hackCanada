import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CaseProgress } from "./case-progress"
import { CaseStatusBadge } from "./case-status-badge"

interface Case {
  id: string
  title: string
  status: "active" | "pending" | "resolved"
  progress: number
  progressStatus: string
  lastUpdated: string
}

interface CasesTableProps {
  cases: Case[]
  onViewDetails: (id: string) => void
}

export function CasesTable({ cases, onViewDetails }: CasesTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((case_) => (
            <TableRow key={case_.id}>
              <TableCell className="font-medium">{case_.title}</TableCell>
              <TableCell>
                <CaseStatusBadge status={case_.status} />
              </TableCell>
              <TableCell className="w-[300px]">
                <CaseProgress progress={case_.progress} status={case_.progressStatus} />
              </TableCell>
              <TableCell>{case_.lastUpdated}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => onViewDetails(case_.id)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

