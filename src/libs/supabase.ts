import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const sampleEmail = process.env.NEXT_PUBLIC_SAMPLE_EMAIL;
export const samplePassword = process.env.NEXT_PUBLIC_SAMPLE_PASSWORD;

if (!SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!SUPABASE_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

