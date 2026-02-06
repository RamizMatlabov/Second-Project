import { Inter } from 'next/font/google';
import './globals.scss';
import Navigation from './components/Navigation';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'SafePoint Bank',
  description: 'Ваш надежный финансовый партнер',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {/* Navigation bar */}
        <Navigation />
        {children}
      </body>
    </html>
  );
}
