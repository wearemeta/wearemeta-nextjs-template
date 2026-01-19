#!/bin/bash

# Setup script for WeAreMeta Next.js Template
# This script automates the setup process after cloning the template

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 WeAreMeta Next.js Template Setup${NC}"
echo ""

# Get the app name from the current directory or ask for it
APP_NAME=$(basename "$(pwd)")
if [ "$APP_NAME" = "wearemeta-nextjs-template" ]; then
  echo -e "${YELLOW}⚠️  You're still in the template directory.${NC}"
  echo -e "${YELLOW}Please run this script from your cloned app directory.${NC}"
  exit 1
fi

echo -e "${GREEN}📦 App Name: ${APP_NAME}${NC}"
echo ""

# Step 1: Update package.json
echo -e "${BLUE}Step 1: Updating package.json...${NC}"
if [ -f "package.json" ]; then
  # Update the name field
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/\"name\": \"wearemeta-nextjs-app\"/\"name\": \"${APP_NAME}\"/" package.json
  else
    # Linux
    sed -i "s/\"name\": \"wearemeta-nextjs-app\"/\"name\": \"${APP_NAME}\"/" package.json
  fi
  echo -e "${GREEN}✅ Updated package.json${NC}"
else
  echo -e "${YELLOW}⚠️  package.json not found${NC}"
fi

# Step 2: Update app metadata
echo -e "${BLUE}Step 2: Updating app metadata...${NC}"
if [ -f "app/layout.tsx" ]; then
  # Convert app name to title case for display
  APP_TITLE=$(echo "$APP_NAME" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
  
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/title: 'WeAreMeta App'/title: '${APP_TITLE}'/" app/layout.tsx
    sed -i '' "s/description: 'Application built with WeAreMeta Design System'/description: '${APP_TITLE} Application'/" app/layout.tsx
  else
    # Linux
    sed -i "s/title: 'WeAreMeta App'/title: '${APP_TITLE}'/" app/layout.tsx
    sed -i "s/description: 'Application built with WeAreMeta Design System'/description: '${APP_TITLE} Application'/" app/layout.tsx
  fi
  echo -e "${GREEN}✅ Updated app metadata${NC}"
else
  echo -e "${YELLOW}⚠️  app/layout.tsx not found${NC}"
fi

# Step 3: Build design system
echo -e "${BLUE}Step 3: Building design system...${NC}"
DESIGN_SYSTEM_PATH="../wearemeta-design-system"
if [ -d "$DESIGN_SYSTEM_PATH" ]; then
  cd "$DESIGN_SYSTEM_PATH"
  if command -v pnpm &> /dev/null; then
    pnpm build
    echo -e "${GREEN}✅ Design system built${NC}"
  else
    echo -e "${YELLOW}⚠️  pnpm not found. Please install pnpm first.${NC}"
  fi
  cd - > /dev/null
else
  echo -e "${YELLOW}⚠️  Design system not found at ${DESIGN_SYSTEM_PATH}${NC}"
  echo -e "${YELLOW}   Make sure the design system is in the parent directory.${NC}"
fi

# Step 4: Install dependencies
echo -e "${BLUE}Step 4: Installing dependencies...${NC}"
if command -v pnpm &> /dev/null; then
  pnpm install
  echo -e "${GREEN}✅ Dependencies installed${NC}"
else
  echo -e "${YELLOW}⚠️  pnpm not found. Please install pnpm first.${NC}"
  echo -e "${YELLOW}   Install with: npm install -g pnpm${NC}"
fi

# Step 5: Create .env.local
echo -e "${BLUE}Step 5: Creating .env.local...${NC}"
if [ ! -f ".env.local" ]; then
  cat > .env.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Development Authentication Bypass
NEXT_PUBLIC_DEV_BYPASS_AUTH=true
NEXT_PUBLIC_DEV_AUTH_TOKEN=
EOF
  echo -e "${GREEN}✅ Created .env.local${NC}"
else
  echo -e "${YELLOW}⚠️  .env.local already exists, skipping...${NC}"
fi

echo ""
echo -e "${GREEN}✨ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Update .env.local with your API URL"
echo -e "  2. Run: ${GREEN}pnpm dev${NC}"
echo -e "  3. Open: ${GREEN}http://localhost:3000${NC}"
echo ""
