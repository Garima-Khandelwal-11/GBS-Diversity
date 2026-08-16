# 👩‍💻 Women in Tech Career Mentorship Platform – MentHer

## 🌟 Overview

**MentHer** is an AI-powered platform designed to connect women in tech with suitable mentors based on their skills, career goals, and interests. It provides personalized career resources, progress tracking, and secure communication – all with the mission of fostering **gender diversity in technology**.
🛠 Built during the **Standard Chartered Diversity Hackathon 2025**.

---

## 🚩 Problem Statement

There’s a growing need for personalized mentorship among women in tech. MentHer addresses this by:

* Connecting mentees with ideal mentors using AI.
* Providing structured, personalized learning resources.
* Offering a safe, inclusive, and empowering environment.

---

## 🔑 Features

### 🖥️ User Experience

* **Responsive Design** for all screen sizes.
* **Intuitive Navigation** for smooth user flow.

### 📊 Dashboard

* Personalized mentorship overview.
* Real-time match score (scaled 1-5).
* Upcoming session tracker.
* Recently accessed resources.
* Mentee satisfaction ratings.

### 👥 User Profiles

* Custom profiles (mentor/mentee).
* Predefined choices for:

  * **Career Goals:** e.g., Data Scientist, AI Engineer, etc.
  * **Skills:** Python, React, SQL, etc.
  * **Interests:** AI, Web Dev, Cybersecurity, etc.
* Progress timeline of mentorship.

### 🤝 Mentor Matching System

* **AI-Powered Matching** using Cosine Similarity.
* Weighted profile encoding (Career Goals > Skills > Interests).
* Mentor profiles with expertise & background.
* One-click mentorship requests + email integration.

### 📚 Learning Resources

* Curated articles, courses & webinars.
* AI-based personalized recommendations.
* Bookmarking & difficulty-level filtering.

### 💬 Chatbot Integration

* GenAI-powered chatbot (Google Gemini API) for platform assistance and mentorship/career Q&A.
* Floating chat widget available on every page; backend endpoint at `POST /chatbot`.

### 🔐 Security & Privacy

* Google Sign-In (OAuth 2.0) for existing accounts, plus Email/JWT authentication for signup and login.
* TOTP-based 2FA (compatible with Google Authenticator, Authy, etc.) — optional, enabled per-account from Settings → Security.
* Secure password hashing.
* Role-based data visibility.

> SSL/TLS is listed as future work (a deployment/infra concern, not an app feature) — see [Future Enhancements](#-future-enhancements).

---

## ⚙️ Technical Stack

### 🔸 Frontend

* HTML5, CSS3, JavaScript
* **React.js**, **Tailwind CSS**

### 🔹 Backend

* **Node.js**, **Express.js**
* **MongoDB** (NoSQL database)

### 🧠 AI/ML Integration

* **Python**, **Scikit-learn** for Cosine Similarity
* NLP libraries for parsing text-based profile data

### 🔐 Authentication & Security

* **OAuth 2.0** (Google Sign-In), **JWT**
* Secure password hashing

---

## 🧮 AI Matching Algorithm (Cosine Similarity)

### 📌 Matching Logic:

1. **Feature Vector** created from:

   * Career Goal (5 pts)
   * Skills (3 pts)
   * Interests (2 pts)

2. **Cosine Similarity**:

   ```
   Cosine Similarity = (A · B) / (||A|| * ||B||)
   ```

   * Scores are scaled from **0–1** to **1–5** for display.
   * Top matches are sorted & recommended to the mentee.

### 📌 Why Cosine Similarity?

* Handles high-dimensional, categorical, and weighted data.
* Scalable and lightweight for real-time matching.
* No need for pre-training or historical data.

### ❌ Alternatives Considered:

| Method              | Why Not Used?                                |
| ------------------- | -------------------------------------------- |
| Jaccard Similarity  | Doesn't support weights                      |
| Pearson Correlation | Suited for numeric-only data                 |
| ML Models           | Require training data or heavy preprocessing |

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js (v14+)
* npm / yarn
* MongoDB

### 🛠 Installation

```bash
# Clone the repo
git clone https://github.com/<your-username>/GBS-Diversity.git

# Frontend Setup
cd GSB-Diversity/client
npm install   # or yarn install

# Backend Setup
cd ../server
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the backend root. Include:

```
DATABASE_URL=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_oauth_client_id   # create at https://console.cloud.google.com/apis/credentials
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
GEMINI_API_KEY=your_gemini_api_key   # free key: https://aistudio.google.com/apikey
GEMINI_MODEL=gemini-2.5-flash        # optional, defaults to gemini-2.5-flash
```

See `Server/.env.example` for the full list of variables the backend actually reads.

The frontend also needs the same Google OAuth client ID in `Client/.env`:

```
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

> Note: Google Sign-In currently only works for **existing accounts** (sign up with email/password first, then Google login works on return visits). A brand-new account can't be created via Google alone yet, since the signup form also collects role, skills, and career goals that Google doesn't provide.

### ▶️ Run the App

```bash
# Backend
cd server
npm start

# Frontend
cd ../client
npm run dev
```

App runs at `http://localhost:3000`

---

## 🚀 Deployment

The app is three separate services, all deployable on free tiers: the React frontend (Vercel), the Node/Express API (Render), and the Python matching microservice (Render). `render.yaml` and `Client/vercel.json` in this repo drive the Render and Vercel configs respectively — you still need to create the accounts and paste in secrets yourself, since those steps require your own login.

### 1. Database — MongoDB Atlas

* [cloud.mongodb.com](https://cloud.mongodb.com) → create a free **M0** cluster → get the connection string. This is your `DATABASE_URL`.

### 2. Google OAuth client

* [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) → create an OAuth 2.0 Client ID (Web application). You'll add your deployed frontend URL to **Authorized JavaScript origins** once it exists (step 6).

### 3. Gemini API key (chatbot)

* [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → free key for `GEMINI_API_KEY`.

### 4. Backend + matcher — Render

* [render.com](https://render.com) → **New → Blueprint** → connect this repo. Render reads `render.yaml` and creates two services: `gbs-diversity-backend` (Node) and `gbs-diversity-matcher` (Python/Flask).
* When prompted for env vars, provide: `DATABASE_URL`, `GOOGLE_CLIENT_ID`, `GEMINI_API_KEY`, `SENDGRID_API_KEY`, and random strings for `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` / `RESET_TOKEN_SECRET`.
* Leave `CORS_ORIGIN` and `MATCHER_SERVICE_URL` blank for now — they're filled in during step 6.

### 5. Frontend — Vercel

* [vercel.com](https://vercel.com) → **New Project** → import this repo.
* Set **Root Directory to `Client`** (Vercel won't detect this automatically in a monorepo).
* Add env vars `VITE_SERVER_BASE_URL` (the Render backend's URL) and `VITE_GOOGLE_CLIENT_ID`.
* Deploy. `Client/vercel.json` handles SPA rewrites so client-side routes (`/profile`, `/settings`, etc.) don't 404 on refresh.

### 6. Wire the three services together

Once both Render services and the Vercel deploy are live:

* On Render, set the backend's `CORS_ORIGIN` to your Vercel URL, and `MATCHER_SERVICE_URL` to `https://<matcher-service>.onrender.com/match` — then redeploy the backend.
* On Google Cloud Console, add your Vercel URL to the OAuth client's **Authorized JavaScript origins**, or Google Sign-In will be rejected by the browser.

### ⚠️ Free-tier caveat

Render's free web services spin down after ~15 minutes idle and take 30–50 seconds to wake on the next request. If you're sharing this link (e.g. on a resume), the first load after idle time will look slow/broken for that one request — it's not a bug, just the free tier.

---

## 👩‍🎓 Usage

### For Mentees

* Create profile with predefined goals, skills, interests.
* View AI-suggested mentors.
* Send mentorship requests.
* Access personalized resources.
* Track your journey.

### For Mentors

* Sign up and set up a detailed profile.
* Review and accept mentee requests.
* Suggest resources and track mentee progress.

---

## 🤝 Contributing

We love contributions!

1. Fork the repo
2. Create a new branch
   `git checkout -b feature/your-feature-name`
3. Commit your changes
   `git commit -m "feat: Add new feature"`
4. Push your branch
   `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 🌱 Future Enhancements

* 🔒 SSL/TLS termination in production deployment
* 🔗 In-app video conferencing
* 📈 Advanced career analytics
* 🌐 Community forum for peer support
* 🧑‍💼 Mentor verification & rating system
* 🎨 UI theme customization
* 🔐 Role verification using company email OTP
* ⚙️ Dedicated settings & privacy controls
* 🧾 “About Us” informational page

---


