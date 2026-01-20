# BrainBarter Backend

Production-ready backend for the BrainBarter AI-powered learning platform.

## 🚀 Tech Stack

- **Node.js** (Latest LTS)
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database & storage
- **Clerk** - Authentication
- **OpenAI** - AI-powered exam predictions (optional)
- **Multer** - File uploads

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── supabase.js        # Supabase client setup
│   │   └── clerk.js           # Clerk authentication setup
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── roleMiddleware.js  # Role-based access control
│   ├── routes/
│   │   ├── user.routes.js     # User endpoints
│   │   ├── content.routes.js  # Content management
│   │   ├── exam.routes.js     # Exam mode features
│   │   └── wallet.routes.js   # Token economy
│   ├── controllers/           # Request handlers
│   ├── services/              # Business logic
│   │   ├── supabase.service.js
│   │   └── ai.service.js
│   ├── utils/                 # Helper functions
│   └── constants/             # App constants
├── .env                       # Environment variables
├── .env.example              # Environment template
├── package.json
└── README.md
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `CLERK_SECRET_KEY` - From Clerk dashboard
- `SUPABASE_URL` - From Supabase project
- `SUPABASE_ANON_KEY` - From Supabase project
- `SUPABASE_SERVICE_ROLE_KEY` - From Supabase project
- `OPENAI_API_KEY` - (Optional) For AI features

### 3. Setup Supabase Database

Run these SQL commands in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  college TEXT,
  course TEXT,
  role TEXT DEFAULT 'student',
  token_balance INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contents table
CREATE TABLE contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  price_tokens INTEGER NOT NULL,
  rating FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Purchases table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  content_id UUID REFERENCES contents(id),
  tokens_spent INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Earnings table
CREATE TABLE earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id),
  content_id UUID REFERENCES contents(id),
  tokens_earned INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Exam inputs table
CREATE TABLE exam_inputs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  syllabus_url TEXT,
  past_papers_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX idx_contents_creator ON contents(creator_id);
CREATE INDEX idx_purchases_user ON purchases(user_id);
CREATE INDEX idx_earnings_creator ON earnings(creator_id);
```

### 4. Setup Supabase Storage Buckets

Create these storage buckets in Supabase:
- `videos`
- `notes`
- `exam-files`

Configure bucket policies to require authentication.

### 5. Run the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /health
```

### User
```
GET  /api/user/profile        # Get user profile
POST /api/user/onboard        # Complete onboarding
```

### Content
```
POST /api/content/upload      # Upload content (Creator only)
GET  /api/content/recommendations  # Get recommended content
GET  /api/content/:id         # Get content details
POST /api/content/unlock      # Purchase content
```

### Exam Mode
```
POST /api/exam/upload         # Upload syllabus & papers
POST /api/exam/predict-topics # AI topic prediction
GET  /api/exam/recommended-content  # Get content for topics
```

### Wallet
```
GET  /api/wallet/balance      # Get token balance
POST /api/wallet/spend        # Spend tokens
GET  /api/wallet/transactions # Transaction history
```

## 🔒 Authentication

All endpoints (except `/health` and `/`) require Clerk JWT token in Authorization header:

```
Authorization: Bearer <clerk_jwt_token>
```

## 🪙 Token Economy

When content is purchased:
- **60%** → Creator
- **15%** → Platform
- **25%** → AI Pool

## 🚀 Deployment

### Deploy to Render

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add all environment variables from `.env.example`

### Environment Variables on Render

Make sure to add all variables from `.env.example` in your Render dashboard.

## 🧪 Testing

Test the API health:
```bash
curl http://localhost:5000/health
```

## 📝 Notes

- All file uploads are handled via Supabase Storage
- Content access URLs are signed and expire after 2 hours
- User token balance is updated automatically on purchases
- AI features require OpenAI API key (optional)

## 🤝 Contributing

This is a production-ready backend built for the BrainBarter learning platform.

## 📄 License

MIT
