# Components

This directory contains reusable UI components organized by category.

## Structure

```
components/
├── auth/          # Authentication-related components (AuthGuard, LoginForm, etc.)
├── common/        # Shared/common components used across the app
├── layout/        # Layout-specific components (headers, footers, etc.)
└── ui/            # Base UI components (if you need custom ones beyond design system)
```

## Guidelines

- **Keep components focused**: Each component should have a single responsibility
- **Use the design system**: Prefer components from `@wearemeta/design-system` over custom implementations
- **Feature-specific components**: If a component is only used in one feature, consider placing it in `features/[feature-name]/components/` instead
- **Export patterns**: Use `index.ts` files for clean imports

## Example

```tsx
// components/common/DataCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@wearemeta/design-system';

export function DataCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
```
