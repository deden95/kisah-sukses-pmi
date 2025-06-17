-- =====================================================
-- SETUP DATABASE UNTUK PMI LAMPUNG KISAH SUKSES
-- =====================================================

-- Drop tables if exist (untuk reset)
DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.bookmarks CASCADE;
DROP TABLE IF EXISTS public.drafts CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- 1. Profiles Table
CREATE TABLE public.profiles (
    id uuid NOT NULL,
    updated_at timestamp with time zone NULL,
    username text NULL,
    full_name text NULL,
    avatar_url text NULL,
    website text NULL,
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_username_key UNIQUE (username),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE,
    CONSTRAINT username_length CHECK ((char_length(username) >= 3))
);

-- 2. Categories Table
CREATE TABLE public.categories (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    title text NULL DEFAULT ''::text,
    created_at timestamp with time zone NULL DEFAULT now(),
    slug text NULL,
    CONSTRAINT category_pkey PRIMARY KEY (id),
    CONSTRAINT category_id_key UNIQUE (id),
    CONSTRAINT category_slug_key UNIQUE (slug)
);

-- 3. Posts Table
CREATE TABLE public.posts (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    category_id uuid NULL,
    title text NULL,
    image text NULL,
    description text NULL,
    content text NULL,
    created_at timestamp with time zone NULL DEFAULT now(),
    updated_at timestamp with time zone NULL,
    slug text NULL DEFAULT ''::text,
    author_id uuid NULL,
    published boolean NULL DEFAULT false,
    CONSTRAINT post_pkey PRIMARY KEY (id),
    CONSTRAINT post_id_key UNIQUE (id),
    CONSTRAINT post_slug_key UNIQUE (slug),
    CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES profiles (id) ON DELETE CASCADE,
    CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
);

-- 4. Comments Table
CREATE TABLE public.comments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    comment text NULL DEFAULT ''::text,
    created_at timestamp with time zone NULL DEFAULT now(),
    user_id uuid NULL,
    post_id uuid NULL,
    CONSTRAINT comments_pkey PRIMARY KEY (id),
    CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles (id) ON DELETE CASCADE
);

-- 5. Bookmarks Table
CREATE TABLE public.bookmarks (
    id uuid NOT NULL,
    user_id uuid NULL,
    created_at timestamp with time zone NULL DEFAULT now(),
    CONSTRAINT bookmarks_pkey PRIMARY KEY (id),
    CONSTRAINT bookmarks_id_fkey FOREIGN KEY (id) REFERENCES posts (id) ON DELETE CASCADE,
    CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- 6. Drafts Table
CREATE TABLE public.drafts (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    category_id uuid NULL,
    title text NULL DEFAULT 'Untitled'::text,
    slug text NULL DEFAULT 'untitled'::text,
    image text NULL,
    description text NULL,
    content text NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NULL,
    author_id uuid NULL,
    published boolean NULL DEFAULT false,
    CONSTRAINT drafts_pkey PRIMARY KEY (id),
    CONSTRAINT drafts_author_id_fkey FOREIGN KEY (author_id) REFERENCES profiles (id) ON DELETE CASCADE,
    CONSTRAINT drafts_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE POLICIES
-- =====================================================

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Categories Policies
CREATE POLICY "Categories are viewable by everyone." ON categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert categories." ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update categories." ON categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete categories." ON categories FOR DELETE TO authenticated USING (true);

-- Posts Policies
CREATE POLICY "Published posts are viewable by everyone." ON posts FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authenticated users can insert posts." ON posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own posts." ON posts FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts." ON posts FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- Comments Policies
CREATE POLICY "Comments are viewable by everyone." ON comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert comments." ON comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments." ON comments FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments." ON comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Bookmarks Policies
CREATE POLICY "Users can view own bookmarks." ON bookmarks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks." ON bookmarks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks." ON bookmarks FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Drafts Policies
CREATE POLICY "Users can view own drafts." ON drafts FOR SELECT TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Users can insert own drafts." ON drafts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own drafts." ON drafts FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own drafts." ON drafts FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- =====================================================
-- CREATE TRIGGERS
-- =====================================================

-- Trigger untuk auto-update timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON drafts
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Sample Categories
INSERT INTO public.categories (title, slug) VALUES
('Donor Darah', 'donor-darah'),
('Kemanusiaan', 'kemanusiaan'),
('Bencana Alam', 'bencana-alam'),
('Kesehatan', 'kesehatan'),
('Pendidikan', 'pendidikan');

-- =====================================================
-- STORAGE SETUP
-- =====================================================

-- Storage buckets akan dibuat manual atau via dashboard
-- Buckets yang dibutuhkan:
-- 1. posts
-- 2. cover-image
-- 3. gallery-image
-- 4. profile

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function untuk auto-create profile setelah user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger untuk auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================================================
-- SELESAI!
-- =====================================================

SELECT 'Database setup completed successfully!' as status;

