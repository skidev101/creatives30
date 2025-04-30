const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseBucket = process.env.SUPABASE_BUCKET;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseBucket, supabaseKey);
 
module.exports = {
	supabase,
	supabaseBucket
}