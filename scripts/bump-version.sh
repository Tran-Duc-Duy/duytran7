#!/usr/bin/env bash
# Bump patch version for all packages in the monorepo (does not create a git tag).
# Usage: ./scripts/bump-version.sh
set -e
cd "$(dirname "$0")/.."
for dir in packages/*/; do
  if [ -f "${dir}package.json" ]; then
    echo "Bump ${dir}"
    (cd "$dir" && pnpm version patch --no-git-tag-version --allow-same-version)
  fi
done
echo "Done. Commit and tag manually (e.g. git tag v0.1.1), then push the tag to trigger publish."
