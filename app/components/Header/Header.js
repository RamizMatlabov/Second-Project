'use client';

import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Kapital Bank
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
        </nav>
      </div>
    </header>
  );
};

export default Header; 