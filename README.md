# WeAreMeta Next.js Starter Template

A production-ready Next.js starter template with the WeAreMeta Design System pre-configured.

## 🚀 Features

- ✅ **Next.js 15** with App Router
- ✅ **WeAreMeta Design System** integrated
- ✅ **TypeScript** configured
- ✅ **Tailwind CSS** with design system colors
- ✅ **AppLayout** component with sidebar, header, and footer
- ✅ **Authentication system** integrated
- ✅ **User context** with automatic user data fetching
- ✅ **Report Issue** button enabled
- ✅ **Theme support** (Meta, Damia, Landing)

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+ (recommended) or npm

## 🏁 Quick Start

### Option 1: Automated Repository Creation (Recommended)

Use our script to create a new repository with the owner automatically set to `wearemeta`:

```bash
cd /Users/joaomateus/code/wearemeta
./wearemeta-nextjs-template/create-repo.sh
```

The script will:
- Prompt for your app name
- Create the repository under `wearemeta` organization
- Clone it locally
- Then run `pnpm setup` to configure everything

### Option 2: Use GitHub Template (Manual)

1. Go to: https://github.com/wearemeta/wearemeta-nextjs-template
2. Click "Use this template" button
3. **Important:** Select `wearemeta` as the owner (not your personal account)
4. Enter your repository name
5. Create the repository
6. Clone it locally:

```bash
cd /Users/joaomateus/code/wearemeta
git clone https://github.com/wearemeta/your-app-name.git
cd your-app-name
```

### Setup Steps

**Option 1: Automated Setup (Recommended)**

Run the setup script that automates all configuration. The script detects your app name from the directory and configures everything automatically.

**Using npm script:**
```bash
cd my-new-app
pnpm setup
# or
npm run setup
```

**Or run directly:**
```bash
cd my-new-app
./setup.sh    # Bash version
# or
node setup.js # Node.js version
```

The script will:
- ✅ Update package.json with your app name (detected from directory)
- ✅ Update app metadata (title and description)
- ✅ Create .npmrc for GitHub Packages authentication
- ✅ Install dependencies (from GitHub Packages)
- ✅ Create .env.local file

Then run:
```bash
pnpm dev
```

**Option 2: Manual Setup**

1. **Set up GitHub Packages authentication**:

```bash
# Create a GitHub Personal Access Token with 'read:packages' scope
# Then set it as an environment variable:
export GITHUB_TOKEN=your_token_here
```

2. **Create `.npmrc` file**:

```bash
cat > .npmrc << EOF
@wearemeta:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
EOF
```

3. **Install dependencies**:

```bash
pnpm install
```

4. **Create .env.local**:

```bash
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_DEV_BYPASS_AUTH=true
NEXT_PUBLIC_DEV_AUTH_TOKEN=
EOF
```

5. **Run the development server**:

```bash
pnpm dev
```

6. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
my-new-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with AuthProvider & AuthGuard
│   └── page.tsx           # Home page with AppLayout example
├── src/
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── AuthContext.tsx  # Auth context & useAuth hook
│   │   │   └── config.ts        # Auth configuration
│   │   └── api/
│   │       └── client.ts        # Axios instance with auth interceptors
│   ├── components/
│   │   └── auth/
│   │       └── AuthGuard.tsx   # Route protection component
│   ├── types/
│   │   └── user.ts             # User type definitions
│   └── styles/
│       └── globals.css    # Global styles
├── public/
│   └── assets/            # Logo assets (meta, damia, landing)
├── package.json           # Dependencies (includes axios, js-cookie)
├── tailwind.config.ts     # Tailwind with design system colors
├── tsconfig.json          # TypeScript configuration
└── next.config.ts         # Next.js configuration
```

## 🎨 Using the Design System

### Import Components

```tsx
import { AppLayout, Button, Card } from '@wearemeta/design-system';
```

### Use AppLayout

```tsx
<AppLayout
  sidebarContent={<YourSidebarContent />}
  sidebarFooter={<UserDropdown />}
  headerContent={<Breadcrumb />}
  showReportIssueButton={true}
  onReportIssue={handleReportIssue}
>
  <YourContent />
</AppLayout>
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com

# Authentication Configuration (Development)
# Set to 'true' to bypass authentication in development
NEXT_PUBLIC_DEV_BYPASS_AUTH=false
# Development token (only used if DEV_BYPASS_AUTH is true)
NEXT_PUBLIC_DEV_AUTH_TOKEN=your-dev-token-here
```

### Design System Package

The template uses the published `@wearemeta/design-system` package from GitHub Packages:

```json
"@wearemeta/design-system": "^0.1.0"
```

#### Setting up GitHub Packages Authentication

1. **Create a GitHub Personal Access Token**:
   - Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens/new)
   - Generate a new token with `read:packages` scope
   - Copy the token

2. **Set the token as an environment variable**:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```
   
   Or add it to your shell profile (`~/.zshrc` or `~/.bashrc`):
   ```bash
   echo 'export GITHUB_TOKEN=your_token_here' >> ~/.zshrc
   source ~/.zshrc
   ```

3. **The `.npmrc` file** (created by the setup script) will use this token automatically.

#### Updating the Design System

When a new version of the design system is published, update it in your app:

```bash
# Update to the latest compatible version
pnpm update @wearemeta/design-system

# Or update package.json manually to a specific version
# "@wearemeta/design-system": "^0.2.0"
```

The version range (`^0.1.0`) allows automatic updates for patch and minor versions, but not major versions (which may contain breaking changes).

### Authentication

The template includes a complete authentication system:

- **AuthProvider**: React Context that manages user state
- **AuthGuard**: Component that protects routes and redirects to login
- **useAuth hook**: Access user data anywhere in your app
- **Automatic user fetching**: User data is fetched on app load
- **Avatar integration**: User avatar, name, and email are automatically displayed

The authentication system:
- Fetches user data from `/me/` endpoint
- Stores authentication token in cookies (`access_token`)
- Automatically adds Bearer token to API requests
- Handles token expiration and redirects to login
- Supports development bypass mode

**Using the auth hook:**

```tsx
import { useAuth } from '@/lib/auth/AuthContext';

function MyComponent() {
  const { user, status, error, logout } = useAuth();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Themes

The app defaults to the **Meta** theme. To change themes:

1. Update `app/layout.tsx`:
   ```tsx
   <html lang="en" className="damia-theme">  // or landing-theme
   ```

2. Import the theme CSS:
   ```tsx
   import '@wearemeta/design-system/themes/damia';
   ```

## 📝 Customization

### Report Issue Button

The template includes a report issue button. To customize the submission:

1. Update `handleReportIssue` in `app/page.tsx`:

```tsx
const handleReportIssue = async (data: { description: string; screenshot: File | null }) => {
  const formData = new FormData();
  formData.append('description', data.description);
  if (data.screenshot) {
    formData.append('screenshot', data.screenshot);
  }
  await fetch('/api/report-issue', { method: 'POST', body: formData });
};
```

### Sidebar Navigation

Update the sidebar menu items in `app/page.tsx`:

```tsx
<SidebarMenuItem>
  <SidebarMenuButton>
    <YourIcon className="size-4" />
    <span>Your Page</span>
  </SidebarMenuButton>
</SidebarMenuItem>
```

### User Avatar

The user avatar in the sidebar automatically displays:
- User's avatar image (if available)
- User's name and email
- Fallback initials if no avatar

The avatar is populated from the authentication context, which fetches user data from your API's `/me/` endpoint.

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm setup` - Run the automated setup script

## 🔄 Updating the Design System

When a new version of the design system is published, update it in your app:

```bash
# Update to the latest compatible version
pnpm update @wearemeta/design-system

# Or manually edit package.json to specify a version
# "@wearemeta/design-system": "^0.2.0"
```

The `^` prefix allows automatic updates for patch and minor versions. For example:
- `^0.1.0` will update to `0.1.1`, `0.2.0`, but not `1.0.0`
- This ensures you get bug fixes and new features, but not breaking changes

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WeAreMeta Design System](../wearemeta-design-system/README.md)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a starter template. Customize it for your project needs!

## 📄 License

Private - WeAreMeta internal use only.
