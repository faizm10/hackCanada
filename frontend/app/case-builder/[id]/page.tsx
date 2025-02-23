// //loads the info and allows user to edit the case

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Loader } from "lucide-react"; // For loading state

// interface CaseDetails {
//   id: string;
//   type: string;
//   description: string;
//   landlordInfo: {
//     name: string;
//     email: string;
//     phone: string;
//   };
//   evidence: string[]; // File URLs
// }

// const EditCasePage = ({ params }: { params: { id: string } }) => {
//   const router = useRouter();
//   const caseId = params.id; // Extract case ID from URL
//   const [loading, setLoading] = useState(true);
//   const [caseData, setCaseData] = useState<CaseDetails | null>(null);
//   const [updatedCase, setUpdatedCase] = useState<CaseDetails | null>(null);

//   // Simulated API Call (Replace with Firebase call)
//   useEffect(() => {
//     setTimeout(() => {
//       const sampleCase: CaseDetails = {
//         id: caseId,
//         type: "Rent Increase Dispute",
//         description:
//           "Landlord increased rent illegally beyond the allowed percentage.",
//         landlordInfo: {
//           name: "John Doe",
//           email: "landlord@example.com",
//           phone: "123-456-7890",
//         },
//         evidence: ["https://example.com/evidence1.pdf"],
//       };

//       setCaseData(sampleCase);
//       setUpdatedCase(sampleCase);
//       setLoading(false);
//     }, 1500); // Simulate loading delay
//   }, [caseId]);

//   const handleChange = (field: keyof CaseDetails, value: string) => {
//     setUpdatedCase((prev) => (prev ? { ...prev, [field]: value } : null));
//   };

//   const handleLandlordChange = (
//     field: keyof CaseDetails["landlordInfo"],
//     value: string
//   ) => {
//     setUpdatedCase((prev) =>
//       prev
//         ? { ...prev, landlordInfo: { ...prev.landlordInfo, [field]: value } }
//         : null
//     );
//   };

//   const handleSave = async () => {
//     if (!updatedCase) return;
//     console.log("Updated Case Data:", updatedCase);

//     // Uncomment when Firebase is set up
//     // await updateCaseInFirestore(caseId, updatedCase);

//     alert("Case updated successfully!");
//     router.push("/dashboard"); // Redirect after saving
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <Loader className="h-10 w-10 animate-spin text-gray-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-4">Edit Case</h1>

//       <Card className="p-6 space-y-4 bg-white dark:bg-gray-900 shadow-md rounded-lg">
//         {/* Case Type */}
//         <div>
//           <label className="block text-sm font-medium">Case Type</label>
//           <Input
//             type="text"
//             value={updatedCase?.type || ""}
//             onChange={(e) => handleChange("type", e.target.value)}
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <Textarea
//             value={updatedCase?.description || ""}
//             onChange={(e) => handleChange("description", e.target.value)}
//           />
//         </div>

//         {/* Landlord Information */}
//         <h2 className="text-lg font-semibold mt-4">Landlord Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium">Name</label>
//             <Input
//               type="text"
//               value={updatedCase?.landlordInfo.name || ""}
//               onChange={(e) => handleLandlordChange("name", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <Input
//               type="email"
//               value={updatedCase?.landlordInfo.email || ""}
//               onChange={(e) => handleLandlordChange("email", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Phone</label>
//             <Input
//               type="text"
//               value={updatedCase?.landlordInfo.phone || ""}
//               onChange={(e) => handleLandlordChange("phone", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Evidence Section */}
//         <h2 className="text-lg font-semibold mt-4">Evidence</h2>
//         <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
//           {updatedCase?.evidence.length ? (
//             updatedCase.evidence.map((file, index) => (
//               <p key={index} className="text-sm text-blue-600 hover:underline">
//                 <a href={file} target="_blank" rel="noopener noreferrer">
//                   View Evidence {index + 1}
//                 </a>
//               </p>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No evidence uploaded.</p>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-end">
//           <Button
//             className="bg-black text-white hover:bg-black/90"
//             onClick={handleSave}
//           >
//             Save Changes
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default EditCasePage;
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader } from "lucide-react"
import { PDFViewer } from "@/components/pdf-viewer"
interface CaseDetails {
  id: string
  type: string
  description: string
  landlordInfo: {
    name: string
    email: string
    phone: string
  }
  evidence: string[] // File URLs
}

// Sample PDF URLs for testing
const SAMPLE_PDFS = [
  "/sample.pdf", // Replace with your actual PDF paths
  "/dummy.pdf",
]

export default function EditCasePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const caseId = params.id
  const [loading, setLoading] = useState(true)
  const [caseData, setCaseData] = useState<CaseDetails | null>(null)
  const [updatedCase, setUpdatedCase] = useState<CaseDetails | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  // Simulated API Call (Replace with Firebase call)
  useEffect(() => {
    setTimeout(() => {
      const sampleCase: CaseDetails = {
        id: caseId,
        type: "Rent Increase Dispute",
        description: "Landlord increased rent illegally beyond the allowed percentage.",
        landlordInfo: {
          name: "John Doe",
          email: "landlord@example.com",
          phone: "123-456-7890",
        },
        evidence: SAMPLE_PDFS,
      }

      setCaseData(sampleCase)
      setUpdatedCase(sampleCase)
      setSelectedFile(sampleCase.evidence[0])
      setLoading(false)
    }, 1500)
  }, [caseId])

  const handleChange = (field: keyof CaseDetails, value: string) => {
    setUpdatedCase((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleLandlordChange = (field: keyof CaseDetails["landlordInfo"], value: string) => {
    setUpdatedCase((prev) => (prev ? { ...prev, landlordInfo: { ...prev.landlordInfo, [field]: value } } : null))
  }

  const handleSave = async () => {
    if (!updatedCase) return
    console.log("Updated Case Data:", updatedCase)
    alert("Case updated successfully!")
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-gray-600" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6 p-6">
      {/* Left side - Form */}
      <div className="w-1/2 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Edit Case</h1>
            <Button className="bg-black text-white hover:bg-black/90" onClick={handleSave}>
              Save Changes
            </Button>
          </div>

          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Case Type</label>
                <Input
                  type="text"
                  value={updatedCase?.type || ""}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={updatedCase?.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="mt-1 min-h-[150px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Landlord Information</h2>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    type="text"
                    value={updatedCase?.landlordInfo.name || ""}
                    onChange={(e) => handleLandlordChange("name", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={updatedCase?.landlordInfo.email || ""}
                    onChange={(e) => handleLandlordChange("email", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    type="text"
                    value={updatedCase?.landlordInfo.phone || ""}
                    onChange={(e) => handleLandlordChange("phone", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Evidence Files</h2>
              <div className="bg-muted rounded-lg p-4">
                {updatedCase?.evidence.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-4 py-2 rounded-lg mb-2 last:mb-0 ${
                      selectedFile === file ? "bg-primary text-primary-foreground" : "hover:bg-muted-foreground/10"
                    }`}
                  >
                    Evidence {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Right side - PDF Viewer */}
      <div className="w-1/2 bg-card rounded-lg border">
        <PDFViewer url={selectedFile} />
      </div>
    </div>
  )
}

