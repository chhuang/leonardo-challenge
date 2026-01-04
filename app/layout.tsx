import { ApolloProvider } from '@/lib/apollo/client';
import { UserProvider } from '@/components/auth/user-context';
import { AuthGate } from '@/components/auth/auth-gate';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>
          <UserProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <AuthGate>{children}</AuthGate>
              </main>
              <Footer />
            </div>
          </UserProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
