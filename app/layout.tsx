import { ApolloProvider } from '@/lib/apollo/client';
import { UserProvider } from '@/components/auth/user-context';
import { AuthGate } from '@/components/auth/auth-gate';
import { Header } from '@/components/layout/header';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rick & Morty Explorer v3.5',
  description: 'Characters explorer for the Rick & Morty universe.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>
          <UserProvider>
            <div className="min-h-screen flex flex-col space-bg">
              <Header />
              <main className="flex-1">
                <AuthGate>{children}</AuthGate>
              </main>
            </div>
          </UserProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
