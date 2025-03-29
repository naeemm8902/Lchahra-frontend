import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideBar from '@/components/layouts/SideBar';
import { Toaster } from '@/components/ui/toaster';
import { LoginProvider } from '@/context/LoginContext';
import Navbar from '@/components/layouts/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LCHAHRA',
  description:
    'A seamless platform for efficient communication, time tracking, task managing and collaboration, all in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = false;
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginProvider>
          {children}
          <Toaster />
        </LoginProvider>
      </body>
    </html>
  );
}
