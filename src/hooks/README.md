# Hooks

Global custom React hooks used across multiple features.

## Guidelines

- **Reusable**: These hooks should be useful in multiple places
- **Feature-specific hooks**: If a hook is only used in one feature, place it in `features/[feature-name]/hooks/`
- **Naming**: Use the `use` prefix (e.g., `useDebounce`, `useLocalStorage`)

## Examples

- `useDebounce` - Debounce values
- `useLocalStorage` - Local storage management
- `useMediaQuery` - Responsive breakpoints
- `useClickOutside` - Detect clicks outside an element

## Usage

```tsx
import { useDebounce } from '@/hooks/useDebounce';
```

## Note

Some hooks are already available from `@wearemeta/design-system`:
- `useToast` - Toast notifications
- `useIsMobile` - Mobile detection
- `useDebounce` - Debounce utility

Check the design system first before creating custom hooks.
