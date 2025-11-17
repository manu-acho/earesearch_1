import { readFileSync, writeFileSync } from 'fs';

const AUTH_CHECK = `  // Check authentication
  const hasAccess = await isAdmin();
  if (!hasAccess) {
    return NextResponse.json(
      { error: "Unauthorized. Admin access required." },
      { status: 401 }
    );
  }

`;

const routes = [
  'src/app/api/publications/reviews/route.ts',
  'src/app/api/publications/reviews/[id]/route.ts',
  'src/app/api/publications/artifacts/route.ts',
  'src/app/api/publications/artifacts/[id]/route.ts',
  'src/app/api/publications/social/route.ts',
  'src/app/api/publications/social/[id]/route.ts',
  'src/app/api/research-themes/route.ts',
  'src/app/api/research-themes/[id]/route.ts',
  'src/app/api/datasets/[id]/route.ts',
  'src/app/api/prototypes/route.ts',
  'src/app/api/prototypes/[id]/route.ts',
  'src/app/api/updates/route.ts',
  'src/app/api/updates/[id]/route.ts',
];

routes.forEach((file) => {
  try {
    let content = readFileSync(file, 'utf8');
    let modified = false;

    // Pattern 1: POST/PUT/DELETE after comment with try block
    const pattern1 = /(export async function (?:POST|PUT|DELETE)\([^)]+\) \{)\n(  try \{)/g;
    if (content.match(pattern1) && !content.includes('Check authentication')) {
      content = content.replace(pattern1, `$1\n${AUTH_CHECK}$2`);
      modified = true;
    }

    if (modified) {
      writeFileSync(file, content, 'utf8');
      console.log(`✅ Updated ${file}`);
    } else {
      console.log(`⏭️  Skipped ${file} (already protected or no mutations found)`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
});

console.log('\n✨ Done!');
