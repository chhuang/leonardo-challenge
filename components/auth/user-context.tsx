'use client';

import { createContext, useContext } from 'react';
import { UserContextType } from './user.types';
import { useAuth } from './use-auth.hooks';

const Context = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <Context.Provider value={auth}>{children}</Context.Provider>;
}

export function useUserContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
}
