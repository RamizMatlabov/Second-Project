'use client';

import React from 'react';
import { MdBusinessCenter, MdTrendingUp, MdSecurity, MdSpeed, MdDone } from 'react-icons/md';
import styles from './page.module.scss';

const plans = [
  {
    name: 'Старт',
    price: '0 ₽',
    description: 'Для начинающих предпринимателей',
    features: [
      'Открытие счета за 1 день',
      'Бесплатное мобильное приложение',
      'До 5 платежей в месяц бесплатно',
      'Корпоративная карта'
    ],
    recommended: false
  },
  {
    name: 'Развитие',
    price: '1 990 ₽',
    description: 'Для активно растущего бизнеса',
    features: [
      'Все возможности "Старта"',
      'До 50 платежей в месяц бесплатно',
      'Сниженный процент на эквайринг',
      'Персональный менеджер',
      'Бухгалтерия онлайн'
    ],
    recommended: true
  },
  {
    name: 'Корпорация',
    price: '9 990 ₽',
    description: 'Для крупных компаний',
    features: [
      'Индивидуальные условия',
      'Безлимитные платежи',
      'ВЭД и валютный контроль',
      'Овердрафт на выгодных условиях',
      'API для интеграции'
    ],
    recommended: false
  }
];

const BusinessPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Ваш бизнес заслуживает лучшего банкинга</h1>
          <p>Откройте счет онлайн за 10 минут и получите доступ к экосистеме сервисов для роста вашего дела.</p>
          <button className={styles.ctaButton}>Открыть счет</button>
        </div>
      </header>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <MdSpeed />
          <h3>Быстрый старт</h3>
          <p>Минимум документов, быстрое одобрение и мгновенные реквизиты.</p>
        </div>
        <div className={styles.featureCard}>
          <MdTrendingUp />
          <h3>Инструменты роста</h3>
          <p>Кредитование, лизинг и факторинг для масштабирования бизнеса.</p>
        </div>
        <div className={styles.featureCard}>
          <MdSecurity />
          <h3>Надежная защита</h3>
          <p>Безопасные расчеты и страхование счетов вашего бизнеса.</p>
        </div>
      </section>

      <section className={styles.pricing}>
        <h2>Тарифные планы</h2>
        <div className={styles.plansGrid}>
          {plans.map((plan, idx) => (
            <div key={idx} className={`${styles.planCard} ${plan.recommended ? styles.recommended : ''}`}>
              {plan.recommended && <div className={styles.badge}>Популярный</div>}
              <h3>{plan.name}</h3>
              <div className={styles.price}>{plan.price}<span>/мес</span></div>
              <p className={styles.planDesc}>{plan.description}</p>
              <ul className={styles.planFeatures}>
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx}>
                    <MdDone className={styles.checkIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={styles.planButton}>Выбрать тариф</button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaBox}>
          <MdBusinessCenter className={styles.ctaIcon} />
          <h2>Готовы начать?</h2>
          <p>Присоединяйтесь к тысячам предпринимателей, которые уже выбрали SafePoint Bank.</p>
          <button className={styles.ctaButton}>Оставить заявку</button>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;
