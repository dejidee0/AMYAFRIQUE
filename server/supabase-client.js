import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://irpfpeoxmricezlyvvod.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycGZwZW94bXJpY2V6bHl2dm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NDM1NjEsImV4cCI6MjA1ODAxOTU2MX0.NUsZ6ALldbNsfD9hAxuuNxuxgmwcFu7N9XiXSXdGaiw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
