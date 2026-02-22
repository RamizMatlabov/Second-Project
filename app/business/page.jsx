'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MdBusinessCenter, MdTrendingUp, MdSecurity, MdSpeed, MdDone, MdAccountBalance, MdCreditCard, MdStar } from 'react-icons/md';
import styles from './page.module.scss';

const plans = [
  {
    name: 'Старт',
    price: '0 UZS',
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
    price: '119 000 UZS',
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
    price: '319 000 UZS',
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

const stats = [
  { label: 'Предпринимателей', value: '50,000+' },
  { label: 'Счетов открыто', value: '120,000+' },
  { label: 'Минут на открытие', value: '10' },
  { label: 'Рейтинг App Store', value: '4.9' },
];

const BusinessPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>SafePoint Business</div>
          <h1>Ваш бизнес заслуживает лучшего банкинга</h1>
          <p>Откройте счет онлайн за 10 минут и получите доступ к экосистеме сервисов для роста вашего дела.</p>
          <div className={styles.heroActions}>
            <button className={styles.ctaButton}>Открыть счет</button>
            <button className={styles.secondaryButton}>Узнать больше</button>
          </div>
        </motion.div>
        <div className={styles.heroGlow}></div>
      </header>

      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Преимущества для вашего бизнеса</h2>
          <p>Мы создали инструменты, которые помогают вам сосредоточиться на главном</p>
        </motion.div>
        
        <div className={styles.featuresGrid}>
          {[
            { icon: <MdSpeed />, title: 'Быстрый старт', desc: 'Минимум документов, быстрое одобрение и мгновенные реквизиты.' },
            { icon: <MdTrendingUp />, title: 'Инструменты роста', desc: 'Кредитование, лизинг и факторинг для масштабирования бизнеса.' },
            { icon: <MdSecurity />, title: 'Надежная защита', desc: 'Безопасные расчеты и страхование счетов вашего бизнеса.' },
            { icon: <MdAccountBalance />, title: 'Онлайн-бухгалтерия', desc: 'Автоматический расчет налогов и отправка деклараций.' },
            { icon: <MdCreditCard />, title: 'Корпоративные карты', desc: 'Выпускайте неограниченное количество карт для сотрудников.' },
            { icon: <MdBusinessCenter />, title: 'ВЭД и валюта', desc: 'Выгодный курс и помощь в валютном контроле.' }
          ].map((feature, idx) => (
            <motion.div 
              key={idx} 
              className={styles.featureCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.pricing}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Тарифные планы</h2>
          <p>Прозрачные условия без скрытых комиссий</p>
        </motion.div>

        <div className={styles.plansGrid}>
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx} 
              className={`${styles.planCard} ${plan.recommended ? styles.recommended : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              {plan.recommended && <div className={styles.popularBadge}>Самый популярный</div>}
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
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <motion.div 
          className={styles.ctaBox}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.ctaContent}>
            <MdBusinessCenter className={styles.ctaIcon} />
            <h2>Готовы вывести бизнес на новый уровень?</h2>
            <p>Присоединяйтесь к 50,000+ предпринимателей, которые уже доверили нам свои финансы.</p>
            <button className={styles.ctaButton}>Оставить заявку</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BusinessPage;
