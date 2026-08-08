-- 1. Crear tabla food_logs
CREATE TABLE public.food_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  calories integer not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;

-- 3. Crear Políticas de Seguridad
CREATE POLICY "Users can select their own food_logs" ON public.food_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own food_logs" ON public.food_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own food_logs" ON public.food_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own food_logs" ON public.food_logs FOR DELETE USING (auth.uid() = user_id);
