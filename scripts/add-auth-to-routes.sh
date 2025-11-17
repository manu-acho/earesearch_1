#!/bin/bash

# List of route files that need auth protection
ROUTES=(
  "src/app/api/publications/reviews/route.ts"
  "src/app/api/publications/reviews/[id]/route.ts"
  "src/app/api/publications/artifacts/route.ts"
  "src/app/api/publications/artifacts/[id]/route.ts"
  "src/app/api/publications/social/route.ts"
  "src/app/api/publications/social/[id]/route.ts"
  "src/app/api/research-themes/route.ts"
  "src/app/api/research-themes/[id]/route.ts"
  "src/app/api/datasets/route.ts"
  "src/app/api/datasets/[id]/route.ts"
  "src/app/api/prototypes/route.ts"
  "src/app/api/prototypes/[id]/route.ts"
  "src/app/api/updates/route.ts"
  "src/app/api/updates/[id]/route.ts"
)

echo "Adding isAdmin import to routes..."
for route in "${ROUTES[@]}"; do
  if [[ -f "$route" ]]; then
    # Check if isAdmin is already imported
    if ! grep -q "import.*isAdmin" "$route"; then
      # Add isAdmin import after drizzle-orm import
      if grep -q "from \"drizzle-orm\"" "$route"; then
        sed -i '' '/from "drizzle-orm"/a\
import { isAdmin } from "@/lib/auth-utils";
' "$route"
        echo "✅ Added import to $route"
      fi
    fi
  fi
done

echo "Done!"
