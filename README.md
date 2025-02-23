# 🏡 TenantShield - AI-Powered Legal Aid for Canadian Renters  

## 📌 Problem Statement  
Many Canadian tenants **face illegal rent increases, evictions, and landlord disputes** but **lack access to affordable legal aid** or **struggle to understand their rights.** Legal services are expensive, and navigating tenant laws is complex.  

## 🚀 Solution  
**TenantShield** is an **AI-powered legal assistant** designed to help tenants:  
✅ **Understand their rights** based on **province-specific rental laws.**  
✅ **Log disputes, upload evidence, and track case progress.**  
✅ **Generate legal documents** for eviction appeals, rent disputes, and landlord complaints.  

---

# 🔥 Tech Stack  

### **Frontend (User Interface)**  
- **Framework:** Next.js  
- **Styling:** Tailwind CSS  
- **Authentication:** Firebase Auth  

### **Backend (APIs & Database)**  
- **Server:** Node.js + Express.js  
- **AI Model:** Gemini AI (Google Generative AI)  
- **Database:** Supabase  

### **APIs & Integrations**  
- **Google Gemini API** → AI-powered chatbot & document generation  
- **Firebase Authentication** → Secure user login & signup  
- **Supabase Database** → Stores tenant cases & chat history  

---

# 📂 Page Breakdown & Features  

## **1️⃣ Authentication & User Dashboard**  
📌 **Purpose:** Secure user login and personalized dashboard.  
🛠️ **Features:**  
✅ **Email & Password Authentication** (Firebase Auth)  
✅ **Google Sign-In** for faster access  
✅ **Dashboard to view saved cases & documents**  

---

## **2️⃣ AI Chatbot for Tenant Rights**  
📌 **Purpose:** Provides **legal assistance based on province-specific rental laws.**  
🛠️ **Features:**  
✅ **User enters a legal question** (e.g., "Can my landlord increase rent by 10%?")  
✅ **AI chatbot responds with province-specific legal advice**  
✅ **Stores chat history in Firestore for future reference**  

---

## **3️⃣ Case Builder & Dispute Tracker**  
📌 **Purpose:** **Helps tenants document disputes, upload evidence, and track case progress.**  
🛠️ **Features:**  
✅ **Step-by-step case logging** (Dispute Type → Upload Evidence → Track Progress)  
✅ **Drag & drop file upload** (Lease agreements, emails, damage photos)  
✅ **Firestore storage & case tracking**  

---

## **4️⃣ AI-Powered Legal Document Generator**  
📌 **Purpose:** Automatically generates **eviction appeals, rent dispute letters, and landlord complaints.**  
🛠️ **Features:**  
✅ **User selects document type** (e.g., "Eviction Appeal")  
✅ **AI auto-fills legal language** for accuracy  
✅ **Download as PDF or email directly to landlord**  

---

# 👥 Team Contributions  

| Team Member  | Contribution |
|-------------|-------------|
| **Faiz** | Full-Stack Development, AI Chatbot Integration, Case Management System |
| **Talha** | Database Architecture, Supabase Integration, API Development |
| **Fawaz** | Backend Development, Firebase Authentication, File Upload System |
| **Shomaain** | Frontend UI/UX, Tailwind CSS, Dashboard & Form Styling |

---

# 🚀 How to Contribute  

### **1️⃣ Create a New Branch**  
```bash
git checkout -b {your-name/feature}
git add .
git commit -m "New Feature"
git push --set-upstream origin '{your-name/feature}'
git checkout main
```

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **3️⃣ Run the Development Server**  
```bash
npm run dev
```

---

# ✅ Future Enhancements  
🔹 **Multilingual Support** (French & English for Canadian renters)  
🔹 **AI-Powered Dispute Resolutions** via guided legal workflows  
🔹 **Partnership with Legal Aid Clinics** for free consultations  