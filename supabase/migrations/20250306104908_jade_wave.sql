/*
  # Update profiles table and triggers

  1. Changes
    - Add trigger function to create profiles on user signup
    - Update profiles table policies
    - Drop existing policies to avoid conflicts

  2. Security
    - Enable RLS on profiles table
    - Add policies for profile management
    - Ensure secure user data handling
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles can only be created by trigger" ON public.profiles;

-- Create or replace trigger function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    username,
    phone_number,
    avatar_url,
    is_verified,
    created_at,
    updated_at
  ) VALUES (
    new.id,
    COALESCE((new.raw_user_meta_data->>'username'), 'user_' || substr(new.id::text, 1, 8)),
    COALESCE((new.raw_user_meta_data->>'phone_number'), NULL),
    NULL,
    FALSE,
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO public
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Profiles can only be created by trigger"
ON public.profiles FOR INSERT
TO public
WITH CHECK (false);