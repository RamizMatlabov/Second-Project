'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdDone, MdClose, MdInfoOutline, MdAccountBalance, MdTrendingUp, MdBusiness, MdRocketLaunch, MdHelpOutline, MdHeadsetMic } from 'react-icons/md';
import styles from './page.module.scss';

const plans = [
  {
    id: 'start',
    name: 'Старт',
    price: '0',
    description: 'Идеально для новых предпринимателей и малого бизнеса',
    features: ['Бесплатное открытие', '5 платежей в месяц', '1 корп. карта'],
    icon: <MdRocketLaunch />,
    recommended: false
  },
  {
    id: 'development',
    name: 'Развитие',
    price: '119 000',
    description: 'Для активно растущих компаний с большими оборотами',
    features: ['50 платежей в месяц', '3 корп. карты', 'Персональный менеджер'],
    icon: <MdTrendingUp />,
    recommended: true
  },
  {
    id: 'corporation',
    name: 'Корпорация',
    price: '319 000',
    description: 'Максимальные возможности для крупного бизнеса',
    features: ['Безлимитные платежи', 'Безлимитные карты', 'Валютный контроль'],
    icon: <MdBusiness />,
    recommended: false
  }
];

const features = [
  { name: 'Открытие счета', start: 'Бесплатно', dev: 'Бесплатно', corp: 'Бесплатно', info: 'Удаленное открытие счета за 1 день' },
  { name: 'Ежемесячное обслуживание', start: '0 UZS', dev: '119 000 UZS', corp: '319 000 UZS', info: 'Стоимость ведения счета в месяц' },
  { name: 'Бесплатные платежи (шт)', start: '5', dev: '50', corp: 'Безлимитно', info: 'Количество бесплатных межбанковских платежей' },
  { name: 'Комиссия сверх лимита', start: '2 000 UZS', dev: '1 500 UZS', corp: '0 UZS', info: 'Стоимость одного платежа после превышения лимита' },
  { name: 'Снятие наличных (до 50 млн)', start: '1.5%', dev: '1.0%', corp: '0.5%', info: 'Комиссия за снятие наличных в кассах и банкоматах' },
  { name: 'Корпоративные карты', start: '1 шт', dev: '3 шт', corp: 'Безлимитно', info: 'Выпуск и обслуживание бизнес-карт' },
  { name: 'Онлайн-бухгалтерия', start: false, dev: true, corp: true, info: 'Автоматический расчет налогов и отчетность' },
  { name: 'Валютный контроль', start: false, dev: 'Базовый', corp: 'Приоритетный', info: 'Поддержка при проведении валютных операций' },
  { name: 'Персональный менеджер', start: false, dev: true, corp: true, info: 'Выделенный специалист для решения ваших вопросов' },
  { name: 'API для интеграции', start: false, dev: false, corp: true, info: 'Доступ к банковским операциям через API' }
];

const PricingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.headerContent}
        >
          <div className={styles.badge}>Тарифы 2026</div>
          <h1>Выберите идеальный тариф для вашего бизнеса</h1>
          <p>Прозрачные условия, никаких скрытых комиссий и персональный подход к каждому клиенту.</p>
        </motion.div>
      </header>

      <section className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <h2>Тарифные планы</h2>
          <p>Детальное сравнение всех возможностей и условий</p>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.pricingTable}>
            <thead>
              <tr>
                <th className={styles.featureCol}>Возможности</th>
                {plans.map(plan => (
                  <th key={plan.id} className={plan.recommended ? styles.recommendedColHeader : ''}>
                    <div className={styles.tablePlanHeader}>
                      {plan.recommended && <div className={styles.popBadge}>Популярный</div>}
                      <div className={styles.planIcon}>{plan.icon}</div>
                      <h3>{plan.name}</h3>
                      <div className={styles.planPrice}>
                        <span className={styles.amount}>{plan.price}</span>
                        <span className={styles.period}>/мес</span>
                      </div>
                      <Link href={`/business/open-account?plan=${plan.id}`} className={styles.planButton}>
                        Выбрать
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className={styles.tableRow}>
                  <td className={styles.featureName}>
                    <div className={styles.featureInfo}>
                      {feature.name}
                      <div className={styles.infoTooltip}>
                        <MdInfoOutline className={styles.infoIcon} />
                        <span className={styles.tooltipText}>{feature.info}</span>
                      </div>
                    </div>
                  </td>
                  <td className={styles.valueCell}>{renderValue(feature.start)}</td>
                  <td className={`${styles.valueCell} ${styles.recommendedColCell}`}>{renderValue(feature.dev)}</td>
                  <td className={styles.valueCell}>{renderValue(feature.corp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionHeader}>
          <MdHelpOutline className={styles.headerIcon} />
          <h2>Часто задаваемые вопросы</h2>
        </div>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4>Как сменить тарифный план?</h4>
            <p>Вы можете сменить тариф в любое время в мобильном приложении или интернет-банке. Изменения вступят в силу с первого числа следующего месяца.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Какие документы нужны для открытия счета?</h4>
            <p>Для индивидуальных предпринимателей — только паспорт. Для юридических лиц — паспорт руководителя, устав и свидетельство о регистрации.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Можно ли иметь несколько счетов на разных тарифах?</h4>
            <p>Да, вы можете открыть несколько расчетных счетов и выбрать для каждого наиболее подходящий тарифный план.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Как происходит списание абонентской платы?</h4>
            <p>Абонентская плата списывается ежемесячно в дату открытия счета. Если на счету недостаточно средств, функции тарифа могут быть временно ограничены.</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={styles.ctaCard}
        >
          <div className={styles.ctaContent}>
            <h2>Нужна помощь с выбором?</h2>
            <p>Наши специалисты помогут подобрать оптимальный тариф под задачи вашего бизнеса.</p>
            <div className={styles.ctaActions}>
              <Link href="/contacts" className={styles.ctaPrimary}>
                <MdHeadsetMic /> Связаться с нами
              </Link>
              <Link href="/business" className={styles.ctaSecondary}>
                Узнать больше
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const renderValue = (val) => {
  if (val === true) return <MdDone className={styles.checkIcon} />;
  if (val === false) return <MdClose className={styles.closeIcon} />;
  return <span className={styles.textValue}>{val}</span>;
};

export default PricingPage;
