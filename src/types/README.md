# Types

Global TypeScript type definitions shared across the application.

## Guidelines

- **Global types**: Only include types used in multiple features
- **Feature types**: Feature-specific types should go in `features/[feature-name]/types/`
- **Well-organized**: Group related types together
- **Exported**: Export types for easy importing

## Examples

- User types
- API response types
- Common domain types
- Shared interfaces

## Usage

```tsx
import type { User } from '@/types/user';
```

## Note

The template already includes:
- `user.ts` - User type definitions

Add additional global types here as needed.
