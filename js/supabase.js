// =====================================================
// CONFIGURACIÓN DE SUPABASE
// Reemplaza estos valores con los de tu proyecto en:
// https://app.supabase.com → Settings → API
// =====================================================

const SUPABASE_URL = 'https://srlodkxnovyblqtiekkz.supabase.co/rest/v1/';
const SUPABASE_KEY = 'https://srlodkxnovyblqtiekkz.supabase.co/rest/v1/';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
