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
  'src/app/api/datasets/route.ts',
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

    // Add isAdmin import if not present
    if (!content.includes('import { isAdmin }')) {
      if (content.includes('from "drizzle-orm"')) {
        content = content.replace(
          /from "drizzle-orm";/,
          `from "drizzle-orm";\nimport { isAdmin } from "@/lib/auth-utils";`
        );
        modified = true;
      }
    }

    // Add auth check to POST functions
    const postRegex = /(\/\/ POST:.*\nexport async function POST\(request: NextRequest[^)]*\) \{)\n(  try \{)/g;
    if (postRegex.test(content)) {
      content = content.replace(postRegex, `$1\n${AUTH_CHECK}$2`);
      modified = true;
    }

    // Add auth check to PUT functions
    const putRegex = /(\/\/ PUT:.*\nexport async function PUT\([^)]+\) \{)\n(  try \{)/g;
    if (putRegex.test(content)) {
      content = content.replace(putRegex, `$1\n${AUTH_CHECK}$2`);
      modified = true;
    }

    // Add auth check to DELETE functions
    const deleteRegex = /(\/\/ DELETE:.*\nexport async function DELETE\([^)]+\) \{)\n(  try \{)/g;
    if (deleteRegex.test(content)) {
      content = content.replace(deleteRegex, `$1\n${AUTH_CHECK}$2`);
      modified = true;
    }

    if (modified) {
      writeFileSync(file, content, 'utf8');
      console.log(`✅ Updated ${file}`);
    } else {
      console.log(`⏭️  Skipped ${file} (no changes needed)`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
});

console.log('\n✨ Done!');
