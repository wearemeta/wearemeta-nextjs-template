'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '@/lib/auth/AuthContext';
import authConfig from '@/lib/auth/config';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { status } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = Cookies.get(authConfig.storageTokenKeyName);
    
    // Check if dev bypass is enabled
    const devBypassAuth = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true';
    const devToken = process.env.NEXT_PUBLIC_DEV_AUTH_TOKEN;
    
    // If dev bypass is enabled, set a dummy token and allow access
    if (devBypassAuth && !token) {
      // Set a dummy token so the auth system thinks we're authenticated
      Cookies.set(authConfig.storageTokenKeyName, devToken || 'dev-token-bypass', { expires: 1 });
      setIsInitialized(true);
      return;
    }
    
    if (!token) {
      // Normal auth flow for production or when bypass is disabled
      const currentPath = window.location.pathname;
      if (currentPath !== '/auth/login') {
        Cookies.set('redirect_after_login', currentPath);
        window.location.href = '/auth/login';
      }
      return;
    }
    
    setIsInitialized(true);
  }, []);

  // Handle unauthorized access
  useEffect(() => {
    // Skip this check if we're in dev mode with bypass enabled
    const devBypassAuth = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true';
    if (process.env.NODE_ENV === 'development' && devBypassAuth) {
      return;
    }
    
    if (status === 'failed' && isInitialized) {
      Cookies.remove(authConfig.storageTokenKeyName);
      const currentPath = window.location.pathname;
      if (currentPath !== '/auth/login') {
        window.location.href = '/auth/login';
      }
    }
  }, [status, isInitialized]);

  // In dev bypass mode, always render children
  const devBypassAuth = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true';
  if (devBypassAuth) {
    return <>{children}</>;
  }

  // Wait for initialization before rendering
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};
