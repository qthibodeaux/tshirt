-- Create the user_profiles table
CREATE TABLE user_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text, -- Optional phone number
  email text UNIQUE, -- Unique email for the user
  shipping_address text, -- Optional shipping address
  CONSTRAINT proper_first_name CHECK (char_length(first_name) > 1),
  CONSTRAINT proper_last_name CHECK (char_length(last_name) > 1)
);

-- Keep the orders table as-is
CREATE TABLE orders (
  order_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique order identifier
  user_id uuid REFERENCES user_profiles(user_id) ON DELETE SET NULL, -- Reference to the user (nullable for guest checkout)
  order_date timestamp DEFAULT now(), -- Date of the order
  total_amount numeric(10, 2) NOT NULL, -- Total order amount
  shipping_address text, -- Optional shipping address (can differ from profile address)
  status text DEFAULT 'pending', -- Status of the order
  CONSTRAINT valid_status CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled'))
);

-- Drop the product_id reference from order_items and store product details directly
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique identifier for each order item
  order_id uuid REFERENCES orders(order_id) ON DELETE CASCADE, -- Reference to the order
  product_name text NOT NULL, -- The name of the product
  selected_color text NOT NULL, -- The color selected for this item
  size_type text CHECK (size_type IN ('adult', 'child')), -- Whether it's an adult or child size
  selected_size text CHECK (selected_size IN ('XXL', 'XL', 'L', 'M', 'S')), -- Selected size
  quantity int NOT NULL, -- Quantity of this item
  price numeric(10, 2) NOT NULL -- Price of the product item
);





-- Policies for user_profiles
CREATE POLICY "all can see" ON "public"."user_profiles"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "users can insert" ON "public"."user_profiles"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owners can update" ON "public"."user_profiles"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policies for orders
CREATE POLICY "users can select their orders" ON "public"."orders"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid() = user_id);

CREATE POLICY "users can insert orders" ON "public"."orders"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users can update their orders" ON "public"."orders"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

ALTER TABLE orders
ADD COLUMN is_guest boolean DEFAULT false, -- New column to indicate if this is a guest order
ADD COLUMN guest_email text, -- Optional email for guest users
ALTER COLUMN user_id DROP NOT NULL; -- Allow user_id to be null for guest orders

ALTER TABLE orders
ADD COLUMN order_number VARCHAR(6) UNIQUE NOT NULL;
