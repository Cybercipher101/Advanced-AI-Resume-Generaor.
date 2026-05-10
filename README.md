# 🌟 Advanced AI Resume Generator

![Resume Generator Banner](https://via.placeholder.com/1200x300/3b82f6/ffffff?text=Advanced+AI+Resume+Generator)

An incredibly powerful, state-of-the-art web application that leverages conversational AI to help you build **ATS-Compliant, visually stunning** resumes in minutes. Bridging the gap between intelligent automation and fine-grained manual control.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Career Coach** | An interactive chatbot that asks targeted, one-by-one questions to extract your best professional qualities. |
| ⚡ **Real-Time ATS Feedback** | As you edit your resume, the AI silently analyzes it in the background to suggest keyword improvements. |
| 📝 **Tabbed Manual Entry** | Seamlessly switch between talking to the AI and manually filling out your details in a traditional form. |
| 🎨 **Dynamic Glassmorphism UI** | A highly aesthetic, light, and vibrant interface allowing you to preview your resume in real-time. |
| 🖨️ **True Vector PDF Export** | Download your resume directly as a perfect, text-selectable PDF that passes ATS scanners with flying colors. |
| 🔒 **Enterprise Security** | Built on Supabase with strict Row-Level Security (RLS) to ensure your data is entirely private. |

---

## 🚀 The Technology Stack

- **Frontend:** Next.js 15 (App Router), React, Vanilla CSS (Custom Design System)
- **Backend & Database:** Supabase (PostgreSQL) + pgvector
- **AI Integration:** Google Gemini 2.5 Flash API (`@google/genai`)
- **PDF Export Engine:** `html2pdf.js`
- **Deployment:** Vercel

---

## 🛠️ Getting Started (Local Development)

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd resume-generator
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

GEMINI_API_KEY=your_gemini_api_key
```

### 3. Database Setup
Run the included `supabase.sql` file in your Supabase SQL Editor to instantly create the required tables and security policies.

### 4. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to meet your new AI Career Coach!

---
*Built with ❤️ for job seekers globally.*
