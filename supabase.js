import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = '**************'; // replace this
const SUPABASE_KEY = '*****************************************'; // replace this

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
