import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://freufqjovszajdtmkoja.supabase.co'; // replace this
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZXVmcWpvdnN6YWpkdG1rb2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjU5NzIsImV4cCI6MjA2NzY0MTk3Mn0.6sPOdt-aIvBdg_bllmNawWizVsR-0WBO3wyKz5wVVyY'; // replace this

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
