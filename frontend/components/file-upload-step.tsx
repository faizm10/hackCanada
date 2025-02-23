"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import type { CaseFile } from "@/types/case"

interface FileUploadStepProps {
  files: CaseFile[]
  onFilesChange: (files: CaseFile[]) => void
}

export function FileUploadStep({ files, onFilesChange }: FileUploadStepProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: CaseFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
      }))
      onFilesChange([...files, ...newFiles])
    },
    [files, onFilesChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  })

  const removeFile = (id: string) => {
    onFilesChange(files.filter((file) => file.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Evidence</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Drag & drop files here, or click to select files</p>
          <p className="text-xs text-muted-foreground">Supports: PDF, DOC, DOCX, PNG, JPG (up to 10MB)</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  {typeof file.progress === "number" && <Progress value={file.progress} className="h-1 mt-2" />}
                </div>
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeFile(file.id)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

