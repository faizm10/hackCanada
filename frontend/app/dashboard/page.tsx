"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CasesTable } from "@/components/cases-table";
import { StatsCards } from "@/components/stats-cards";
import { AnimatedListDemo } from "@/components/notifications";

// Mock data for demonstration
const mockCases = [
  {
    id: "1",
    title: "Rent Increase Dispute",
    status: "active" as const,
    progress: 75,
    progressStatus: "Waiting for Landlord Response",
    lastUpdated: "2024-02-21",
  },
  {
    id: "2",
    title: "Maintenance Request",
    status: "pending" as const,
    progress: 50,
    progressStatus: "Documentation Review",
    lastUpdated: "2024-02-20",
  },
  {
    id: "3",
    title: "Security Deposit Claim",
    status: "resolved" as const,
    progress: 100,
    progressStatus: "Case Closed",
    lastUpdated: "2024-02-19",
  },
  {
    id: "4",
    title: "Lease Termination",
    status: "active" as const,
    progress: 25,
    progressStatus: "Initial Assessment",
    lastUpdated: "2024-02-18",
  },
  {
    id: "5",
    title: "Fraud Transaction",
    status: "pending" as const,
    progress: 33,
    progressStatus: "First Meeting",
    lastUpdated: "2024-02-18",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/case-builder/${id}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button
          variant="default"
          className="bg-black text-white hover:bg-black/90"
        >
          Create New Case
        </Button>
      </div>

      <StatsCards />
      <AnimatedListDemo />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Cases</h2>
        <div className="rounded-lg border bg-white dark:bg-black">
          <CasesTable cases={mockCases} onViewDetails={handleViewDetails} />
        </div>
      </div>
    </div>
  );
}
