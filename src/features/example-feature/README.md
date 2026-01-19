# Example Feature

This is an example feature structure to guide you when creating new features.

## Structure

- `components/` - Feature-specific React components
- `hooks/` - Custom hooks for this feature
- `lib/` - Utilities, API calls, and business logic
- `types/` - TypeScript type definitions

## Creating a New Feature

1. Copy this folder structure
2. Rename `example-feature` to your feature name
3. Add your components, hooks, and utilities
4. Update this README with your feature's purpose

## Example

```tsx
// features/my-feature/components/MyComponent.tsx
'use client';

import { useMyFeature } from '../hooks/useMyFeature';
import type { MyFeatureData } from '../types/my-feature';

export function MyComponent() {
  const { data, isLoading } = useMyFeature();
  // ...
}
```
