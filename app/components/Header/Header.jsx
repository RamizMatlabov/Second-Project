'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          SafePoint Bank
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/about" className={styles.link}>
            О нас
          </Link>
          <Link href="/contact" className={styles.link}>
            Контакты
          </Link>
          <Link href="/register" className={styles.link}>
            Регистрация
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 