-- Supabase Database Schema and RLS Policies for Advanced AI Resume Generator

-- Enable the pgvector extension for RAG (Retrieval-Augmented Generation)
create extension if not exists vector;

-- 1. Create the Users Table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the Resumes Table
create table public.resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  title text not null default 'My Resume',
  content jsonb not null default '{}'::jsonb, -- Structured resume data (JSON)
  ats_score integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create the Global Job Descriptions Table (Vector Database for RAG)
create table public.global_job_descriptions (
  id uuid default gen_random_uuid() primary key,
  job_title text not null,
  industry text not null,
  region text not null,
  description text not null,
  embedding vector(768) -- Assuming 768 dimensions for embedding models
);

-- 4. Set up Row-Level Security (RLS)

-- Enable RLS
alter table public.users enable row level security;
alter table public.resumes enable row level security;
alter table public.global_job_descriptions enable row level security;

-- Policies for Users Table
create policy "Users can view their own profile"
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.users for update
  using ( auth.uid() = id );

-- Policies for Resumes Table
create policy "Users can view their own resumes"
  on public.resumes for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own resumes"
  on public.resumes for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own resumes"
  on public.resumes for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own resumes"
  on public.resumes for delete
  using ( auth.uid() = user_id );

-- Policies for Global Job Descriptions (RAG data)
-- This table should be readable by all authenticated users, but only writable by admins (or service role)
create policy "Anyone authenticated can read job descriptions"
  on public.global_job_descriptions for select
  using ( auth.role() = 'authenticated' );

-- Create an index for faster vector searches
create index on public.global_job_descriptions using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Trigger to create a user in public.users when a new user signs up via auth
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
