'use client';

import { useUserContext } from './user-context';
import { AuthForm } from './auth-form';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return <>{children}</>;
}
