'use client';

import { useState, useEffect } from 'react';
import { UserInfo } from './user.types';
import { STORAGE_KEY } from './storage.constants';

export function useAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = (updates: Partial<UserInfo>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const setUserData = (userData: UserInfo | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    setUser: setUserData,
    updateUser,
    clearUser,
  };
}
