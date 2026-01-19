'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import axiosInstance from '@/lib/api/client';
import authConfig from '@/lib/auth/config';
import type { User, UserState } from '@/types/user';

interface AuthContextType extends UserState {
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<UserState['status']>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    const token = Cookies.get(authConfig.storageTokenKeyName);
    
    if (!token) {
      setStatus('failed');
      setError('No authentication token found');
      return;
    }

    // Check if dev bypass is enabled
    const devBypassAuth = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true';
    if (devBypassAuth) {
      // In dev mode with bypass, set a mock user
      setUser({
        id: 1,
        email: 'dev@example.com',
        name: 'Dev User',
        display_name: 'Dev User',
        avatar: '/assets/img/default-avatar.png',
      });
      setStatus('succeeded');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const response = await axiosInstance.get(authConfig.meEndpoint);
      
      // Handle paginated response (if API returns { results: [...] })
      const userData = response.data.results?.[0] || response.data;
      
      if (userData?.employee) {
        // If the API returns user data nested under 'employee'
        const employee = userData.employee;
        setUser({
          id: employee.id,
          email: employee.email || '',
          name: employee.name || employee.display_name || 'User',
          display_name: employee.display_name || employee.name || 'User',
          avatar: employee.avatar || '/assets/img/default-avatar.png',
          job_title: employee.job_title,
          department: employee.department,
        });
      } else if (userData) {
        // Direct user object
        setUser({
          id: userData.id,
          email: userData.email || '',
          name: userData.name || userData.display_name || 'User',
          display_name: userData.display_name || userData.name || 'User',
          avatar: userData.avatar || '/assets/img/default-avatar.png',
          job_title: userData.job_title,
          department: userData.department,
        });
      } else {
        throw new Error('No user data found in response');
      }
      
      setStatus('succeeded');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user';
      setError(errorMessage);
      setStatus('failed');
      
      // Clear token on error
      Cookies.remove(authConfig.storageTokenKeyName);
    }
  }, []);

  const logout = useCallback(() => {
    Cookies.remove(authConfig.storageTokenKeyName);
    setUser(null);
    setStatus('idle');
    setError(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }, []);

  // Fetch user on mount if token exists
  useEffect(() => {
    const token = Cookies.get(authConfig.storageTokenKeyName);
    if (token && status === 'idle') {
      fetchUser();
    }
  }, [fetchUser, status]);

  return (
    <AuthContext.Provider value={{ user, status, error, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
