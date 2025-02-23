"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { toast } from "sonner"; // For notifications

interface CaseDetails {
  id: string;
  type: string;
  description: string;
  landlord_name: string;
  landlord_email: string;
  landlord_phone: string;
  evidence: string[]; // Array of file URLs
}

const EditCasePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const caseId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // New state for save button loading
  const [caseData, setCaseData] = useState<CaseDetails | null>(null);
  const [updatedCase, setUpdatedCase] = useState<CaseDetails | null>(null);

  useEffect(() => {
    const fetchCaseData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("id", caseId)
        .single();

      if (error) {
        console.error("Error fetching case:", error);
        toast.error("Failed to load case data.");
        return;
      }

      if (data) {
        const formattedData: CaseDetails = {
          id: data.id,
          type: data.type,
          description: data.description,
          landlord_name: data.landlord_name,
          landlord_email: data.landlord_email,
          landlord_phone: data.landlord_phone,
          evidence: data.files || [], // Ensure it's an array
        };

        setCaseData(formattedData);
        setUpdatedCase(formattedData);
      }

      setLoading(false);
    };

    fetchCaseData();
  }, [caseId, supabase]);

  const handleChange = (field: keyof CaseDetails, value: string) => {
    setUpdatedCase((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = async () => {
    if (!updatedCase) return;

    setSaving(true); // Start showing loading indicator

    try {
      const { error } = await supabase
        .from("cases")
        .update({
          type: updatedCase.type,
          description: updatedCase.description,
          landlord_name: updatedCase.landlord_name,
          landlord_email: updatedCase.landlord_email,
          landlord_phone: updatedCase.landlord_phone,
        })
        .eq("id", caseId);

      if (error) throw error;

      toast.success("Case updated successfully!");

      // Delay slightly for smoother UX
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("Failed to update case. Please try again.");
    } finally {
      setSaving(false); // Stop loading indicator
    }
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
      <h1 className="text-3xl font-semibold mb-6 text-center">Edit Case</h1>

      <Card className="p-6 space-y-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
        {/* Case Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Case Type</label>
          <Input
            type="text"
            value={updatedCase?.type || ""}
            onChange={(e) => handleChange("type", e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={updatedCase?.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Landlord Information */}
        <h2 className="text-lg font-semibold mt-4">Landlord Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              value={updatedCase?.landlord_name || ""}
              onChange={(e) => handleChange("landlord_name", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={updatedCase?.landlord_email || ""}
              onChange={(e) => handleChange("landlord_email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              type="text"
              value={updatedCase?.landlord_phone || ""}
              onChange={(e) => handleChange("landlord_phone", e.target.value)}
            />
          </div>
        </div>

        {/* Evidence Section */}
        <h2 className="text-lg font-semibold mt-6">Evidence</h2>
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

        {/* Save Button with Loading Indicator */}
        <div className="flex justify-end">
          <Button
            className="bg-black text-white hover:bg-black/90 flex items-center"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader className="h-4 w-4 animate-spin mr-2" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditCasePage;
