-- BrainBarter Database Schema
-- Run these commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  college TEXT,
  course TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'creator', 'admin')),
  token_balance INTEGER DEFAULT 100 CHECK (token_balance >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contents table
CREATE TABLE IF NOT EXISTS contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'pdf', 'notes')),
  storage_url TEXT NOT NULL,
  price_tokens INTEGER NOT NULL CHECK (price_tokens > 0),
  rating FLOAT DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES contents(id) ON DELETE CASCADE,
  tokens_spent INTEGER NOT NULL CHECK (tokens_spent > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- Earnings table
CREATE TABLE IF NOT EXISTS earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES contents(id) ON DELETE CASCADE,
  tokens_earned INTEGER NOT NULL CHECK (tokens_earned > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exam inputs table
CREATE TABLE IF NOT EXISTS exam_inputs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  syllabus_url TEXT,
  past_papers_url TEXT,
  predicted_topics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_contents_creator ON contents(creator_id);
CREATE INDEX IF NOT EXISTS idx_contents_subject ON contents(subject);
CREATE INDEX IF NOT EXISTS idx_contents_topic ON contents(topic);
CREATE INDEX IF NOT EXISTS idx_contents_type ON contents(content_type);
CREATE INDEX IF NOT EXISTS idx_purchases_user ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_content ON purchases(content_id);
CREATE INDEX IF NOT EXISTS idx_earnings_creator ON earnings(creator_id);
CREATE INDEX IF NOT EXISTS idx_earnings_content ON earnings(content_id);
CREATE INDEX IF NOT EXISTS idx_exam_inputs_user ON exam_inputs(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contents_updated_at BEFORE UPDATE ON contents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_inputs ENABLE ROW LEVEL SECURITY;

-- Users: Can read own profile, service role can do anything
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage users" ON users
  FOR ALL USING (true);

-- Contents: Everyone can read, only creators can create
CREATE POLICY "Anyone can read contents" ON contents
  FOR SELECT USING (true);

CREATE POLICY "Creators can insert contents" ON contents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Creators can update own contents" ON contents
  FOR UPDATE USING (true);

-- Purchases: Users can read own purchases
CREATE POLICY "Users can read own purchases" ON purchases
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage purchases" ON purchases
  FOR ALL USING (true);

-- Earnings: Creators can read own earnings
CREATE POLICY "Creators can read own earnings" ON earnings
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage earnings" ON earnings
  FOR ALL USING (true);

-- Exam inputs: Users can read own exam inputs
CREATE POLICY "Users can read own exam inputs" ON exam_inputs
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage exam inputs" ON exam_inputs
  FOR ALL USING (true);

-- Create view for content statistics
CREATE OR REPLACE VIEW content_stats AS
SELECT 
  c.id,
  c.title,
  c.creator_id,
  u.name as creator_name,
  c.price_tokens,
  c.rating,
  c.view_count,
  COUNT(DISTINCT p.id) as purchase_count,
  COALESCE(SUM(e.tokens_earned), 0) as total_earnings
FROM contents c
LEFT JOIN users u ON c.creator_id = u.id
LEFT JOIN purchases p ON c.id = p.content_id
LEFT JOIN earnings e ON c.id = e.content_id
GROUP BY c.id, u.name;

-- Function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
  total_purchases INTEGER,
  total_spent INTEGER,
  total_earnings INTEGER,
  content_created INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*)::INTEGER FROM purchases WHERE user_id = user_uuid),
    (SELECT COALESCE(SUM(tokens_spent), 0)::INTEGER FROM purchases WHERE user_id = user_uuid),
    (SELECT COALESCE(SUM(tokens_earned), 0)::INTEGER FROM earnings WHERE creator_id = user_uuid),
    (SELECT COUNT(*)::INTEGER FROM contents WHERE creator_id = user_uuid);
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE users IS 'Stores user profiles and authentication data';
COMMENT ON TABLE contents IS 'Stores educational content metadata';
COMMENT ON TABLE purchases IS 'Tracks content purchases by users';
COMMENT ON TABLE earnings IS 'Tracks creator earnings from content sales';
COMMENT ON TABLE exam_inputs IS 'Stores uploaded exam files and predictions';
