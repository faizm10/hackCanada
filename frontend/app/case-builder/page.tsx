"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const steps = [
  { id: "info", title: "Case Information" },
  { id: "details", title: "Dispute Details" },
  { id: "finalize", title: "Finalize & Track" },
];

const STATUS_OPTIONS = ["Draft", "In Progress", "Submitted", "Resolved"];
const STATUS_TO_PERCENTAGE: { [key: string]: number } = {
  Draft: 0,
  "In Progress": 25,
  Submitted: 50,
  Resolved: 100,
};

export default function CaseBuilderPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [currentStep, setCurrentStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState("Draft");
  const [progressValue, setProgressValue] = useState(0);
  const [progressText, setProgressText] = useState("");

  const [caseDetails, setCaseDetails] = useState({
    type: "",
    title: "",
    description: "",
    landlordInfo: {
      name: "",
      email: "",
      phone: "",
    },
    files: [] as File[],
  });

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        router.push("/login");
      }
    }
    getUser();
  }, []);

  const updateCaseInfo = (field: string, value: string) =>
    setCaseDetails((prev) => ({ ...prev, [field]: value }));
  const updateLandlordInfo = (field: string, value: string) =>
    setCaseDetails((prev) => ({
      ...prev,
      landlordInfo: { ...prev.landlordInfo, [field]: value },
    }));
  const updateFiles = (files: File[]) =>
    setCaseDetails((prev) => ({ ...prev, files }));
  const updateProgressText = (text: string) => setProgressText(text);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setProgressValue(STATUS_TO_PERCENTAGE[status]);
  };

  const validateStep = () => {
    if (currentStep === 0 && (!caseDetails.type || !caseDetails.title)) {
      toast.error("Please fill in the Case Type and Title.");
      return false;
    } else if (
      currentStep === 1 &&
      (!caseDetails.description ||
        !caseDetails.landlordInfo.name ||
        !caseDetails.landlordInfo.email ||
        !caseDetails.landlordInfo.phone)
    ) {
      toast.error("Please complete all Dispute Details fields.");
      return false;
    } else if (currentStep === 2 && (!selectedStatus || !progressText)) {
      toast.error("Please set a valid status and progress description.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
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
    const { data, error } = await supabase.storage
      .from("case-files")
      .upload(filePath, file);
    if (error) throw error;
    return filePath;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      if (!user) throw new Error("Not authenticated");

      setUploadProgress(10);
      const uploadedFiles = [];

      if (caseDetails.files.length) {
        for (const file of caseDetails.files) {
          const filePath = await uploadFile(file);
          uploadedFiles.push(filePath);
          setUploadProgress((prev) => prev + 90 / caseDetails.files.length);
        }
      }

      const caseData = {
        user_id: user.id,
        type: caseDetails.type,
        title: caseDetails.title,
        status: selectedStatus,
        progress: {
          text: progressText,
          percentage: progressValue,
        },
        description: caseDetails.description,
        landlord_name: caseDetails.landlordInfo.name,
        landlord_email: caseDetails.landlordInfo.email,
        landlord_phone: caseDetails.landlordInfo.phone,
        files: uploadedFiles,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("cases").insert([caseData]);
      if (error) throw error;

      setUploadProgress(100);
      toast.success("Case submitted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting case:", error);
      setUploadProgress(0);
      toast.error("Failed to submit case. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-12">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create New Case
      </h1>

      {/* Steps Indicator */}
      <nav className="mb-8">
        <ol className="flex space-x-6 justify-center">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`flex-1 border-b-4 pb-2 text-center ${index <= currentStep ? "border-primary" : "border-gray-300"}`}
            >
              <span className="text-sm font-medium">{step.title}</span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Case Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {currentStep === 0 && (
          <div className="space-y-6">
            {/* Case Type */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Case Type
              </label>
              <Select
                value={caseDetails.type}
                onValueChange={(value) => updateCaseInfo("type", value)}
              >
                <SelectTrigger className="w-full p-4 text-lg border rounded-lg">
                  <SelectValue placeholder="Select Case Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Case Types</SelectLabel>
                    <SelectItem value="Eviction Appeal">
                      Eviction Appeal
                    </SelectItem>
                    <SelectItem value="Rent Dispute">Rent Dispute</SelectItem>
                    <SelectItem value="Property Damage">
                      Property Damage
                    </SelectItem>
                    <SelectItem value="Lease Termination">
                      Lease Termination
                    </SelectItem>
                    <SelectItem value="Security Deposit Dispute">
                      Security Deposit Dispute
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Case Title */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Case Title
              </label>
              <Input
                placeholder="Enter Case Title"
                value={caseDetails.title}
                onChange={(e) => updateCaseInfo("title", e.target.value)}
                className="p-4 text-lg border rounded-lg"
              />
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <>
            <Input
              placeholder="Dispute Description"
              value={caseDetails.description}
              onChange={(e) => updateCaseInfo("description", e.target.value)}
            />
            <Input
              placeholder="Landlord Name"
              value={caseDetails.landlordInfo.name}
              onChange={(e) => updateLandlordInfo("name", e.target.value)}
            />
            <Input
              placeholder="Landlord Email"
              value={caseDetails.landlordInfo.email}
              onChange={(e) => updateLandlordInfo("email", e.target.value)}
            />
            <Input
              placeholder="Landlord Phone"
              value={caseDetails.landlordInfo.phone}
              onChange={(e) => updateLandlordInfo("phone", e.target.value)}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <div>
              <label className="block text-lg font-medium mb-2">
                Case Status
              </label>
              <Select
                value={selectedStatus}
                onValueChange={(value) => handleStatusChange(value)}
              >
                <SelectTrigger className="w-full p-4 text-lg border rounded-lg">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status Options</SelectLabel>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Slider
              value={[progressValue]}
              max={100}
              step={1}
              onValueChange={(val) => setProgressValue(val[0])}
            />
            <Input
              placeholder="Progress Description"
              value={progressText}
              onChange={(e) => updateProgressText(e.target.value)}
            />
            <Progress value={uploadProgress} />
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
        >
          {" "}
          {currentStep === steps.length - 1 ? "Submit Case" : "Next"}{" "}
        </Button>
      </div>
    </div>
  );
}
