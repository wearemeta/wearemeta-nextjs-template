# WeAreMeta Next.js Starter Template

A production-ready Next.js starter template with the WeAreMeta Design System pre-configured.

## 🚀 Features

- ✅ **Next.js 15** with App Router
- ✅ **WeAreMeta Design System** integrated
- ✅ **TypeScript** configured
- ✅ **Tailwind CSS** with design system colors
- ✅ **AppLayout** component with sidebar, header, and footer
- ✅ **Report Issue** button enabled
- ✅ **Screenshot capture** (html2canvas) ready
- ✅ **Theme support** (Meta, Damia, Landing)
- ✅ **Logo assets** included

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

3. **Run the development server**:

```bash
pnpm dev
```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
my-new-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with design system
│   └── page.tsx           # Home page with AppLayout example
├── src/
│   └── styles/
│       └── globals.css    # Global styles
├── public/
│   └── assets/            # Logo assets (meta, damia, landing)
├── package.json           # Dependencies (includes html2canvas)
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
