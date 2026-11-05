import type { Metadata } from 'next';
import '@fontsource-variable/geist';
import { Header } from '@/components/Header';
import { ThemeSync } from '@/components/ThemeSync';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quiz Builder',
  description: 'Create quizzes with boolean, input and checkbox questions',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <ThemeSync />
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
