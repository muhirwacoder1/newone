-- =============================================
-- FIX ROLE-BASED PROFILE CREATION TRIGGER
-- =============================================
-- This will ensure profiles are created with the correct role

-- Step 1: Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 2: Create improved profile creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
  user_name TEXT;
  user_phone TEXT;
BEGIN
  -- Extract role from user metadata with better error handling
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'patient');
  user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'New User');
  user_phone := NEW.raw_user_meta_data->>'phone';
  
  -- Log what we're about to insert (for debugging)
  RAISE LOG 'Creating profile for user % with role % and name %', NEW.id, user_role, user_name;
  
  -- Insert profile with extracted data
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    phone,
    is_active,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    user_name,
    user_role,
    user_phone,
    true,
    NOW(),
    NOW()
  );
  
  RAISE LOG 'Profile created successfully for user % with role %', NEW.id, user_role;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Failed to create profile for user %: % (SQLSTATE: %)', NEW.id, SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Test the trigger setup
SELECT 
  'Trigger setup complete' as status,
  EXISTS(
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created'
  ) as trigger_exists;

-- Step 5: Clean up any existing test profiles (optional)
-- DELETE FROM profiles WHERE email LIKE '%@gmail.com' OR email LIKE '%test%';

-- Instructions:
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Test signup with different roles
-- 3. Check the logs in Supabase Dashboard > Logs to see the trigger working