import { createClient } from '@supabase/supabase-js'



const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABSE_KEY;


// export const supabase = createClient('https://lrmwrptjnuekcgfyaclz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxybXdycHRqbnVla2NnZnlhY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NTMwNDAsImV4cCI6MjA2MDAyOTA0MH0.DAoBmk7VJXQLjc7d3wrMTa2Jx8EHAMRQ4np0WZR67wE')

export const supabase = createClient(supabaseUrl,supabaseKey)

console.log(supabase)


