/*
Task: Create a form where users enter details to generate the legal document.

Dropdown to select document type (Eviction Appeal, Rent Dispute, Complaint)
Input fields for:
Landlord’s Name, Address, Email
Tenant’s Name, Address
Case Details (e.g., reason for dispute, rent increase amount, etc.)

"Generate Document" Button to send data to the AI backend
*/
"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LegalDoc = () => {
  const [formData, setFormData] = useState({
    documentType: "Eviction Appeal",
    landlordName: "",
    landlordAddress: "",
    landlordEmail: "",
    tenantName: "",
    tenantAddress: "",
    caseDetails: ""
  });
  const [generatedDocument, setGeneratedDocument] = useState("");
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    const doc = `Legal Document: ${formData.documentType}\n\nLandlord: ${formData.landlordName}\nAddress: ${formData.landlordAddress}\nEmail: ${formData.landlordEmail}\n\nTenant: ${formData.tenantName}\nAddress: ${formData.tenantAddress}\n\nCase Details:\n${formData.caseDetails}`;
    setGeneratedDocument(doc);
    setEditing(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {!editing ? (
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Generate Legal Document</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={formData.documentType} onValueChange={(value) => setFormData({ ...formData, documentType: value })}>
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
            <Button onClick={handleGenerate} className="mt-4 w-full">Generate Document</Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Generated Legal Document</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={generatedDocument} onChange={(e) => setGeneratedDocument(e.target.value)} className="w-full h-40" />
            <div className="flex gap-2 mt-4">
              <Button onClick={() => setEditing(false)}>Modify Inputs</Button>
              <Button>Finalize Document</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LegalDoc;
