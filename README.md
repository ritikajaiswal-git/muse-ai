# 🚀 Muse AI

Muse AI is a full-stack AI-powered SaaS web application that helps users generate content, enhance images, and automate creative tasks using modern AI APIs.

---

## ✨ Features

### 🧠 AI Content Generation

* Generate high-quality articles based on any topic
* Create engaging blog titles instantly

### 🖼️ Image Processing

* AI-based image generation from text prompts
* Background removal using AI

### 🔒 Premium Features

* Resume Analyzer (AI-powered feedback system)
* Object Removal from images
* Advanced AI image generation

### 🔐 Authentication

* Secure user authentication using Clerk
* User-specific history tracking

### 📊 Dashboard

* Tracks user activity and generated content
* Stores history using MongoDB

---

## ⚙️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Clerk Authentication

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### AI Integrations

* OpenRouter API → Text generation
* Hugging Face → Image generation
* Remove.bg API → Background removal

---

## 🛠️ Key Implementations

* Designed a modular full-stack architecture (frontend + backend separation)
* Integrated multiple AI APIs with fallback handling
* Implemented authentication and protected routes using Clerk
* Built premium feature gating for SaaS simulation
* Optimized API calls with error handling and response validation
* Created reusable UI components using Tailwind CSS

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/muse-ai.git
cd muse-ai
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create `.env` in backend:

```env
OPENROUTER_API_KEY=your_key
HF_API_KEY=your_key
MONGO_URI=your_mongo_url
CLERK_SECRET_KEY=your_key
CLERK_PUBLISHABLE_KEY=your_key
REMOVE_BG_API_KEY=your_key
```

---

## 💡 Notes

* Premium features are intentionally restricted to simulate SaaS behavior
* Resume analyzer works best with text-based resumes
* Image generation APIs may have limitations on free tier

---

## 📌 Author

Ritika Jaiswal

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
