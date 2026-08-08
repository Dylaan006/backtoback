-- Create Tables

-- 1. Tasks (Tareas)
CREATE TABLE public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  category text not null,
  priority text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habits (Hábitos)
CREATE TABLE public.habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Habit Logs (Registro de Hábitos)
CREATE TABLE public.habit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  habit_id uuid references public.habits on delete cascade not null,
  completed_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  UNIQUE(user_id, habit_id, completed_date)
);

-- 4. Transactions (Transacciones Economía)
CREATE TABLE public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  type text not null check (type in ('income', 'expense')),
  amount numeric not null,
  category text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Fixed Expenses (Gastos Fijos Economía)
CREATE TABLE public.fixed_expenses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Daily Kcal (Meta y Consumido Diario)
CREATE TABLE public.daily_kcal (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  date date not null,
  goal integer not null,
  consumed integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  UNIQUE(user_id, date)
);

-- 7. Food Logs (Detalle de Comidas del Día)
CREATE TABLE public.food_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  calories integer not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fixed_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_kcal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;

-- Create Policies (Only users can access their own data)

-- Tasks Policies
CREATE POLICY "Users can select their own tasks" ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tasks" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tasks" ON public.tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tasks" ON public.tasks FOR DELETE USING (auth.uid() = user_id);

-- Habits Policies
CREATE POLICY "Users can select their own habits" ON public.habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own habits" ON public.habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own habits" ON public.habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own habits" ON public.habits FOR DELETE USING (auth.uid() = user_id);

-- Habit Logs Policies
CREATE POLICY "Users can select their own habit_logs" ON public.habit_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own habit_logs" ON public.habit_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own habit_logs" ON public.habit_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own habit_logs" ON public.habit_logs FOR DELETE USING (auth.uid() = user_id);

-- Transactions Policies
CREATE POLICY "Users can select their own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own transactions" ON public.transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own transactions" ON public.transactions FOR DELETE USING (auth.uid() = user_id);

-- Fixed Expenses Policies
CREATE POLICY "Users can select their own fixed_expenses" ON public.fixed_expenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own fixed_expenses" ON public.fixed_expenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own fixed_expenses" ON public.fixed_expenses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own fixed_expenses" ON public.fixed_expenses FOR DELETE USING (auth.uid() = user_id);

-- Daily Kcal Policies
CREATE POLICY "Users can select their own daily_kcal" ON public.daily_kcal FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own daily_kcal" ON public.daily_kcal FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own daily_kcal" ON public.daily_kcal FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own daily_kcal" ON public.daily_kcal FOR DELETE USING (auth.uid() = user_id);

-- Food Logs Policies
CREATE POLICY "Users can select their own food_logs" ON public.food_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own food_logs" ON public.food_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own food_logs" ON public.food_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own food_logs" ON public.food_logs FOR DELETE USING (auth.uid() = user_id);
