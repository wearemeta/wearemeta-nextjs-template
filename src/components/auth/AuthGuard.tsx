'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '@/lib/auth/AuthContext';
import authConfig from '@/lib/auth/config';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { status } = useAuth();

  useEffect(() => {
    const token = Cookies.get(authConfig.storageTokenKeyName);
    
    // Check if dev bypass is enabled
    const devBypassAuth = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true';
    const devToken = process.env.NEXT_PUBLIC_DEV_AUTH_TOKEN;
    
    if (!token) {
      // In development, use the token from .env if available
      if (process.env.NODE_ENV === 'development' && devBypassAuth && devToken) {
        Cookies.set(authConfig.storageTokenKeyName, devToken, { expires: 1 });
        return;
      }
      
      // Normal auth flow for production or when bypass is disabled
      const currentPath = window.location.pathname;
      if (currentPath !== '/auth/login') {
        Cookies.set('redirect_after_login', currentPath);
      }
      window.location.href = '/auth/login';
      return;
    }
  }, []);

  // Handle unauthorized access
  useEffect(() => {
    // Skip this check if we're in dev mode with bypass enabled
    if (process.env.NODE_ENV === 'development' && 
        process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true') {
      return;
    }
    
    if (status === 'failed') {
      Cookies.remove(authConfig.storageTokenKeyName);
      window.location.href = '/auth/login';
    }
  }, [status]);

  return <>{children}</>;
};
