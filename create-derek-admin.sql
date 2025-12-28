-- Create site admin user: derek / admin
-- Run this in Supabase SQL Editor

-- First, make sure site_admin table exists
CREATE TABLE IF NOT EXISTS site_admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create or update the derek admin user
-- Password hash for "admin" is: $2b$10$Ogi3eJ6SP/CXnkZLm9SfDuoAa9Nj/ocS4Qm0BFiY95DOLArZMxHLW
INSERT INTO site_admin (username, password_hash)
VALUES (
  'derek',
  '$2b$10$Ogi3eJ6SP/CXnkZLm9SfDuoAa9Nj/ocS4Qm0BFiY95DOLArZMxHLW' -- bcrypt hash for "admin"
)
ON CONFLICT (username) 
DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Verify it was created
SELECT 'Admin user created!' as status, username, created_at FROM site_admin WHERE username = 'derek';

