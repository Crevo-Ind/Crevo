import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zglrhshurwiotpgnbxpt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnbHJoc2h1cndpb3RwZ25ieHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MDU2ODAsImV4cCI6MjA5NjI4MTY4MH0.m8dIas8CWHKZPOiiloNfNqx_EyvRiPJ77SybE9MYckw'

export const supabase = createClient(supabaseUrl, supabaseKey)
