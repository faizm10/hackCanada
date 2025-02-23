"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CaseInfoStep } from "@/components/case-info-step"
import { DisputeDetailsStep } from "@/components/dispute-details-step"
import { FinalizeStep } from "@/components/finalize-step"
import type { CaseDetails } from "@/types/case"

const steps = [
  { id: "info", title: "Case Information" },
  { id: "details", title: "Dispute Details" },
  { id: "finalize", title: "Finalize & Track" },
]

export default function NewCasePage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [currentStep, setCurrentStep] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [caseDetails, setCaseDetails] = useState<Partial<CaseDetails>>({
    type: undefined,
    title: "",
    description: "",
    landlord_name: "",
    landlord_email: "",
    landlord_phone: "",
    files: [],
    status: "DRAFT",
    progress: {
      text: "",
      percentage: 0,
    },
  })

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
      }
    }
    checkAuth()
  }, [router, supabase])

  const handleSubmit = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) throw new Error("Not authenticated")

      setUploadProgress(10)

      // Upload files if any
      const uploadedFiles = []
      if (caseDetails.files?.length) {
        for (let i = 0; i < caseDetails.files.length; i++) {
          const file = caseDetails.files[i]
          const filePath = `cases/${Date.now()}-${file}`
          uploadedFiles.push(filePath)
          setUploadProgress(Math.round(((i + 1) / caseDetails.files.length) * 90))
        }
      }

      const { error } = await supabase.from("cases").insert([
        {
          ...caseDetails,
          user_id: session.user.id,
          files: uploadedFiles,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) throw error

      setUploadProgress(100)
      toast.success("Case created successfully!")
      router.push("/cases")
    } catch (error) {
      console.error("Error creating case:", error)
      toast.error("Failed to create case")
      setUploadProgress(0)
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Case</h1>
          <p className="text-muted-foreground">Fill out the information below to create a new case</p>
        </div>

        <div className="flex space-x-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 border-b-2 pb-2 ${index <= currentStep ? "border-primary" : "border-muted"}`}
            >
              <div className="text-xs text-muted-foreground">Step {index + 1}</div>
              <div className="font-medium">{step.title}</div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {currentStep === 0 && (
            <CaseInfoStep
              type={caseDetails.type}
              title={caseDetails.title || ""}
              onTypeChange={(type) => setCaseDetails((prev) => ({ ...prev, type }))}
              onTitleChange={(title) => setCaseDetails((prev) => ({ ...prev, title }))}
            />
          )}
          {currentStep === 1 && (
            <DisputeDetailsStep
              description={caseDetails.description || ""}
              landlordInfo={{
                name: caseDetails.landlord_name || "",
                email: caseDetails.landlord_email || "",
                phone: caseDetails.landlord_phone || "",
              }}
              files={caseDetails.files || []}
              onDescriptionChange={(description) => setCaseDetails((prev) => ({ ...prev, description }))}
              onLandlordInfoChange={(field, value) =>
                setCaseDetails((prev) => ({
                  ...prev,
                  [`landlord_${field}`]: value,
                }))
              }
              onFilesChange={(files) => setCaseDetails((prev) => ({ ...prev, files }))}
            />
          )}
          {currentStep === 2 && (
            <FinalizeStep
              case={caseDetails}
              onStatusChange={(status) => setCaseDetails((prev) => ({ ...prev, status }))}
              onProgressChange={(progress) => setCaseDetails((prev) => ({ ...prev, progress }))}
              uploadProgress={uploadProgress}
            />
          )}
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                handleSubmit()
              } else {
                setCurrentStep((prev) => prev + 1)
              }
            }}
          >
            {currentStep === steps.length - 1 ? "Submit Case" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}

