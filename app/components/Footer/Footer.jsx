'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image
                src="/logo.png"
                alt="SafePoint Bank"
                width={150}
                height={40}
                style={{ width: 'auto', height: '30px' }}
              />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SafePoint Bank</span>
            </div>
            <p>Ваш надежный финансовый партнер</p>
          </div>
          
          <div className={styles.section}>
            <h4>Навигация</h4>
            <ul className={styles.links}>
              <li><Link href="/">Главная</Link></li>
              <li><Link href="/about">О нас</Link></li>
              <li><Link href="/contacts">Контакты</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Контакты</h4>
            <p>Телефон: +998334334404</p>
            <p>Email: ramizmatlabov923@gmail.com</p>
          </div>
          <div className={styles.section}>
            <h4>Адрес</h4>
            <p>г. Самарканд, Абу Рейхан Беруни</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2024 SafePoint Bank. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 