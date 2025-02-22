# 🏡 TenantShield - AI-Powered Legal Aid for Canadian Renters  

## 📌 Problem Statement
Many Canadian tenants **face illegal rent increases, evictions, and landlord disputes** but **lack access to affordable legal aid** or **struggle to understand their rights.** Legal services are expensive, and navigating tenant laws is complex.  

## 🚀 Solution
TenantShield is an **AI-powered legal assistant** that helps tenants **understand their rights, track disputes, generate legal documents, and find free legal aid.**  

## 📜 Key Features
✅ **AI Chatbot for Tenant Rights** - Answers tenant questions based on **province-specific rental laws.**  
✅ **Case Builder** - Helps tenants **log disputes, upload evidence, and track case progress.**  
✅ **AI Legal Violation Detector** - Scans tenant claims and suggests **if it’s a valid legal case.**  
✅ **AI-Powered Legal Letter Generator** - Creates **eviction appeals, rent dispute letters, and landlord complaints.**  
✅ **Legal Aid Directory** - Connects tenants with **free/pro bono legal services** based on their location.  
✅ **Dispute Notifications & Tracking** - Notifies users of **important legal deadlines** related to their case.  

---

# 🔥 Tech Stack
### **Frontend (User Interface)**
- **Framework:** Next.js (React-based)  
- **UI Styling:** Tailwind CSS  
- **State Management:** React Hooks  
- **Authentication:** Firebase Auth  

### **Backend (APIs & Database)**
- **Server:** Node.js + Express.js  
- **AI Model:** Gemini AI (Google Generative AI)  
- **Database:** Firebase Firestore (NoSQL)  
- **Storage:** Firebase Storage (For case documents & images)  

### **APIs & Integrations**
- **Google Gemini API** - AI-powered chatbot & document generation  
- **Firebase Authentication** - Secure user login & signup  
- **Firestore Database** - Stores tenant cases & chat history  
- **Nodemailer API** (Stretch Goal) - Send legal documents via email  

---

# 📂 Page Breakdown & Features

## **1️⃣ Login Page**
📌 **Purpose:** Secure user authentication for tracking cases & saving documents.  
🛠️ **Features:**  
- Email/password login via **Firebase Auth**  
- Google Sign-In (if time allows)  

👨‍💻 **Built by:** Faiz (Backend), Shomaain (UI)  
⏳ **Estimated Time:** **2 hours**  

---

## **2️⃣ AI Chatbot Page**
📌 **Purpose:** AI-powered **legal assistant** that provides **rental law guidance.**  
🛠️ **Features:**  
- User enters a **question about tenant rights**  
- **AI responds with legal advice** based on **province-specific laws**  
- **Conversation history stored in Firestore**  

👨‍💻 **Built by:** Fawaz (AI Backend), Faiz (Frontend)  
⏳ **Estimated Time:** **4-5 hours**  

---

## **3️⃣ Case Builder Page**
📌 **Purpose:** **Guides tenants through the dispute process**, helping them log complaints & upload evidence.  
🛠️ **Features:**  
- **Step-by-step form** (Tenant info → Dispute Type → Upload Evidence)  
- **Drag & drop file upload** (Lease agreements, emails, damage photos)  
- **Firestore storage & case tracking**  

👨‍💻 **Built by:** Shomaain (UI), Talha (Database)  
⏳ **Estimated Time:** **6 hours**  

---

## **4️⃣ AI Legal Violation Detector**
📌 **Purpose:** AI scans case details & suggests **if the tenant has a valid legal claim.**  
🛠️ **Features:**  
- AI **analyzes user inputs & evidence**  
- Suggests **possible next steps** based on **Canadian tenant law**  
- Provides a **confidence score (e.g., 85% valid case)**  

👨‍💻 **Built by:** Fawaz (AI Backend), Faiz (Frontend Integration)  
⏳ **Estimated Time:** **6-8 hours**  

---

## **5️⃣ AI-Powered Legal Document Generator**
📌 **Purpose:** Auto-creates legal letters **(eviction appeal, rent dispute request, landlord complaint).**  
🛠️ **Features:**  
- User selects **letter type** (e.g., "Dispute Rent Increase")  
- AI fills in **legal language & formats document properly**  
- **Download as PDF or email it to the landlord**  

👨‍💻 **Built by:** Fawaz (AI Backend), Shomaain (Frontend UI)  
⏳ **Estimated Time:** **5-6 hours**  

---

## **6️⃣ Find Legal Aid Page (Stretch Goal)**
📌 **Purpose:** Helps tenants **find free legal assistance** in their province.  
🛠️ **Features:**  
- Search legal aid centers by **province & case type**  
- **Direct contact links** (call/email buttons)  

👨‍💻 **Built by:** Faiz (API), Shomaain (UI)  
⏳ **Estimated Time:** **4 hours**  

---

## **7️⃣ Notifications Page (Stretch Goal)**
📌 **Purpose:** Notifies tenants of **important legal deadlines & updates.**  
🛠️ **Features:**  
- **Reminders for case deadlines**  
- **Push notifications for dispute progress updates**  

👨‍💻 **Built by:** Faiz (Backend API), Shomaain (Frontend UI)  
⏳ **Estimated Time:** **3-4 hours**  

---

# ⏳ Development Timeline

| **Timeframe** | **Goal** | **Who's Responsible?** |
|-------------|----------------|------------------|
| **Hours 4-10 (Next 6 Hours)** | ✅ **Finish Login & Authentication** ✅ **Start AI Chatbot (Tenant Rights Q&A)** | 🔥 Faiz (Backend), 🔥 Shomaain (UI), 🔥 Fawaz (AI) |
| **Hours 10-16 (Next 6 Hours)** | ✅ **Complete Case Builder UI** ✅ **Finish AI Chatbot Responses** | 🔥 Shomaain (UI), 🔥 Talha (Database), 🔥 Faiz (Integration) |
| **Hours 16-22 (Next 6 Hours)** | ✅ **Build AI Legal Violation Detector & Document Generator** | 🔥 Fawaz (AI), 🔥 Faiz (Frontend), 🔥 Shomaain (UI) |
| **Hours 22-30 (Next 6 Hours)** | ✅ **Refine UI & Test AI Outputs** ✅ **Implement Notifications & Emails** | 🔥 Full Team Testing |
| **Hours 30-36 (Final 6 Hours)** | ✅ **Final Debugging & Polish UI** ✅ **Submit Demo Video & Presentation** | 🔥 Full Team |

---

# 🎯 Final Pitch (For Judges)
*"Many Canadian tenants face rental disputes but struggle to access affordable legal support. TenantShield is an AI-powered legal assistant that helps tenants understand their rights, track disputes, and generate legal documents to protect themselves. By using AI to simplify legal processes, TenantShield empowers Canadians to navigate landlord-tenant conflicts with confidence."*

---

## Create New Branch 

```bash
git checkout -b {your-name/feature}
git add .
git commit -m "New Feature"
git push --set-upstream origin '{your-name/feature}'
git checkout main
```