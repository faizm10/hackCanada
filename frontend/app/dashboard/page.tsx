"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CasesTable } from "@/components/cases-table";
import { StatsCards } from "@/components/stats-cards";
import { AnimatedListDemo } from "@/components/notifications";


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

  const handleCreateCase = () => {
    router.push(`/case-builder`);
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Button
          variant="default"
          className="bg-black text-white px-5 py-3 text-lg hover:bg-black/90"
          onClick={() => handleCreateCase()}
        >
          Create New Case
        </Button>
      </div>

      {/* Stats & Notifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stats Section - Now dynamically tracking cases */}
        <div className="md:col-span-2">
          <StatsCards cases={mockCases} />
        </div>

        {/* Notifications Panel */}
        <div className=" dark:bg-gray-900  p-4 max-h-60 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Recent Updates</h2>
          <AnimatedListDemo />
        </div>
      </div>

      {/* Recent Cases Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Cases</h2>
        <div className="rounded-lg border bg-white dark:bg-black shadow-sm">
          <CasesTable cases={mockCases} onViewDetails={handleViewDetails} />
        </div>
      </div>
    </div>
  );
}
