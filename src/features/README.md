# Features

Feature modules organized by business domain. Each feature is self-contained with its own components, hooks, utilities, and types.

## Structure

```
features/
└── [feature-name]/
    ├── components/    # Feature-specific components
    ├── hooks/        # Feature-specific hooks
    ├── lib/          # Feature-specific utilities and API calls
    └── types/        # Feature-specific TypeScript types
```

## Guidelines

- **Self-contained**: Each feature should be as independent as possible
- **Co-location**: Keep related code together (components, hooks, types)
- **Clear boundaries**: Features should have clear interfaces with the rest of the app
- **Reusability**: If something is used across features, move it to `components/common` or `lib/`

## Example Feature Structure

```
features/
└── timesheet/
    ├── components/
    │   ├── TimesheetForm.tsx
    │   └── TimesheetTable.tsx
    ├── hooks/
    │   ├── useTimesheet.ts
    │   └── useTimesheetValidation.ts
    ├── lib/
    │   ├── api.ts          # API calls for this feature
    │   └── utils.ts        # Feature-specific utilities
    └── types/
        └── timesheet.ts    # TypeScript types for this feature
```

## Usage

```tsx
// In a page or component
import { TimesheetForm } from '@/features/timesheet/components/TimesheetForm';
import { useTimesheet } from '@/features/timesheet/hooks/useTimesheet';
import type { Timesheet } from '@/features/timesheet/types/timesheet';
```
