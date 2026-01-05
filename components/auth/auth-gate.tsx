'use client';

import { useState, useEffect } from 'react';
import { useUserContext } from './user-context';
import { AuthForm } from './auth-form';
import { TacticalLoader } from '@/components/characters/tactical-loader';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUserContext();
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingComplete(true);
    }, 2000); // Force show for at least 2s for premium cinematic feel
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TacticalLoader fullScreen />;
  }

  // Force minimum delay ONLY for the entrance flow (login form)
  // If already authenticated, bypass to the page's own loader for a faster experience
  if (!isAuthenticated && !minLoadingComplete) {
    return <TacticalLoader fullScreen />;
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return <>{children}</>;
}
