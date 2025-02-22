// Mock Firebase setup - Replace with actual Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

interface LegalDocument {
  id: string;
  title: string;
  content: string;
  province: string;
  category: string;
  lastUpdated: Date;
}

const mockLegalDocuments: LegalDocument[] = [
  {
    id: "1",
    title: "Ontario Residential Tenancies Act",
    content:
      "This act sets out the rights and responsibilities of landlords and tenants...",
    province: "Ontario",
    category: "Residential",
    lastUpdated: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "British Columbia Residential Tenancy Act",
    content:
      "The Residential Tenancy Act applies to tenancy agreements, rental units...",
    province: "British Columbia",
    category: "Residential",
    lastUpdated: new Date("2024-01-01"),
  },
];

export async function getLegalDocuments(
  province: string
): Promise<LegalDocument[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockLegalDocuments.filter((doc) => doc.province === province);
}

export async function searchLegalDocuments(
  query: string,
  province: string
): Promise<LegalDocument[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockLegalDocuments.filter(
    (doc) =>
      doc.province === province &&
      (doc.content.toLowerCase().includes(query.toLowerCase()) ||
        doc.title.toLowerCase().includes(query.toLowerCase()))
  );
}
