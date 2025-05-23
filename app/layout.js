import { Inter } from 'next/font/google';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './globals.scss';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Kapital Bank',
  description: 'Ваш надежный финансовый партнер',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
