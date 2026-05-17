# 🚀 Ritika Jha — Portfolio

A modern, responsive, full-stack portfolio built with **React.js + Tailwind CSS**, **Node.js + Express.js**, and **MongoDB**.

---

## 📁 Project Structure

```
ritika-portfolio/
├── portfolio.html          # Standalone portfolio (open directly in browser)
├── backend/                # Node.js + Express API
│   ├── server.js
│   ├── models/Contact.js
│   ├── routes/contact.js
│   ├── routes/projects.js
│   ├── routes/resume.js
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start

### Option 1: Just open the HTML (no setup needed)
Open `portfolio.html` directly in your browser. Everything is self-contained!

### Option 2: Full Stack with Backend

**Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and email credentials
npm run dev
```

**API Endpoints:**
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/health | Health check |
| POST | /api/contact | Submit contact form (saves to MongoDB) |
| GET | /api/contact | Get all messages |
| GET | /api/projects | Get all projects |
| GET | /api/resume/download | Download resume PDF |

---

## 🎨 Features
- ✅ Dark / Light mode toggle
- ✅ Smooth scroll animations & reveal effects
- ✅ Responsive for all screen sizes
- ✅ Floating profile photo with animated rings
- ✅ Animated skill bars
- ✅ Contact form with validation
- ✅ MongoDB contact message storage
- ✅ Email notification on form submit
- ✅ Resume download endpoint

---

## 📦 MongoDB Schema

**Contact Message:**
```json
{
  "name": "String (required)",
  "email": "String (required)",
  "subject": "String",
  "message": "String (required)",
  "isRead": "Boolean",
  "ipAddress": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 🌐 Deployment

**Frontend (Netlify / Vercel):**
- Upload `portfolio.html` or deploy the React build
- Set `REACT_APP_API_URL` env variable to your backend URL

**Backend (Railway / Render / Heroku):**
```bash
# Set environment variables:
MONGO_URI=your_mongodb_atlas_uri
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://yourportfolio.com
```

**MongoDB Atlas (Cloud DB):**
1. Create free account at mongodb.com/atlas
2. Create cluster → Get connection string
3. Paste into `MONGO_URI` in .env

---

## 👤 Contact
**Ritika Jha** | SKFGI · MAKAUT University · Howrah, Kolkata, WB
- LinkedIn: linkedin.com/in/ritikajha  
- GitHub: github.com/ritikajha
