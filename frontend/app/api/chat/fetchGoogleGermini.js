const { GoogleGenerativeAI } = require("@google/generative-ai");
const admin = require("firebase-admin");
require("dotenv").config();

const { getSystemPrompt } = require("./context"); // Destructure the export


// Firebase setup
const serviceAccount = require("./firebase-config.json"); // Replace with your Firebase config file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Province-specific law context (sample data)
const legalData = {
  ontario: "Ontario tenant rights include rules about rent increases, evictions, and repairs as per the Residential Tenancies Act.",
  bc: "British Columbia tenant rights are governed by the Residential Tenancy Act, which outlines responsibilities for landlords and tenants.",
};

// Chatbot function
async function getLegalAdvice(userId, message, province) {
  if (!userId || !message || !province) {
    throw new Error("Missing required fields.");
  }

  // Fetch legal context
  const legalContext = legalData[province.toLowerCase()] || "Tenant laws vary by province. Please check official resources.";

  // Generate AI response using Gemini
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const response = await model.generateContent([
    getSystemPrompt(province.toLowerCase()),
    message,
  ]);
  const aiResponse = response.response.text();

  // Store conversation in Firestore
  const chatRef = db.collection("chats").doc(userId);
  await chatRef.set(
    {
      messages: admin.firestore.FieldValue.arrayUnion({
        user: message,
        bot: aiResponse,
        timestamp: new Date().toISOString(),
      }),
    },
    { merge: true }
  );

  return aiResponse;
}

module.exports = { getLegalAdvice };