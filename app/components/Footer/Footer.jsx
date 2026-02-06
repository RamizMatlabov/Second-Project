'use client';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Kapital Bank</h3>
            <p>Ваш надежный финансовый партнер</p>
          </div>
          <div className={styles.section}>
            <h4>Контакты</h4>
            <p>Телефон: +7 (999) 123-45-67</p>
            <p>Email: info@kapitalbank.ru</p>
          </div>
          <div className={styles.section}>
            <h4>Адрес</h4>
            <p>г. Москва, ул. Примерная, д. 123</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2024 Kapital Bank. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 