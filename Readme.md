# SalesInSight 🎯

### AI-Powered Conversation Intelligence for Modern Sales Teams

SalesInSight is a lightweight, AI-driven sales call intelligence platform designed specifically for startups and small sales teams. The platform analyzes raw sales call recordings using multimodal AI and automatically extracts actionable insights such as objection handling, buying intent, competitor mentions, talk ratios, and coaching recommendations.

Built using a modern cloud-native architecture, SalesInSight eliminates the need for expensive enterprise tools like Gong and Chorus.ai by providing affordable AI sales analytics with minimal infrastructure overhead.

---

# 🚀 Features

## 📊 Sales Conversation Analytics

* Talk-to-listen ratio detection
* Conversation dominance analysis
* Rep vs prospect engagement insights

## 🛡️ Objection Detection

Automatically identifies:

* Pricing concerns
* Contract hesitations
* Integration issues
* Approval bottlenecks

## ⚔️ Competitor Intelligence

Detects mentions of:

* Salesforce
* HubSpot
* Zoho
* Other competitors dynamically

## 🩺 Deal Health Scoring

AI-generated deal quality score based on:

* Buying intent
* Engagement quality
* Objections raised
* Prospect responsiveness

## 🧠 AI Coaching Recommendations

Provides post-call coaching such as:

* Asking more discovery questions
* Reducing interruptions
* Improving objection handling

## ☁️ Cloud-Native Audio Pipeline

Uses:

* Cloudinary for media storage
* Google multimodal AI for direct audio understanding

---

# 🏗️ System Architecture

```text
[ React Frontend ]
        │
        ▼
Upload Audio (.mp3/.wav)
        │
        ▼
[ FastAPI Backend ]
        │
        ▼
[ Cloudinary Media Storage ]
        │
        ▼
Secure CDN URL Generated
        │
        ▼
[ Gemini Multimodal AI ]
        │
        ▼
AI Extracts:
- Talk Ratio
- Buying Signals
- Objections
- Competitor Mentions
- Coaching Advice
        │
        ▼
Structured JSON Response
        │
        ▼
[ SQLite Database ]
        │
        ▼
[ React Analytics Dashboard ]
```

---

# 🧠 Why This Project Matters

Modern sales teams generate massive amounts of conversational data every day, but most startups cannot afford enterprise conversation intelligence platforms.

SalesInSight solves this by providing:

* affordable AI sales analytics,
* automated coaching,
* post-call intelligence,
* and performance visibility

without requiring large infrastructure budgets.

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* TailwindCSS
* Recharts
* Framer Motion

## Backend

* FastAPI
* Python
* Uvicorn

## AI & NLP

* Gemini 2.5 Flash
* Google GenAI SDK

## Cloud & Storage

* Cloudinary
* SQLite

## Deployment

* Vercel (Frontend)
* Hugging Face Spaces / Render / Railway (Backend)

---

# 📦 Project Structure

```bash
SalesInSight/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── prompts/
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/lostmoon1513/SalesInSight.git
cd SalesInSight
```

---

# 2️⃣ Backend Setup

Move to backend directory:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 3️⃣ Environment Variables

Create a `.env` file inside backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PORT=8000
```

---

# 4️⃣ Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

# 5️⃣ Frontend Setup

Move to frontend directory:

```bash
cd ../frontend
```

Install node modules:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 📋 Example API Response

```json
{
  "id": "call_001",
  "fileName": "sales_call.mp3",
  "cloudinaryUrl": "https://res.cloudinary.com/demo/video/upload/sample.mp3",
  "timestamp": "2026-05-28T13:24:34Z",
  "metrics": {
    "talkRatioRep": 78,
    "talkRatioProspect": 22,
    "dealHealthScore": 72
  },
  "insights": {
    "objectionMoments": [
      "Customer expressed pricing concerns."
    ],
    "competitorMentions": [
      "HubSpot"
    ],
    "buyingSignals": [
      "Asked about annual pricing."
    ],
    "coachingAdvice": "Allow more discovery questions during the first 10 minutes."
  }
}
```

---

# 📊 Core Metrics

| Metric              | Description                          |
| ------------------- | ------------------------------------ |
| Talk Ratio          | Measures conversational dominance    |
| Buying Signals      | Detects customer purchase intent     |
| Objection Detection | Captures customer concerns           |
| Competitor Mentions | Tracks market competition references |
| Deal Health Score   | Predicts likelihood of conversion    |
| Coaching Advice     | Personalized AI feedback             |

---

# 🎯 MVP Goals

Current MVP includes:

* ✅ Audio Upload
* ✅ Cloudinary Integration
* ✅ Gemini Audio Analysis
* ✅ Structured AI Insights
* ✅ Interactive Dashboard
* ✅ Deal Scoring
* ✅ Coaching Recommendations

---

# 🔮 Future Improvements

* Live call analysis
* CRM integrations
* Slack/Email summaries
* Multi-language support
* AI sales assistant chatbot
* Team leaderboards
* Trend analytics
* Timestamp-based audio playback

---

# 👨‍💻 Team Roles

## Developer A

* Backend Architecture
* FastAPI APIs
* Cloudinary Integration
* Gemini Prompt Engineering
* Database Design

## Developer B

* Frontend Development
* Dashboard UI/UX
* Charts & Visualization
* State Management
* Responsive Design

---

# 🧪 Sample Use Cases

* Startup sales coaching
* Sales performance tracking
* Founder-led sales improvement
* SDR training
* Customer objection analysis
* Competitive intelligence gathering

---

# 📈 Business Value

SalesInSight helps teams:

* reduce call review time,
* improve sales coaching,
* identify missed opportunities,
* and increase conversion efficiency

using AI-powered conversational intelligence.

---

# 🤝 Contributing

Contributions, feature ideas, and improvements are welcome.

```bash
Fork the repo
Create a feature branch
Commit your changes
Open a pull request
```

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Acknowledgements

Built using:

* [FastAPI](https://fastapi.tiangolo.com?utm_source=chatgpt.com)
* [Google Gemini AI](https://ai.google.dev?utm_source=chatgpt.com)
* [Cloudinary](https://cloudinary.com?utm_source=chatgpt.com)
* [React.js](https://react.dev?utm_source=chatgpt.com)
* [TailwindCSS](https://tailwindcss.com?utm_source=chatgpt.com)
* [Recharts](https://recharts.org?utm_source=chatgpt.com)
