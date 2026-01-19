# Lib

Shared utilities, configurations, and business logic.

## Structure

```
lib/
├── api/          # API clients and utilities
├── auth/         # Authentication logic
└── utils/        # Utility functions
```

## Guidelines

- **Pure functions**: Prefer pure, testable functions
- **No React dependencies**: Keep utilities framework-agnostic when possible
- **Well-typed**: Use TypeScript for all utilities
- **Documented**: Add JSDoc comments for complex functions

## Examples

### Utils

```tsx
// lib/utils/format.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
```

### API

```tsx
// lib/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```
