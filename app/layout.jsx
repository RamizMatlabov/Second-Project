'use client';
import { Inter } from 'next/font/google';
import './globals.scss';
import Navigation from './components/Navigation';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
