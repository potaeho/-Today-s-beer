import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  console.warn("[supabase] .env 파일에 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 설정 필요");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnon ?? "");
