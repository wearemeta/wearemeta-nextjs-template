# Providers

React Context providers for global state management.

## Guidelines

- **Global state**: Use for state that needs to be shared across many components
- **Feature state**: For feature-specific state, consider using local state or feature-specific providers
- **Well-structured**: Keep providers focused and composable

## Examples

- Theme provider
- User context provider
- Toast provider
- Breadcrumb provider

## Usage

```tsx
// providers/MyProvider.tsx
'use client';

import { createContext, useContext, useState } from 'react';

const MyContext = createContext<MyContextType | undefined>(undefined);

export function MyProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState();
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

## Note

The template already includes:
- `AuthProvider` - Authentication context (in `lib/auth/AuthContext.tsx`)

Add additional providers here as needed.
