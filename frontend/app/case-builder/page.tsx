"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { CaseTypeStep } from "@/components/case-type-step";
import { CaseDetailsStep } from "@/components/case-details-step";
import { FileUploadStep } from "@/components/file-upload-step";
import { ReviewStep } from "@/components/review-step";
import type { CaseDetails, CaseType } from "@/types/case";
import { auth } from "../../lib/firebase/firebaseClient";

const steps = [
  { id: "type", title: "Case Type" },
  { id: "details", title: "Case Details" },
  { id: "evidence", title: "Upload Evidence" },
  { id: "review", title: "Review" },
];

export default function CaseBuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [caseDetails, setCaseDetails] = useState<Partial<CaseDetails>>({
    type: undefined,
    description: "",
    landlordInfo: {
      name: "",
      email: "",
      phone: "",
    },
    files: [],
  });

  const updateCaseType = (type: CaseType) => setCaseDetails((prev) => ({ ...prev, type }));
  const updateDescription = (description: string) => setCaseDetails((prev) => ({ ...prev, description }));
  const updateLandlordInfo = (field: keyof CaseDetails["landlordInfo"], value: string) => {
    setCaseDetails((prev) => ({
      ...prev,
      landlordInfo: { ...prev.landlordInfo!, [field]: value },
    }));
  };
  const updateFiles = (files: CaseDetails["files"]) => setCaseDetails((prev) => ({ ...prev, files }));

  const handleNext = () => currentStep < steps.length - 1 && setCurrentStep((prev) => prev + 1);
  const handleBack = () => currentStep > 0 && setCurrentStep((prev) => prev - 1);

  /** 🔄 Uploads a file to Supabase Storage */
  const uploadFile = async (file: File) => {
    const filePath = `cases/${Date.now()}-${file.name}`; // Unique file name
    const { data, error } = await supabase.storage.from("case-files").upload(filePath, file);

    if (error) throw error;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/case-files/${filePath}`;
  };

  /** 🚀 Submits case to Supabase */
  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const userId = user.uid;

      // Upload all files to Supabase Storage
      const uploadedFiles = await Promise.all(caseDetails.files.map((file) => uploadFile(file)));

      const caseData = {
        user_id: userId,
        type: caseDetails.type || "Unknown",
        description: caseDetails.description || "",
        landlord_name: caseDetails.landlordInfo?.name || "",
        landlord_email: caseDetails.landlordInfo?.email || "",
        landlord_phone: caseDetails.landlordInfo?.phone || "",
        files: uploadedFiles, // Array of uploaded file URLs
        created_at: new Date(),
      };

      // Store case details in Supabase Database
      const { data, error } = await supabase.from("cases").insert([caseData]);

      if (error) throw error;

      console.log("Case stored:", data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting case:", error);
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create New Case</h1>
      </div>

      <div className="space-y-6">
        <nav aria-label="Progress">
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

        <div className="mt-8">
          {currentStep === 0 && <CaseTypeStep value={caseDetails.type as CaseType} onChange={updateCaseType} />}
          {currentStep === 1 && (
            <CaseDetailsStep
              description={caseDetails.description || ""}
              landlordInfo={caseDetails.landlordInfo!}
              onDescriptionChange={updateDescription}
              onLandlordInfoChange={updateLandlordInfo}
            />
          )}
          {currentStep === 2 && <FileUploadStep files={caseDetails.files || []} onFilesChange={updateFiles} />}
          {currentStep === 3 && <ReviewStep case={caseDetails} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          <Button onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext} className="bg-black text-white hover:bg-black/90">
            {currentStep === steps.length - 1 ? "Submit Case" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}


// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { Button } from "@/components/ui/button"
// import { CaseTypeStep } from "@/components/case-type-step"
// import { CaseDetailsStep } from "@/components/case-details-step"
// import { FileUploadStep } from "@/components/file-upload-step"
// import { ReviewStep } from "@/components/review-step"
// import type { CaseDetails, CaseType } from "@/types/case"

// const steps = [
//   { id: "type", title: "Case Type" },
//   { id: "details", title: "Case Details" },
//   { id: "evidence", title: "Upload Evidence" },
//   { id: "review", title: "Review" },
// ]

// export default function CaseBuilderPage() {
//   const router = useRouter()
//   const [currentStep, setCurrentStep] = useState(0)
//   const [caseDetails, setCaseDetails] = useState<Partial<CaseDetails>>({
//     type: undefined,
//     description: "",
//     landlordInfo: {
//       name: "",
//       email: "",
//       phone: "",
//     },
//     files: [],
//   })
//   const [uploadError, setUploadError] = useState<string | null>(null)

//   const supabase = createClientComponentClient()

//   const updateCaseType = (type: CaseType) => setCaseDetails((prev) => ({ ...prev, type }))
//   const updateDescription = (description: string) => setCaseDetails((prev) => ({ ...prev, description }))
//   const updateLandlordInfo = (field: keyof CaseDetails["landlordInfo"], value: string) => {
//     setCaseDetails((prev) => ({
//       ...prev,
//       landlordInfo: { ...prev.landlordInfo!, [field]: value },
//     }))
//   }
//   const updateFiles = (files: CaseDetails["files"]) => setCaseDetails((prev) => ({ ...prev, files }))

//   const handleNext = () => currentStep < steps.length - 1 && setCurrentStep((prev) => prev + 1)
//   const handleBack = () => currentStep > 0 && setCurrentStep((prev) => prev - 1)

//   /** 🔄 Uploads a file to Supabase Storage */
//   const uploadFile = async (file: File) => {
//     if (file.type !== "application/pdf") {
//       throw new Error("Only PDF files are allowed")
//     }

//     const filePath = `cases/${Date.now()}-${file.name}` // Unique file name
//     const { data, error } = await supabase.storage.from("case-files").upload(filePath, file, {
//       contentType: "application/pdf",
//       cacheControl: "3600",
//     })

//     if (error) throw error
//     return filePath // Return the file path, not the full URL
//   }

//   /** 🚀 Submits case to Supabase */
//   const handleSubmit = async () => {
//     try {
//       setUploadError(null)
//       // Upload all files to Supabase Storage
//       const uploadedFilePaths = await Promise.all(caseDetails.files.map((file) => uploadFile(file)))

//       const caseData = {
//         type: caseDetails.type || "Unknown",
//         description: caseDetails.description || "",
//         landlord_name: caseDetails.landlordInfo?.name || "",
//         landlord_email: caseDetails.landlordInfo?.email || "",
//         landlord_phone: caseDetails.landlordInfo?.phone || "",
//         files: uploadedFilePaths, // Array of uploaded file paths
//         created_at: new Date().toISOString(),
//       }

//       // Store case details in Supabase Database
//       const { data, error } = await supabase.from("cases").insert([caseData])

//       if (error) throw error

//       console.log("Case stored:", data)
//       router.push("/dashboard")
//     } catch (error) {
//       console.error("Error submitting case:", error)
//       setUploadError("An error occurred while submitting the case. Please try again.")
//     }
//   }

//   return (
//     <div className="flex-1 space-y-8 p-8 pt-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Create New Case</h1>
//       </div>

//       <div className="space-y-6">
//         <nav aria-label="Progress">
//           <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
//             {steps.map((step, index) => (
//               <li key={step.id} className="md:flex-1">
//                 <div
//                   className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 
//                     ${index <= currentStep ? "border-black dark:border-white" : "border-gray-200"}`}
//                 >
//                   <span className="text-sm font-medium">Step {index + 1}</span>
//                   <span className="text-sm">{step.title}</span>
//                 </div>
//               </li>
//             ))}
//           </ol>
//         </nav>

//         <div className="mt-8">
//           {currentStep === 0 && <CaseTypeStep value={caseDetails.type as CaseType} onChange={updateCaseType} />}
//           {currentStep === 1 && (
//             <CaseDetailsStep
//               description={caseDetails.description || ""}
//               landlordInfo={caseDetails.landlordInfo!}
//               onDescriptionChange={updateDescription}
//               onLandlordInfoChange={updateLandlordInfo}
//             />
//           )}
//           {currentStep === 2 && <FileUploadStep files={caseDetails.files || []} onFilesChange={updateFiles} />}
//           {currentStep === 3 && <ReviewStep case={caseDetails} />}
//         </div>

//         {uploadError && <div className="text-red-500 mt-4">{uploadError}</div>}

//         {/* Navigation */}
//         <div className="flex justify-between">
//           <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
//             Back
//           </Button>
//           <Button
//             onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
//             className="bg-black text-white hover:bg-black/90"
//           >
//             {currentStep === steps.length - 1 ? "Submit Case" : "Continue"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

