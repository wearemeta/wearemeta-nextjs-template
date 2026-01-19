import type { Metadata } from 'next';
import '@wearemeta/design-system/styles';
import '@wearemeta/design-system/themes/meta';
import '@wearemeta/design-system/themes/sidebar';
import '@fontsource/geist';
import '../src/styles/globals.css';

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
        {children}
      </body>
    </html>
  );
}
