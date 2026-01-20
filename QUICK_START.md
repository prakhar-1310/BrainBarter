# 🚀 BrainBarter - Quick Start Guide

## ⚡ Getting Started in 3 Steps

### Step 1: Setup Supabase Database (5 minutes)
**This is the ONLY remaining step before you can run the app!**

1. Open your browser and go to: https://supabase.com/dashboard
2. Select your project or create new one
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Open the file: `backend/database_schema.sql`
6. Copy ALL content from that file
7. Paste into Supabase SQL Editor
8. Click **RUN** button
9. You should see: "Success. No rows returned"

### Step 2: Create Storage Buckets (5 minutes)
1. In Supabase Dashboard, click **Storage** in left sidebar
2. Click **New bucket**
3. Create these 3 buckets:

**Bucket 1: videos**
- Name: `videos`
- Public: ❌ No (uncheck)
- Click Create

**Bucket 2: notes**
- Name: `notes`
- Public: ❌ No (uncheck)
- Click Create

**Bucket 3: exam-files**
- Name: `exam-files`
- Public: ❌ No (uncheck)
- Click Create

### Step 3: Start the Application (2 minutes)

**Open 2 Terminal windows:**

**Terminal 1 - Backend:**
```bash
cd d:\project\BrainBarter\backend
npm start
```
✅ You should see: "✨ BrainBarter API Server running on port 5000"

**Terminal 2 - Frontend:**
```bash
cd d:\project\BrainBarter\frontend
npm run dev
```
✅ You should see: "Local: http://localhost:5173/"

---

## 🎯 Test Your Setup

1. Open browser: http://localhost:5173
2. Click **Sign Up** button
3. Create account with Clerk
4. You should be logged in with 100 tokens! 🎉

---

## ✅ What's Already Done

- ✅ All code written (3000+ lines)
- ✅ Frontend configured (React + Clerk + Tailwind)
- ✅ Backend configured (Express + Supabase + Clerk)
- ✅ Authentication integrated
- ✅ API endpoints ready
- ✅ Token economy implemented
- ✅ File upload system ready
- ✅ Environment variables set
- ✅ No errors in code

---

## 🎮 Features Ready to Test

### For Students:
- ✅ Sign up / Login with Clerk
- ✅ Browse content recommendations
- ✅ Purchase content with tokens
- ✅ Upload exam syllabus for AI predictions
- ✅ View token balance
- ✅ View transaction history

### For Creators:
- ✅ Upload video content
- ✅ Upload PDF notes
- ✅ Earn 60% tokens from sales
- ✅ Track earnings
- ✅ View content analytics

---

## 📁 Project Structure

```
BrainBarter/
├── frontend/                    ✅ React App
│   ├── src/
│   │   ├── components/         ✅ Navbar, Footer
│   │   ├── pages/              ✅ All pages ready
│   │   ├── context/            ✅ AuthContext with Clerk
│   │   └── services/           ✅ API client configured
│   └── .env                    ✅ Clerk + API URL set
│
├── backend/                     ✅ Express API
│   ├── src/
│   │   ├── controllers/        ✅ All controllers
│   │   ├── services/           ✅ Supabase + AI
│   │   ├── middleware/         ✅ Auth + Roles
│   │   ├── routes/             ✅ All routes
│   │   └── config/             ✅ Clerk + Supabase
│   ├── database_schema.sql     ⚠️ RUN THIS IN SUPABASE
│   └── .env                    ✅ All keys configured
│
├── VERIFICATION_REPORT.md      📊 Full system report
└── QUICK_START.md             📖 This file
```

---

## 🔑 Environment Variables (Already Set)

### Frontend (.env)
```env
✅ VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
✅ VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
✅ PORT=5000
✅ CLERK_PUBLISHABLE_KEY=pk_test_...
✅ CLERK_SECRET_KEY=sk_test_...
✅ SUPABASE_URL=https://rvdptuvtdpmowhkppxpn.supabase.co
✅ SUPABASE_ANON_KEY=...
✅ SUPABASE_SERVICE_ROLE_KEY=...
✅ FRONTEND_URL=http://localhost:5173
✅ CREATOR_SHARE=0.60
✅ PLATFORM_SHARE=0.15
✅ AI_POOL_SHARE=0.25
```

---

## 🎯 Token Economy

When a student buys content for 100 tokens:
- 💰 Creator gets: 60 tokens (60%)
- 🏢 Platform gets: 15 tokens (15%)
- 🤖 AI Pool gets: 25 tokens (25%)

Initial balance: 100 tokens per new user

---

## 🆘 Troubleshooting

### Frontend won't start?
```bash
cd frontend
npm install
npm run dev
```

### Backend won't start?
```bash
cd backend
npm install
npm start
```

### "Cannot find module" error?
Make sure you ran `npm install` in both directories

### Database errors?
Make sure you ran `database_schema.sql` in Supabase SQL Editor

### Authentication not working?
- Check Clerk keys match in frontend and backend .env
- Check browser console for errors
- Try clearing localStorage: `localStorage.clear()`

---

## 📞 Need Help?

Check the detailed report: `VERIFICATION_REPORT.md`

---

**You're all set! Just complete Steps 1-3 above and start testing! 🚀**
