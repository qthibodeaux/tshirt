create table user_profiles (
  user_id uuid primary key references auth.users (id) not null,
  username text unique not null
);