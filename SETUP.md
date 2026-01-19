# Quick Setup Guide

## Prerequisites

- Node.js 18+
- pnpm 8+ (or npm)

## Step-by-Step Setup

### 1. Clone or Copy the Template

```bash
cd /Users/joaomateus/code/wearemeta
cp -r wearemeta-nextjs-template my-new-app
cd my-new-app
```

### 2. Update Package Name (Optional)

Edit `package.json` and change the name:

```json
{
  "name": "my-new-app",
  ...
}
```

### 3. Build the Design System

```bash
cd ../wearemeta-design-system
pnpm build
```

### 4. Install Dependencies

```bash
cd ../my-new-app
pnpm install
```

### 5. Run Development Server

```bash
pnpm dev
```

### 6. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## What's Included

✅ Next.js 15 with App Router  
✅ WeAreMeta Design System integrated  
✅ AppLayout with sidebar, header, and footer  
✅ Report Issue button enabled  
✅ html2canvas for screenshots  
✅ Logo assets (meta, damia, landing)  
✅ TypeScript configured  
✅ Tailwind CSS with design system colors  

## Next Steps

1. Update `app/page.tsx` with your content
2. Customize sidebar navigation
3. Implement your API endpoints
4. Update the report issue handler
5. Customize theme if needed

## Troubleshooting

### Design System Not Found

Make sure the design system is built:
```bash
cd ../wearemeta-design-system
pnpm build
```

### Module Not Found Errors

Reinstall dependencies:
```bash
pnpm install
```

### Screenshot Not Working

Make sure `html2canvas` is installed (it's already in package.json).
