'use client';
import { Inter } from 'next/font/google';
import './globals.scss';
import Navigation from './components/Navigation';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './context/AuthContext';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          {!isDashboard && <Navigation />}
          {children}
          {!isDashboard && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
