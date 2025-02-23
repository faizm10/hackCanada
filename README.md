# 🏡 TenantShield - AI-Powered Legal Aid for Canadian Renters  

## 📌 Problem Statement
Many Canadian tenants **face illegal rent increases, evictions, and landlord disputes** but **lack access to affordable legal aid** or **struggle to understand their rights.** Legal services are expensive, and navigating tenant laws is complex.  

## 🚀 Solution
TenantShield is an **AI-powered legal assistant** that helps tenants **understand their rights, track disputes, generate legal documents, and find free legal aid.**  

## 📜 Key Features
✅ **AI Chatbot for Tenant Rights** - Answers tenant questions based on **province-specific rental laws.**  
✅ **Case Builder** - Helps tenants **log disputes, upload evidence, and track case progress.**  
✅ **AI-Powered Legal Letter Generator** - Creates **eviction appeals, rent dispute letters, and landlord complaints.**  

---

# 🔥 Tech Stack
### **Frontend (User Interface)**
- **Framework:** Next.js 
- **UI Styling:** Tailwind CSS  
- **Authentication:** Firebase Auth  

### **Backend (APIs & Database)**
- **Server:** Node.js + Express.js  
- **AI Model:** Gemini AI (Google Generative AI)  
- **Database:** Supabase

### **APIs & Integrations**
- **Google Gemini API** - AI-powered chatbot & document generation  
- **Firebase Authentication** - Secure user login & signup  
- **Supabase Database** - Stores tenant cases & chat history  

---

# 📂 Page Breakdown & Features

## **1️⃣ Login Page**
📌 **Purpose:** Secure user authentication for tracking cases & saving documents.  
🛠️ **Features:**  
- Email/password login via **Firebase Auth**  
- Google Sign-In 

---

## **2️⃣ AI Chatbot Page**
📌 **Purpose:** AI-powered **legal assistant** that provides **rental law guidance.**  
🛠️ **Features:**  
- User enters a **question about tenant rights**  
- **AI responds with legal advice** based on **province-specific laws**  
- **Conversation history stored in Firestore**  

---

## **3️⃣ Case Builder Page**
📌 **Purpose:** **Guides tenants through the dispute process**, helping them log complaints & upload evidence.  
🛠️ **Features:**  
- **Step-by-step form** (Tenant info → Dispute Type → Upload Evidence)  
- **Drag & drop file upload** (Lease agreements, emails, damage photos)  
- **Firestore storage & case tracking**  

---

## **4️⃣ AI-Powered Legal Document Generator**
📌 **Purpose:** Auto-creates legal letters **(eviction appeal, rent dispute request, landlord complaint).**  
🛠️ **Features:**  
- User selects **letter type** (e.g., "Dispute Rent Increase")  
- AI fills in **legal language & formats document properly**  
- **Download as PDF or email it to the landlord**  

---

## Create New Branch 

```bash
git checkout -b {your-name/feature}
git add .
git commit -m "New Feature"
git push --set-upstream origin '{your-name/feature}'
git checkout main
```