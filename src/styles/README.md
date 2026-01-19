# Styles

Global styles, themes, and CSS files.

## Structure

- `globals.css` - Global styles and CSS variables
- Theme-specific styles are imported from `@wearemeta/design-system`

## Guidelines

- **Minimal custom CSS**: Prefer Tailwind classes and design system styles
- **CSS Variables**: Use CSS variables for theming (defined in design system)
- **Global styles**: Only add styles that need to be global

## Usage

The global styles are imported in `app/layout.tsx`:

```tsx
import '@wearemeta/design-system/styles';
import '@wearemeta/design-system/themes/meta';
import '../src/styles/globals.css';
```
