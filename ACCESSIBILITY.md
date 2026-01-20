# Accessibility Guide

This template follows WCAG 2.1 Level AA accessibility standards and is designed to be fully keyboard navigable.

## Keyboard Navigation

### Skip Navigation
- **Tab** on page load: Press Tab when the page loads to access the "Skip to main content" link
- This allows keyboard users to bypass repetitive navigation and go directly to the main content

### Navigation Shortcuts

#### Sidebar Navigation
- **Tab**: Navigate through sidebar menu items
- **Enter/Space**: Activate the focused menu item
- **Arrow Keys**: Navigate within dropdown menus (when available)
- **Escape**: Close open dropdowns or modals

#### User Menu
- **Tab**: Navigate to user menu button
- **Enter/Space**: Open user dropdown menu
- **Arrow Keys**: Navigate through menu items
- **Enter**: Activate selected menu item
- **Escape**: Close the dropdown menu

#### Breadcrumbs
- **Tab**: Navigate through breadcrumb links
- **Enter**: Navigate to the breadcrumb page

## Focus Management

- All interactive elements are keyboard accessible
- Focus indicators are visible with a ring outline
- Focus order follows logical reading order
- Focus is properly managed when modals or dropdowns open/close

## ARIA Labels and Roles

### Navigation Elements
- Main navigation has `aria-label="Main navigation"`
- Sidebar menu has `role="menubar"` and `aria-label="Main navigation menu"`
- Breadcrumbs have `aria-label="Breadcrumb navigation"`
- User menu button has `aria-label` describing the user
- User dropdown has `role="menu"` and `aria-label="User menu"`

### Icons
- All decorative icons have `aria-hidden="true"`
- Icons that convey meaning have appropriate `aria-label` attributes

### Main Content
- Main content area has `id="main-content"` for skip navigation
- Main content has `role="main"` and `aria-label="Main content"`

## Screen Reader Support

- Semantic HTML elements are used throughout
- ARIA labels provide context for screen readers
- Form inputs have associated labels
- Buttons have descriptive text or aria-labels
- Images have alt text or are marked as decorative

## Color Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Focus indicators are clearly visible
- Interactive states (hover, focus, active) are distinguishable

## Best Practices for Developers

### When Adding New Components

1. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
   - Use semantic HTML (`<button>`, `<a>`, `<input>`, etc.)
   - Add `tabIndex={0}` for custom interactive elements
   - Use `tabIndex={-1}` to remove elements from tab order when needed

2. **ARIA Labels**: Add appropriate ARIA attributes
   - Use `aria-label` for buttons with only icons
   - Use `aria-labelledby` to associate labels with elements
   - Use `aria-describedby` for additional context
   - Use `role` attributes when semantic HTML isn't sufficient

3. **Focus Management**: Manage focus properly
   - Focus should move logically through the page
   - When opening modals, trap focus within the modal
   - When closing modals, return focus to the trigger element
   - Use `focus()` method programmatically when appropriate

4. **Skip Links**: Add skip links for repetitive content blocks
   - Use the pattern: `<a href="#main-content">Skip to main content</a>`
   - Target element should have `id="main-content"`

5. **Form Accessibility**: Make forms accessible
   - Associate labels with inputs using `htmlFor` and `id`
   - Provide error messages with `aria-describedby`
   - Use `aria-required` for required fields
   - Use `aria-invalid` for invalid fields

6. **Testing**: Test with keyboard and screen readers
   - Navigate the entire application using only the keyboard
   - Test with screen readers (NVDA, JAWS, VoiceOver)
   - Verify focus indicators are visible
   - Check color contrast ratios

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
