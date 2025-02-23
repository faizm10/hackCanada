"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { CaseInfoStep } from "@/components/case-info-step";
import { DisputeDetailsStep } from "@/components/dispute-details-step";
import { FinalizeStep } from "@/components/finalize-step";
import type { CaseDetails, CaseType, CaseFile } from "@/types/case";

const steps = [
  { id: "info", title: "Case Information" },
  { id: "details", title: "Dispute Details" },
  { id: "finalize", title: "Finalize & Track" },
];

export default function CaseBuilderPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user, setUser] = useState<any>(null);

  // Fetch user on mount
  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        router.push("/login"); // Redirect if not authenticated
      }
    }
    getUser();
  }, []);

  const [caseDetails, setCaseDetails] = useState<Partial<CaseDetails>>({
    type: undefined,
    title: "",
    status: "DRAFT",
    description: "",
    landlordInfo: {
      name: "",
      email: "",
      phone: "",
    },
    files: [],
  });

  const updateCaseInfo = (type: CaseType) => setCaseDetails((prev) => ({ ...prev, type }));
  const updateCaseTitle = (title: string) => setCaseDetails((prev) => ({ ...prev, title }));
  const updateDescription = (description: string) => setCaseDetails((prev) => ({ ...prev, description }));
  const updateLandlordInfo = (field: keyof CaseDetails["landlordInfo"], value: string) =>
    setCaseDetails((prev) => ({
      ...prev,
      landlordInfo: { ...prev.landlordInfo!, [field]: value },
    }));
  const updateFiles = (files: CaseFile[]) => setCaseDetails((prev) => ({ ...prev, files }));

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const uploadFile = async (file: File) => {
    const filePath = `cases/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("case-files").upload(filePath, file);
    if (error) throw error;
    return filePath;
  };

  const handleSubmit = async () => {
    try {
      if (!user) throw new Error("Not authenticated");

      setUploadProgress(10);
      const totalFiles = caseDetails.files?.length || 0;
      const uploadedFiles = [];

      for (let i = 0; i < totalFiles; i++) {
        const file = caseDetails.files![i];
        const filePath = await uploadFile(file as unknown as File);
        uploadedFiles.push(filePath);
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 90));
      }

      const caseData = {
        user_id: user.id,
        type: caseDetails.type,
        title: caseDetails.title,
        status: "PENDING_REVIEW",
        description: caseDetails.description,
        landlord_name: caseDetails.landlordInfo?.name,
        landlord_email: caseDetails.landlordInfo?.email,
        landlord_phone: caseDetails.landlordInfo?.phone,
        files: uploadedFiles,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("cases").insert([caseData]);
      if (error) throw error;

      setUploadProgress(100);
      toast.success("Case submitted successfully! 🎉"); // Show success notification
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting case:", error);
      setUploadProgress(0);
      toast.error("Failed to submit case. Please try again."); // Show error notification
    }
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 p-8 pt-6">
      {/* Case Creation Form */}
      <div className="lg:w-2/3">
        <h1 className="text-2xl font-semibold">Create New Case</h1>

        {/* Progress Steps */}
        <nav aria-label="Progress" className="mt-4">
          <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.id} className="md:flex-1">
                <div
                  className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 
                    ${index <= currentStep ? "border-black dark:border-white" : "border-gray-200"}`}
                >
                  <span className="text-sm font-medium">Step {index + 1}</span>
                  <span className="text-sm">{step.title}</span>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 0 && <CaseInfoStep type={caseDetails.type} title={caseDetails.title || ""} onTypeChange={updateCaseInfo} onTitleChange={updateCaseTitle} />}
          {currentStep === 1 && <DisputeDetailsStep description={caseDetails.description || ""} landlordInfo={caseDetails.landlordInfo!} files={caseDetails.files || []} onDescriptionChange={updateDescription} onLandlordInfoChange={updateLandlordInfo} onFilesChange={updateFiles} />}
          {currentStep === 2 && <FinalizeStep case={caseDetails} uploadProgress={uploadProgress} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
          <Button onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext} className="bg-black text-white hover:bg-black/90">
            {currentStep === steps.length - 1 ? "Submit Case" : "Continue"}
          </Button>
        </div>
      </div>

      {/* Sidebar with Recent Cases */}
      <div className="lg:w-1/3 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Recent Cases</h2>
        <p className="text-sm text-gray-500">List of active & pending cases...</p>
      </div>
    </div>
  );
}
