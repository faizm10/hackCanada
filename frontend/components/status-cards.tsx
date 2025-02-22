import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatusCardProps {
  title: string
  value: number
  description: string
  className?: string
}

export function StatusCard({ title, value, description, className }: StatusCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

