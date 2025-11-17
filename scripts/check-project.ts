import { db } from "../src/db/client";
import { researchProjects } from "../src/db/schema";

async function checkProject() {
  const projects = await db.select().from(researchProjects);
  console.log(JSON.stringify(projects, null, 2));
  process.exit(0);
}

checkProject();
