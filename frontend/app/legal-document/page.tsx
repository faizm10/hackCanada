"use client";
import LegalDocumentPDF from "./LegalDocumentPDF";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";

const LegalDoc = () => {
  const [formData, setFormData] = useState({
    documentType: "Eviction Appeal",
    landlordName: "",
    landlordAddress: "",
    landlordEmail: "",
    tenantName: "",
    tenantAddress: "",
    caseDetails: "",
  });

  const [generated, setGenerated] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setGenerated(true);
  };

  return (
    <div className="flex flex-col gap-8 p-12 max-w-6xl mx-auto">
      {!generated ? (
        <Card className="p-6 w-full shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-6 text-center">
              Generate Legal Document
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Document Type */}
            <div>
              <label className="text-lg font-medium mb-2">Document Type</label>
              <Select
                value={formData.documentType}
                onValueChange={(value) =>
                  setFormData({ ...formData, documentType: value })
                }
              >
                <SelectTrigger className="text-lg p-4 border rounded-lg">
                  {formData.documentType}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eviction Appeal">
                    Eviction Appeal
                  </SelectItem>
                  <SelectItem value="Rent Dispute">Rent Dispute</SelectItem>
                  <SelectItem value="Complaint">Complaint</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Landlord Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="landlordName"
                placeholder="Landlord’s Name"
                onChange={handleChange}
                className="p-4 text-lg border rounded-lg"
              />
              <Input
                name="landlordEmail"
                placeholder="Landlord’s Email"
                onChange={handleChange}
                className="p-4 text-lg border rounded-lg"
              />
              <Input
                name="landlordAddress"
                placeholder="Landlord’s Address"
                onChange={handleChange}
                className="p-4 text-lg border rounded-lg col-span-2"
              />
            </div>

            {/* Tenant Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="tenantName"
                placeholder="Tenant’s Name"
                onChange={handleChange}
                className="p-4 text-lg border rounded-lg"
              />
              <Input
                name="tenantAddress"
                placeholder="Tenant’s Address"
                onChange={handleChange}
                className="p-4 text-lg border rounded-lg"
              />
            </div>

            {/* Case Details */}
            <Textarea
              name="caseDetails"
              placeholder="Provide detailed case information"
              onChange={handleChange}
              className="p-4 text-lg border rounded-lg h-40"
            />

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              className="w-full py-3 text-lg font-semibold bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Generate Document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-6 w-full shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-6 text-center">
              Legal Document Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-lg font-medium mb-2">
                Your document is ready.
              </p>
              <PDFDownloadLink
                document={<LegalDocumentPDF formData={formData} />}
                fileName={`${formData.documentType}.pdf`}
                className="inline-block mt-4"
              >
                {({ loading }) =>
                  loading ? (
                    <Button className="bg-gray-500 text-white w-full" disabled>
                      Generating...
                    </Button>
                  ) : (
                    <Button className="bg-black text-white w-full">
                      Download PDF
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={() => setGenerated(false)}>
                Modify Inputs
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalDoc;
