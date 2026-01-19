#!/bin/bash

# Script to create a new repository from the template using GitHub CLI
# This ensures the owner is set to 'wearemeta' automatically

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Create New App from WeAreMeta Template${NC}"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo -e "${RED}❌ GitHub CLI (gh) is not installed.${NC}"
  echo -e "${YELLOW}Install it from: https://cli.github.com/${NC}"
  exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
  echo -e "${RED}❌ Not authenticated with GitHub CLI.${NC}"
  echo -e "${YELLOW}Run: gh auth login${NC}"
  exit 1
fi

# Get app name from user
read -p "Enter your app name (e.g., price-list-frontend): " APP_NAME

if [ -z "$APP_NAME" ]; then
  echo -e "${RED}❌ App name cannot be empty${NC}"
  exit 1
fi

# Validate app name (alphanumeric, hyphens, underscores only)
if [[ ! "$APP_NAME" =~ ^[a-z0-9_-]+$ ]]; then
  echo -e "${RED}❌ Invalid app name. Use lowercase letters, numbers, hyphens, or underscores only.${NC}"
  exit 1
fi

REPO_NAME="wearemeta/${APP_NAME}"
REPO_URL="https://github.com/${REPO_NAME}"

echo ""
echo -e "${BLUE}Creating repository: ${REPO_NAME}${NC}"
echo ""

# Create repository from template
if gh repo create "$REPO_NAME" \
  --template wearemeta/wearemeta-nextjs-template \
  --public \
  --clone; then
  
  echo ""
  echo -e "${GREEN}✅ Repository created successfully!${NC}"
  echo ""
  echo -e "${BLUE}Next steps:${NC}"
  echo -e "  1. cd ${APP_NAME}"
  echo -e "  2. pnpm setup"
  echo -e "  3. pnpm dev"
  echo ""
  echo -e "${GREEN}Repository URL: ${REPO_URL}${NC}"
else
  echo -e "${RED}❌ Failed to create repository${NC}"
  echo -e "${YELLOW}Make sure:${NC}"
  echo -e "  - You have permission to create repos in the wearemeta organization"
  echo -e "  - The repository name doesn't already exist"
  exit 1
fi
