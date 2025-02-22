//loads the info and allows user to edit the case

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react"; // For loading state

interface CaseDetails {
  id: string;
  type: string;
  description: string;
  landlordInfo: {
    name: string;
    email: string;
    phone: string;
  };
  evidence: string[]; // File URLs
}

const EditCasePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const caseId = params.id; // Extract case ID from URL
  const [loading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState<CaseDetails | null>(null);
  const [updatedCase, setUpdatedCase] = useState<CaseDetails | null>(null);

  // Simulated API Call (Replace with Firebase call)
  useEffect(() => {
    setTimeout(() => {
      const sampleCase: CaseDetails = {
        id: caseId,
        type: "Rent Increase Dispute",
        description:
          "Landlord increased rent illegally beyond the allowed percentage.",
        landlordInfo: {
          name: "John Doe",
          email: "landlord@example.com",
          phone: "123-456-7890",
        },
        evidence: ["https://example.com/evidence1.pdf"],
      };

      setCaseData(sampleCase);
      setUpdatedCase(sampleCase);
      setLoading(false);
    }, 1500); // Simulate loading delay
  }, [caseId]);

  const handleChange = (field: keyof CaseDetails, value: string) => {
    setUpdatedCase((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleLandlordChange = (
    field: keyof CaseDetails["landlordInfo"],
    value: string
  ) => {
    setUpdatedCase((prev) =>
      prev
        ? { ...prev, landlordInfo: { ...prev.landlordInfo, [field]: value } }
        : null
    );
  };

  const handleSave = async () => {
    if (!updatedCase) return;
    console.log("Updated Case Data:", updatedCase);

    // Uncomment when Firebase is set up
    // await updateCaseInFirestore(caseId, updatedCase);

    alert("Case updated successfully!");
    router.push("/dashboard"); // Redirect after saving
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Edit Case</h1>

      <Card className="p-6 space-y-4 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        {/* Case Type */}
        <div>
          <label className="block text-sm font-medium">Case Type</label>
          <Input
            type="text"
            value={updatedCase?.type || ""}
            onChange={(e) => handleChange("type", e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <Textarea
            value={updatedCase?.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Landlord Information */}
        <h2 className="text-lg font-semibold mt-4">Landlord Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              type="text"
              value={updatedCase?.landlordInfo.name || ""}
              onChange={(e) => handleLandlordChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              value={updatedCase?.landlordInfo.email || ""}
              onChange={(e) => handleLandlordChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <Input
              type="text"
              value={updatedCase?.landlordInfo.phone || ""}
              onChange={(e) => handleLandlordChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Evidence Section */}
        <h2 className="text-lg font-semibold mt-4">Evidence</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          {updatedCase?.evidence.length ? (
            updatedCase.evidence.map((file, index) => (
              <p key={index} className="text-sm text-blue-600 hover:underline">
                <a href={file} target="_blank" rel="noopener noreferrer">
                  View Evidence {index + 1}
                </a>
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-500">No evidence uploaded.</p>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            className="bg-black text-white hover:bg-black/90"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditCasePage;
