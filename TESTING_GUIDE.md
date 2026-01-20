# 🧪 BrainBarter - Testing Guide

## ✅ System Status: FULLY OPERATIONAL

**Backend:** ✅ Running on http://localhost:5000  
**Frontend:** ✅ Running on http://localhost:5173  
**Database:** ✅ Supabase configured and ready  
**Authentication:** ✅ Clerk integrated

---

## 🎯 Step-by-Step Testing Workflow

### Phase 1: Basic Authentication (5 minutes)

#### Test 1: User Registration
1. Open your browser to: **http://localhost:5173**
2. Click **"Sign Up"** button
3. Create account with Clerk (use real email or test email)
4. You should be redirected to homepage
5. Check top-right corner - should see your profile picture/name

**Expected Result:**
- ✅ User created in Clerk
- ✅ User auto-created in Supabase `users` table
- ✅ Initial token balance: 100 tokens
- ✅ Default role: student

**How to Verify:**
- Go to Supabase Dashboard → Table Editor → `users` table
- You should see your new user with `token_balance = 100`

#### Test 2: Logout & Login
1. Click on your profile → Sign Out
2. Click "Login" button
3. Sign in with same credentials
4. Should be logged in again

**Expected Result:**
- ✅ Session persisted
- ✅ Token balance maintained

---

### Phase 2: Creator Onboarding (5 minutes)

#### Test 3: Switch to Creator Role
1. Log in as a user
2. Navigate to Creator Dashboard (you may need to add this route)
3. Or manually update in Supabase:
   - Go to Supabase → Table Editor → `users`
   - Find your user
   - Change `role` from `student` to `creator`
   - Save

**Expected Result:**
- ✅ Role changed to creator

---

### Phase 3: Content Upload (10 minutes)

#### Test 4: Upload Video Content
**Prerequisites:** Must be logged in as creator

**API Endpoint:** `POST http://localhost:5000/api/content/upload`

**Test via Browser Console:**
```javascript
// Open browser console (F12) on http://localhost:5173
const formData = new FormData();
formData.append('title', 'Introduction to React Hooks');
formData.append('subject', 'Computer Science');
formData.append('topic', 'React.js');
formData.append('description', 'Learn useState and useEffect');
formData.append('content_type', 'video');
formData.append('price_tokens', '50');
// Note: For real test, you'd need to add a file
// formData.append('content', fileInput.files[0]);

// Get Clerk token and make request
const token = await window.Clerk.session.getToken();
const response = await fetch('http://localhost:5000/api/content/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
const result = await response.json();
console.log(result);
```

**Expected Result:**
- ✅ Content created in `contents` table
- ✅ File uploaded to Supabase Storage bucket
- ✅ Returns content ID

**Troubleshooting:**
- If 401 error: Check Clerk session token
- If 500 error: Check backend logs
- If storage error: Verify buckets exist in Supabase

---

### Phase 4: Content Discovery (5 minutes)

#### Test 5: Get Content Recommendations
**API Endpoint:** `GET http://localhost:5000/api/content/recommendations`

**Test via Browser Console:**
```javascript
const token = await window.Clerk.session.getToken();
const response = await fetch('http://localhost:5000/api/content/recommendations?subject=Computer%20Science', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const content = await response.json();
console.log('Recommended Content:', content);
```

**Expected Result:**
- ✅ Returns array of content items
- ✅ Filtered by subject if provided

---

### Phase 5: Token Economy (10 minutes)

#### Test 6: Purchase Content
**Prerequisites:** 
- Must be logged in as student (not creator)
- Must have sufficient token balance
- Content must exist in database

**Test via Browser Console:**
```javascript
// Get content ID from database or previous test
const contentId = 'YOUR_CONTENT_ID_HERE';

const token = await window.Clerk.session.getToken();
const response = await fetch(`http://localhost:5000/api/content/${contentId}/unlock`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
const result = await response.json();
console.log('Purchase Result:', result);
```

**Expected Results:**
If content costs 100 tokens:
- ✅ Student balance: -100 tokens
- ✅ Creator balance: +60 tokens (60%)
- ✅ Platform earnings: +15 tokens (15%)
- ✅ AI pool: +25 tokens (25%)
- ✅ New row in `purchases` table
- ✅ New row in `earnings` table

**How to Verify:**
1. Supabase → Table Editor → `users` → Check balances
2. Supabase → Table Editor → `purchases` → Should see new purchase
3. Supabase → Table Editor → `earnings` → Should see creator earning

---

### Phase 6: Wallet Features (5 minutes)

#### Test 7: Check Token Balance
```javascript
const token = await window.Clerk.session.getToken();
const response = await fetch('http://localhost:5000/api/wallet/balance', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const balance = await response.json();
console.log('Token Balance:', balance);
```

**Expected Result:**
- ✅ Returns current token balance
- ✅ Matches database value

#### Test 8: View Transaction History
```javascript
const token = await window.Clerk.session.getToken();
const response = await fetch('http://localhost:5000/api/wallet/transactions', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const transactions = await response.json();
console.log('Transactions:', transactions);
```

**Expected Result:**
- ✅ Returns array of all purchases/earnings
- ✅ Includes timestamps and amounts

---

### Phase 7: Exam AI Features (10 minutes)

#### Test 9: Upload Exam Syllabus
**API Endpoint:** `POST http://localhost:5000/api/exam/upload`

**Test via Browser Console:**
```javascript
// You'll need to create file input first
const formData = new FormData();
formData.append('subject', 'Data Structures');
formData.append('exam_date', '2026-02-15');
// formData.append('syllabus', fileInput.files[0]); // PDF file

const token = await window.Clerk.session.getToken();
const response = await fetch('http://localhost:5000/api/exam/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
const result = await response.json();
console.log('Exam Upload:', result);
```

**Expected Result:**
- ✅ File uploaded to `exam-files` bucket
- ✅ Record created in `exam_inputs` table

#### Test 10: AI Topic Prediction
**Prerequisites:** OPENAI_API_KEY must be set in backend/.env

```javascript
const examId = 'YOUR_EXAM_ID_HERE';

const token = await window.Clerk.session.getToken();
const response = await fetch('http://localhost:5000/api/exam/predict', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    exam_id: examId
  })
});
const predictions = await response.json();
console.log('AI Predictions:', predictions);
```

**Expected Result:**
- ✅ Returns predicted exam topics
- ✅ Returns recommended study content

**Note:** If OPENAI_API_KEY not set, this will return mock data or error

---

## 🔍 Debugging Tips

### Check Backend Logs
Backend terminal shows all incoming requests:
```
POST /api/content/upload - Status: 201
GET /api/content/recommendations - Status: 200
POST /api/content/:id/unlock - Status: 200
```

### Check Browser Console
Press F12 → Console tab to see:
- API request/response
- Authentication errors
- Network errors

### Check Supabase Logs
Supabase Dashboard → Logs → View real-time database queries

### Common Issues

#### 401 Unauthorized Error
**Cause:** Clerk token invalid or expired  
**Fix:** 
1. Refresh page
2. Logout and login again
3. Check Clerk dashboard for user status

#### 500 Internal Server Error
**Cause:** Database query failed  
**Fix:**
1. Check backend terminal for error details
2. Verify database tables exist
3. Check Supabase RLS policies

#### CORS Error
**Cause:** Frontend/backend URL mismatch  
**Fix:**
1. Verify `FRONTEND_URL=http://localhost:5173` in backend/.env
2. Verify `VITE_API_URL=http://localhost:5000/api` in frontend/.env
3. Restart backend server

#### File Upload Error
**Cause:** Storage bucket doesn't exist  
**Fix:**
1. Go to Supabase → Storage
2. Verify buckets exist: `videos`, `notes`, `exam-files`
3. Check bucket policies allow authenticated uploads

---

## 📊 Expected Database State After Full Test

### `users` Table
```
| id | clerk_user_id | name | role | token_balance |
|----|---------------|------|------|---------------|
| 1  | user_xxx      | Test | student | 0 (spent 100) |
| 2  | user_yyy      | Creator | creator | 160 (100 initial + 60 earned) |
```

### `contents` Table
```
| id | creator_id | title | subject | price_tokens | view_count |
|----|------------|-------|---------|--------------|------------|
| 1  | 2          | Intro to React | CS | 100 | 1 |
```

### `purchases` Table
```
| id | user_id | content_id | tokens_spent |
|----|---------|------------|--------------|
| 1  | 1       | 1          | 100          |
```

### `earnings` Table
```
| id | creator_id | content_id | amount | earning_type |
|----|------------|------------|--------|--------------|
| 1  | 2          | 1          | 60     | content_sale |
```

---

## 🎯 Success Criteria

Your platform is working correctly if:

✅ Users can sign up via Clerk  
✅ Users auto-created in Supabase with 100 tokens  
✅ Creators can upload content  
✅ Students can browse content  
✅ Token purchases work correctly  
✅ Token distribution follows 60/15/25 rule  
✅ All database tables updating correctly  
✅ File uploads work to Supabase Storage  
✅ Wallet balance reflects transactions  

---

## 🚀 Next Steps After Testing

1. **Build Creator Upload UI** - Create form for content upload
2. **Build Content Browse Page** - Display available content
3. **Build Wallet Dashboard** - Show balance & transactions
4. **Add Loading States** - Show spinners during API calls
5. **Add Error Handling** - Toast notifications for errors
6. **Add Success Messages** - Confirm actions to users
7. **Polish UI/UX** - Improve design and animations
8. **Add Analytics** - Track user behavior
9. **Optimize Performance** - Add caching, lazy loading
10. **Deploy to Production** - Vercel (frontend) + Railway (backend)

---

## 📞 Quick Commands Reference

**Start Backend:**
```powershell
cd d:\project\BrainBarter\backend
node src/server.js
```

**Start Frontend:**
```powershell
cd d:\project\BrainBarter\frontend
npm run dev
```

**Check Health:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

**View Backend Logs:**
Check terminal where backend is running

**Stop Servers:**
Press `Ctrl+C` in respective terminals

---

**Happy Testing! 🎉**
