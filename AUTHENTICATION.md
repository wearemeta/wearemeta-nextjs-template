# Authentication Integration

This template includes a complete authentication system that matches the employee hub implementation.

## Overview

The authentication system provides:
- **Automatic user data fetching** from your API's `/me/` endpoint
- **User context** accessible throughout your app via `useAuth()` hook
- **Route protection** via `AuthGuard` component
- **Automatic token management** (stored in cookies, added to API requests)
- **Avatar integration** - user avatar, name, and email automatically displayed in sidebar

## Architecture

### AuthProvider (`src/lib/auth/AuthContext.tsx`)

React Context provider that:
- Fetches user data from `/me/` endpoint on app load
- Manages user state (loading, success, error)
- Provides `useAuth()` hook for accessing user data
- Handles logout functionality

### AuthGuard (`src/components/auth/AuthGuard.tsx`)

Component that:
- Checks for authentication token in cookies
- Redirects to `/auth/login` if no token found
- Supports development bypass mode
- Handles token expiration (401 errors)

### API Client (`src/lib/api/client.ts`)

Axios instance configured with:
- Automatic Bearer token injection from cookies
- 401 error handling (redirects to login)
- Base URL from environment variables

## Usage

### Accessing User Data

```tsx
import { useAuth } from '@/lib/auth/AuthContext';

function MyComponent() {
  const { user, status, error, logout } = useAuth();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Not authenticated</div>;
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <img src={user.avatar} alt={user.name} />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### User Avatar in Sidebar

The `UserDropdown` component in `app/page.tsx` automatically:
- Displays user's avatar image (or fallback initials)
- Shows user's name and email
- Handles logout functionality

The avatar is automatically populated from the auth context - no manual configuration needed!

## Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com

# Development Authentication Bypass
NEXT_PUBLIC_DEV_BYPASS_AUTH=false
NEXT_PUBLIC_DEV_AUTH_TOKEN=your-dev-token-here
```

### Auth Config (`src/lib/auth/config.ts`)

Customize authentication endpoints:

```typescript
const authConfig = {
  meEndpoint: '/me/',              // User data endpoint
  loginEndpoint: '/auth/token/',   // Login endpoint
  storageTokenKeyName: 'access_token', // Cookie name
  // ...
};
```

## API Response Format

The auth system expects one of these response formats:

### Option 1: Paginated Response
```json
{
  "results": [
    {
      "employee": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "/path/to/avatar.png",
        "display_name": "John Doe",
        "job_title": "Developer",
        "department": "Engineering"
      }
    }
  ]
}
```

### Option 2: Direct User Object
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "/path/to/avatar.png",
  "display_name": "John Doe"
}
```

## Development Mode

In development, you can bypass authentication:

1. Set `NEXT_PUBLIC_DEV_BYPASS_AUTH=true` in `.env.local`
2. Optionally set `NEXT_PUBLIC_DEV_AUTH_TOKEN` with a dev token
3. The system will use a mock user or the provided token

## Matching Employee Hub

This implementation matches the employee hub's authentication:
- Same cookie name (`access_token`)
- Same API endpoint (`/me/`)
- Same response format handling
- Same token injection pattern
- Same error handling (401 redirects)

## Next Steps

1. **Create Login Page**: Add `/app/auth/login/page.tsx` for user login
2. **Update API URL**: Set `NEXT_PUBLIC_API_URL` to your actual API
3. **Customize User Type**: Update `src/types/user.ts` if your API returns different fields
4. **Add Permissions**: Extend the auth context if you need permission checking

## Troubleshooting

### User data not loading
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify the `/me/` endpoint returns data in the expected format
- Check browser console for API errors
- Ensure authentication token is in cookies

### Avatar not showing
- Check that user data includes `avatar` field
- Verify avatar URL is accessible
- Check browser console for image loading errors
- Fallback initials will show if avatar fails to load

### Redirect loop
- Ensure login page exists at `/auth/login`
- Check that `AuthGuard` is not wrapping the login page
- Verify token is being set correctly after login
