'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdDone, MdClose, MdInfoOutline } from 'react-icons/md';
import styles from './page.module.scss';

const features = [
  { name: 'Открытие счета', start: 'Бесплатно', dev: 'Бесплатно', corp: 'Бесплатно' },
  { name: 'Ежемесячное обслуживание', start: '0 UZS', dev: '119 000 UZS', corp: '319 000 UZS' },
  { name: 'Бесплатные платежи (шт)', start: '5', dev: '50', corp: 'Безлимитно' },
  { name: 'Комиссия сверх лимита', start: '2 000 UZS', dev: '1 500 UZS', corp: '0 UZS' },
  { name: 'Снятие наличных (до 50 млн)', start: '1.5%', dev: '1.0%', corp: '0.5%' },
  { name: 'Корпоративные карты', start: '1 шт', dev: '3 шт', corp: 'Безлимитно' },
  { name: 'Онлайн-бухгалтерия', start: false, dev: true, corp: true },
  { name: 'Валютный контроль', start: false, dev: 'Базовый', corp: 'Приоритетный' },
  { name: 'Персональный менеджер', start: false, dev: true, corp: true },
  { name: 'API для интеграции', start: false, dev: false, corp: true }
];

const PricingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Тарифные планы для бизнеса</h1>
          <p>Выберите подходящий тариф и начните развивать свой бизнес вместе с нами</p>
        </motion.div>
      </header>

      <section className={styles.tableSection}>
        <div className={styles.tableWrapper}>
          <table className={styles.pricingTable}>
            <thead>
              <tr>
                <th className={styles.featureCol}>Услуги</th>
                <th>
                  <div className={styles.planHeader}>
                    <h3>Старт</h3>
                    <div className={styles.price}>0<span>/мес</span></div>
                    <Link href="/business/open-account?plan=start" className={styles.planButton}>Выбрать</Link>
                  </div>
                </th>
                <th>
                  <div className={`${styles.planHeader} ${styles.recommended}`}>
                    <div className={styles.popularBadge}>Популярный</div>
                    <h3>Развитие</h3>
                    <div className={styles.price}>119 000<span>/мес</span></div>
                    <Link href="/business/open-account?plan=development" className={styles.planButton}>Выбрать</Link>
                  </div>
                </th>
                <th>
                  <div className={styles.planHeader}>
                    <h3>Корпорация</h3>
                    <div className={styles.price}>319 000<span>/мес</span></div>
                    <Link href="/business/open-account?plan=corporation" className={styles.planButton}>Выбрать</Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx}>
                  <td className={styles.featureName}>
                    {feature.name}
                    <MdInfoOutline className={styles.infoIcon} />
                  </td>
                  <td>{renderValue(feature.start)}</td>
                  <td className={styles.recommendedCol}>{renderValue(feature.dev)}</td>
                  <td>{renderValue(feature.corp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.faq}>
        <h2>Часто задаваемые вопросы</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4>Как сменить тарифный план?</h4>
            <p>Вы можете сменить тариф в любое время в мобильном приложении или интернет-банке. Изменения вступят в силу с первого числа следующего месяца.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Какие документы нужны для открытия счета?</h4>
            <p>Для индивидуальных предпринимателей — только паспорт. Для юридических лиц — паспорт руководителя, устав и свидетельство о регистрации.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const renderValue = (val) => {
  if (val === true) return <MdDone className={styles.checkIcon} />;
  if (val === false) return <MdClose className={styles.closeIcon} />;
  return val;
};

export default PricingPage;
