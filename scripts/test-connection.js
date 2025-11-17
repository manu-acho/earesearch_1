const { Pool } = require('pg');

async function testConnection() {
  console.log('🔄 Testing database connection...');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('NETLIFY_DATABASE_URL exists:', !!process.env.NETLIFY_DATABASE_URL);
  console.log('NETLIFY_DATABASE_URL_UNPOOLED exists:', !!process.env.NETLIFY_DATABASE_URL_UNPOOLED);
  
  const url = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
  console.log('Using URL:', url ? url.substring(0, 40) + '...' : 'NONE');
  
  const pool = new Pool({ connectionString: url });
  
  try {
    const result = await pool.query('SELECT NOW() as time, current_database() as db, current_user as user');
    console.log('✅ Connected successfully!');
    console.log('Database:', result.rows[0].db);
    console.log('User:', result.rows[0].user);
    console.log('Time:', result.rows[0].time);
    
    // Check tables
    const tables = await pool.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    console.log('\n📋 Tables in database:', tables.rows.map(r => r.tablename).join(', '));
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
  } finally {
    await pool.end();
  }
}

testConnection();
