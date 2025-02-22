import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const provinces = [
  { value: "ON", label: "Ontario" },
//   { value: "BC", label: "British Columbia" },
//   { value: "QC", label: "Quebec" },
//   { value: "AB", label: "Alberta" },
//   { value: "MB", label: "Manitoba" },
//   { value: "SK", label: "Saskatchewan" },
//   { value: "NS", label: "Nova Scotia" },
//   { value: "NB", label: "New Brunswick" },
//   { value: "NL", label: "Newfoundland and Labrador" },
//   { value: "PE", label: "Prince Edward Island" },
]

interface ProvinceSelectProps {
  value: string
  onChange: (value: string) => void
}

export function ProvinceSelect({ value, onChange }: ProvinceSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select province" />
      </SelectTrigger>
      <SelectContent>
        {provinces.map((province) => (
          <SelectItem key={province.value} value={province.value}>
            {province.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

