
const { NextResponse } = require("next/server");
const { getLegalAdvice } = require("./fetchGoogleGermini")

const { GoogleGenerativeAI } = require("@google/generative-ai");
const admin = require("firebase-admin");

// Firebase setup
const serviceAccount = require("../firebase-config.json"); // Replace with your Firebase config file
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Province-specific law context (sample data)
const legalData = {
  ontario: "Ontario tenant rights include rules about rent increases, evictions, and repairs as per the Residential Tenancies Act.",
  bc: "British Columbia tenant rights are governed by the Residential Tenancy Act, which outlines responsibilities for landlords and tenants.",
};

// API Route
export async function POST(req) {
  try {
    const { userId, message, province } = await req.json();

    if (!userId || !message || !province) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const aiResponse = await getLegalAdvice(userId, message, province);
    console.log("After ai response");

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
