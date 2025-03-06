/*
  # Create profiles trigger for user signup

  1. Changes
    - Add trigger function to automatically create profile on user signup
    - Update profiles table policies for better security

  2. Security
    - Enable RLS on profiles table
    - Add policies for profile management
    - Ensure secure user data handling
*/

-- Create trigger function to handle new user signup
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

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update profiles table policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read any profile
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
TO public
USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO public
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow profile creation only through the trigger
CREATE POLICY "Profiles can only be created by trigger"
ON public.profiles FOR INSERT
TO public
WITH CHECK (false);