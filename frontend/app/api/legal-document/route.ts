import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import admin from "firebase-admin";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  const serviceAccount = require("../firebase-config.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// db
const db = admin.firestore();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    const { documentType, landlordName, landlordAddress, landlordEmail, tenantName, tenantAddress, caseDetails } = await req.json();

    if (!documentType || !landlordName || !tenantName || !caseDetails) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Generate structured legal letter using AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const response = await model.generateContent([
      `Generate a professionally formatted legal document for a tenant based on the following details:
      
      - Document Type: ${documentType}
      - Landlord Name: ${landlordName}
      - Landlord Address: ${landlordAddress}
      - Landlord Email: ${landlordEmail}
      - Tenant Name: ${tenantName}
      - Tenant Address: ${tenantAddress}
      - Case Details: ${caseDetails}
      
      Format:
      - Proper legal introduction
      - Address recipient professionally
      - Cite relevant legal statutes and cite specific laws where applicable
      - Conclude formally with next steps`,
    ]);

    const aiGeneratedDocument = response.response.text();

    return NextResponse.json({ document: aiGeneratedDocument });
  } catch (error) {
    console.error("Error generating legal document:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}