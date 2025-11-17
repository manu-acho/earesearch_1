import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Use a singleton pattern for the database connection
let pool: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

function getPool() {
  if (!pool) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      // Return a mock pool for build time
      console.warn("DATABASE_URL not set - database operations will fail");
      return null;
    }
    pool = new Pool({ 
      connectionString: dbUrl,
      max: 10,
    });
  }
  return pool;
}

function getDb() {
  if (!dbInstance) {
    const poolInstance = getPool();
    if (!poolInstance) {
      // Return a mock db for build time
      return null as any;
    }
    dbInstance = drizzle(poolInstance, { schema });
  }
  return dbInstance;
}

export const db = getDb();
