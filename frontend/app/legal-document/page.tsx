"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jsPDF } from "jspdf";

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
  const [generatedDocument, setGeneratedDocument] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/legal-document", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const data = await response.json();
      setGeneratedDocument(data.document);
      setEditing(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    const lines = doc.splitTextToSize(generatedDocument, maxLineWidth);
    doc.text(lines, margin, margin);
    doc.save(`${formData.documentType}.pdf`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {!editing ? (
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Generate Legal Document</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={formData.documentType}
              onValueChange={(value) => setFormData({ ...formData, documentType: value })}
            >
              <SelectTrigger>{formData.documentType}</SelectTrigger>
              <SelectContent>
                <SelectItem value="Eviction Appeal">Eviction Appeal</SelectItem>
                <SelectItem value="Rent Dispute">Rent Dispute</SelectItem>
                <SelectItem value="Complaint">Complaint</SelectItem>
              </SelectContent>
            </Select>
            <Input name="landlordName" placeholder="Landlord’s Name" onChange={handleChange} className="mt-4" />
            <Input name="landlordAddress" placeholder="Landlord’s Address" onChange={handleChange} className="mt-4" />
            <Input name="landlordEmail" placeholder="Landlord’s Email" onChange={handleChange} className="mt-4" />
            <Input name="tenantName" placeholder="Tenant’s Name" onChange={handleChange} className="mt-4" />
            <Input name="tenantAddress" placeholder="Tenant’s Address" onChange={handleChange} className="mt-4" />
            <Textarea name="caseDetails" placeholder="Case Details" onChange={handleChange} className="mt-4" />
            <Button onClick={handleGenerate} className="mt-4 w-full" disabled={loading}>
              {loading ? "Generating..." : "Generate Document"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Generated Legal Document</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedDocument}
              onChange={(e) => setGeneratedDocument(e.target.value)}
              className="w-full h-40"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={() => setEditing(false)}>Modify Inputs</Button>
              <Button onClick={handleDownload}>Download Document as PDF</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalDoc;
