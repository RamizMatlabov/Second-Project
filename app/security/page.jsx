'use client';

import React from 'react';
import { MdSecurity, MdLock, MdShield, MdWarning, MdPhone } from 'react-icons/md';
import styles from './page.module.scss';

const SecurityPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <MdSecurity className={styles.mainIcon} />
        <h1>Безопасность и защита</h1>
        <p>Ваша финансовая безопасность — наш главный приоритет.</p>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <MdShield className={styles.sectionIcon} />
          <h2>Защита данных</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Шифрование данных</h3>
            <p>Мы используем современные протоколы шифрования AES-256 для защиты всех ваших транзакций и личной информации.</p>
          </div>
          <div className={styles.card}>
            <h3>Двухфакторная аутентификация</h3>
            <p>Дополнительный уровень защиты вашего аккаунта с помощью SMS-кодов или биометрических данных.</p>
          </div>
          <div className={styles.card}>
            <h3>Мониторинг 24/7</h3>
            <p>Наша система интеллектуального мониторинга анализирует подозрительные операции в режиме реального времени.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <MdWarning className={styles.sectionIcon} />
          <h2>Советы по безопасности</h2>
        </div>
        <ul className={styles.tipsList}>
          <li>
            <strong>Никогда не сообщайте свой PIN-код:</strong> Сотрудники банка никогда не запрашивают ваш PIN-код или пароли от личного кабинета.
          </li>
          <li>
            <strong>Используйте сложные пароли:</strong> Создавайте уникальные пароли для банковских приложений и регулярно их обновляйте.
          </li>
          <li>
            <strong>Проверяйте URL-адрес:</strong> Всегда убеждайтесь, что вы находитесь на официальном сайте банка перед вводом данных.
          </li>
          <li>
            <strong>Будьте осторожны с подозрительными ссылками:</strong> Не открывайте ссылки из SMS или писем от неизвестных отправителей.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <MdPhone className={styles.sectionIcon} />
          <h2>Экстренные контакты</h2>
        </div>
        <div className={styles.emergencyGrid}>
          <div className={styles.emergencyCard}>
            <h3>Блокировка карты</h3>
            <p className={styles.phone}>8 800 123-45-67</p>
            <p>Бесплатно по всей стране</p>
          </div>
          <div className={styles.emergencyCard}>
            <h3>Поддержка клиентов</h3>
            <p className={styles.phone}>+998 33 433-44-04</p>
            <p>Международная линия</p>
          </div>
          <div className={styles.emergencyCard}>
            <h3>Сообщить о мошенничестве</h3>
            <p className={styles.email}>security@safepoint.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage;
