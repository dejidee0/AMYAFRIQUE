import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from the .env file
dotenv.config({ path: ".env.server" });

// Get the URL and Key from the environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Check if the URL and Key are defined
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Supabase URL and key are required!");
}

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
