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

* Google & Email authentication (OAuth 2.0 + JWT).
* 2FA support.
* Secure password hashing.
* Role-based data visibility.
* SSL/TLS and data encryption.

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

* **OAuth 2.0**, **JWT**
* Secure password hashing
* SSL/TLS encryption

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
MONGO_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key   # free key: https://aistudio.google.com/apikey
GEMINI_MODEL=gemini-2.5-flash        # optional, defaults to gemini-2.5-flash
```

See `Server/.env.example` for the full list of variables the backend actually reads.

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

* 🔗 In-app video conferencing
* 📈 Advanced career analytics
* 🌐 Community forum for peer support
* 🧑‍💼 Mentor verification & rating system
* 🎨 UI theme customization
* 🔐 Role verification using company email OTP
* ⚙️ Dedicated settings & privacy controls
* 🧾 “About Us” informational page

---


