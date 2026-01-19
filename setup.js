#!/usr/bin/env node

/**
 * Setup script for WeAreMeta Next.js Template
 * Automates the setup process after cloning the template
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getAppName() {
  const cwd = process.cwd();
  const appName = path.basename(cwd);
  
  if (appName === 'wearemeta-nextjs-template') {
    log('⚠️  You\'re still in the template directory.', 'yellow');
    log('Please run this script from your cloned app directory.', 'yellow');
    process.exit(1);
  }
  
  return appName;
}

function updatePackageJson(appName) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    log('⚠️  package.json not found', 'yellow');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = appName;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  log('✅ Updated package.json', 'green');
}

function updateAppMetadata(appName) {
  const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
  
  if (!fs.existsSync(layoutPath)) {
    log('⚠️  app/layout.tsx not found', 'yellow');
    return;
  }
  
  // Convert app name to title case
  const appTitle = appName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  let content = fs.readFileSync(layoutPath, 'utf8');
  content = content.replace(
    /title: 'WeAreMeta App'/,
    `title: '${appTitle}'`
  );
  content = content.replace(
    /description: 'Application built with WeAreMeta Design System'/,
    `description: '${appTitle} Application'`
  );
  
  fs.writeFileSync(layoutPath, content);
  log('✅ Updated app metadata', 'green');
}

function createNpmrc() {
  const npmrcPath = path.join(process.cwd(), '.npmrc');
  
  if (fs.existsSync(npmrcPath)) {
    log('⚠️  .npmrc already exists, skipping...', 'yellow');
    return;
  }
  
  const npmrcContent = `@wearemeta:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
`;
  
  fs.writeFileSync(npmrcPath, npmrcContent);
  log('✅ Created .npmrc', 'green');
  log('   ⚠️  Make sure to set GITHUB_TOKEN environment variable', 'yellow');
  log('   See: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages', 'yellow');
}

function installDependencies() {
  try {
    log('Installing dependencies...', 'blue');
    execSync('pnpm install', { stdio: 'inherit' });
    log('✅ Dependencies installed', 'green');
  } catch (error) {
    log('⚠️  Failed to install dependencies. Make sure pnpm is installed.', 'yellow');
    log('   Install with: npm install -g pnpm', 'yellow');
  }
}

function createEnvLocal() {
  const envLocalPath = path.join(process.cwd(), '.env.local');
  
  if (fs.existsSync(envLocalPath)) {
    log('⚠️  .env.local already exists, skipping...', 'yellow');
    return;
  }
  
  const envContent = `# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Development Authentication Bypass
NEXT_PUBLIC_DEV_BYPASS_AUTH=true
NEXT_PUBLIC_DEV_AUTH_TOKEN=
`;
  
  fs.writeFileSync(envLocalPath, envContent);
  log('✅ Created .env.local', 'green');
}

// Main execution
function main() {
  log('🚀 WeAreMeta Next.js Template Setup', 'blue');
  console.log('');
  
  const appName = getAppName();
  log(`📦 App Name: ${appName}`, 'green');
  console.log('');
  
  log('Step 1: Updating package.json...', 'blue');
  updatePackageJson(appName);
  
  log('Step 2: Updating app metadata...', 'blue');
  updateAppMetadata(appName);
  
  log('Step 3: Creating .npmrc for GitHub Packages...', 'blue');
  createNpmrc();
  
  log('Step 4: Installing dependencies...', 'blue');
  installDependencies();
  
  log('Step 5: Creating .env.local...', 'blue');
  createEnvLocal();
  
  console.log('');
  log('✨ Setup complete!', 'green');
  console.log('');
  log('Next steps:', 'blue');
  log('  1. Update .env.local with your API URL');
  log('  2. Run: pnpm dev', 'green');
  log('  3. Open: http://localhost:3000', 'green');
  console.log('');
}

main();
