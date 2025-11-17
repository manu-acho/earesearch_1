import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/db/schema';
import { sql } from 'drizzle-orm';

async function pushSchema() {
  console.log('🔄 Connecting to database...');
  
  // Use Netlify's unpooled URL or DATABASE_URL
  const dbUrl = process.env.NETLIFY_DATABASE_URL_UNPOOLED || 
                process.env.NETLIFY_DATABASE_URL || 
                process.env.DATABASE_URL;
  
  if (!dbUrl) {
    console.error('❌ No DATABASE_URL found in environment');
    process.exit(1);
  }
  
  console.log('🔗 Using database URL:', dbUrl.substring(0, 30) + '...');
  
  const pool = new Pool({ 
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });
  
  const db = drizzle(pool, { schema });
  
  try {
    // Test connection
    console.log('🧪 Testing connection...');
    const result = await db.execute(sql`SELECT current_database(), current_user`);
    console.log('✅ Connected to database:', result.rows[0]);
    
    // Check if tables exist
    console.log('🔍 Checking existing tables...');
    const tables = await db.execute(sql`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    
    console.log('📋 Existing tables:', tables.rows.map((r: any) => r.tablename).join(', '));
    
    if (tables.rows.length === 0) {
      console.log('⚠️  No tables found! Run migrations with: npm run db:migrate');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

pushSchema();
