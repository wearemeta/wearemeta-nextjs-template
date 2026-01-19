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

### Option 1: Clone this repository

```bash
cd /Users/joaomateus/code/wearemeta
git clone <repository-url> my-new-app
cd my-new-app
```

### Option 2: Use as GitHub Template

1. Click "Use this template" on GitHub
2. Create your new repository
3. Clone it locally

### Setup Steps

**Option 1: Automated Setup (Recommended)**

Run the setup script that automates all configuration:

```bash
cd my-new-app
./setup.sh
```

The script will:
- Update package.json with your app name
- Update app metadata
- Build the design system
- Install dependencies
- Create .env.local file

Then run:
```bash
pnpm dev
```

**Option 2: Manual Setup**

1. **Build the design system first** (if not already built):

```bash
cd ../wearemeta-design-system
pnpm build
```

2. **Install dependencies**:

```bash
cd ../my-new-app
pnpm install
```

3. **Create .env.local**:

```bash
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_DEV_BYPASS_AUTH=true
NEXT_PUBLIC_DEV_AUTH_TOKEN=
EOF
```

4. **Run the development server**:

```bash
pnpm dev
```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

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

### Design System Path

The template uses a local file reference to the design system:

```json
"@wearemeta/design-system": "file:../wearemeta-design-system/packages/design-system"
```

Make sure the design system is built before running your app:

```bash
cd ../wearemeta-design-system
pnpm build
```

### Authentication

The template includes a complete authentication system that matches the employee hub:

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

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WeAreMeta Design System](../wearemeta-design-system/README.md)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a starter template. Customize it for your project needs!

## 📄 License

Private - WeAreMeta internal use only.
