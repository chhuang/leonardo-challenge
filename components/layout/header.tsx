'use client';

import { UserProfile } from '@/components/auth/user-profile';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Rick and Morty Character Explorer</h1>
        <UserProfile />
      </div>
    </header>
  );
}
