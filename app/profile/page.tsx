'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserProfile } from '@/components/auth/user-profile';
import { useUserContext } from '@/components/auth/user-context';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useUserContext();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="font-medium">{user?.username}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Job Title</p>
            <p className="font-medium">{user?.jobTitle}</p>
          </div>

          <div className="pt-4">
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
