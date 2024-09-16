CREATE TABLE user_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) NOT NULL,
  username text UNIQUE NOT NULL,
  profile_name text, -- Optional profile name
  phone text, -- Optional phone number
  email text UNIQUE, -- Unique email for the user
  shipping_address text, -- Optional shipping address
  CONSTRAINT proper_username CHECK (username ~* '^[a-zA-Z0-9_]+$'),
  CONSTRAINT username_length CHECK (char_length(username) > 3 AND char_length(username) < 15)
);

CREATE TABLE orders (
  order_id uuid PRIMARY KEY, -- Unique identifier for each order
  user_id uuid REFERENCES user_profiles(user_id) NOT NULL, -- Reference to the user
  order_date timestamp DEFAULT now(), -- Timestamp for when the order was placed
  total_amount numeric(10, 2) NOT NULL, -- Total amount of the order
  shipping_address text, -- Optional shipping address for the order (can differ from user's profile)
  status text DEFAULT 'pending', -- Order status (e.g., pending, shipped, delivered, etc.)
  CONSTRAINT valid_status CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled'))
);

-- Allow all users to view public profile information, including new fields
CREATE POLICY "all can see" ON "public"."user_profiles"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Only the user can insert their own profile information
CREATE POLICY "users can insert" ON "public"."user_profiles"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

-- Only the owner of the profile can update their information
CREATE POLICY "owners can update" ON "public"."user_profiles"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to see their own orders
CREATE POLICY "users can select their orders" ON "public"."orders"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid() = user_id);

-- Allow users to insert new orders
CREATE POLICY "users can insert orders" ON "public"."orders"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

-- Only allow users to update their own orders (e.g., for cancellation)
CREATE POLICY "users can update their orders" ON "public"."orders"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
