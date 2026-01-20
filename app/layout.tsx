import type { Metadata } from 'next';
import * as React from 'react';
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
        {/* Skip Navigation Link - Accessibility: Allows keyboard users to skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
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
