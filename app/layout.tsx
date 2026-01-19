import type { Metadata } from 'next';
import '@wearemeta/design-system/styles';
import '@wearemeta/design-system/themes/meta';
import '@wearemeta/design-system/themes/sidebar';
import '@fontsource/geist';
import '../src/styles/globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Toaster } from '@wearemeta/design-system';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'WeAreMeta App',
  description: 'Application built with WeAreMeta Design System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="meta-theme" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased meta-theme" suppressHydrationWarning>
        <AuthProvider>
          <AuthGuard>
            <ClientLayout>
              {children}
            </ClientLayout>
            <Toaster />
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
