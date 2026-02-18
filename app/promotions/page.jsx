'use client';

import { motion } from 'framer-motion';
import { FaGift, FaPercent, FaBolt } from 'react-icons/fa';
import styles from './page.module.scss';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: {
    staggerChildren: 0.1,
  },
};

const promoItems = [
  {
    type: 'Карта',
    title: 'Кэшбэк до 15% на путешествия',
    description:
      'Повышенный кэшбэк по премиальным картам SafePoint Travel на авиабилеты, отели и аренду авто.',
    label: 'До 30 июня',
  },
  {
    type: 'Вклад',
    title: 'Повышенная ставка на новые вклады',
    description:
      'Откройте новый вклад онлайн и получите дополнительный бонус к базовой ставке.',
    label: 'Только онлайн‑оформление',
  },
  {
    type: 'Кредит',
    title: 'Льготный период до 90 дней',
    description:
      'Оформите кредитную карту и пользуйтесь средствами без процентов в течение льготного периода.',
    label: 'Условия могут отличаться в зависимости от тарифа',
  },
];

export default function PromotionsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>Акции и специальные предложения</h1>
          <p>
            Актуальные промо‑предложения, бонусы и повышенные ставки для клиентов SafePoint Bank.
          </p>
        </motion.div>
      </section>

      <section className={styles.promos}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Текущие акции</h2>
            <p>
              Ниже представлены примеры активных акций. В дальнейшем блок можно наполнить данными
              из CMS или бэкенда.
            </p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {promoItems.map((promo) => (
              <motion.article
                key={promo.title}
                className={styles.promoCard}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className={styles.promoMeta}>
                  <span className={styles.badge}>{promo.type}</span>
                  <span className={styles.label}>{promo.label}</span>
                </div>
                <h3>{promo.title}</h3>
                <p className={styles.description}>{promo.description}</p>
                <button className={styles.outlineButton}>
                  Подробнее об условиях
                </button>
              </motion.article>
            ))}
          </motion.div>

          <section className={styles.notice}>
            <div className={styles.noticeIcon}>
              <FaPercent />
            </div>
            <div className={styles.noticeContent}>
              <h2>Важно</h2>
              <p>
                Все указанные условия являются примером. После подключения реальных продуктов сюда
                необходимо будет подставлять юридически значимую информацию и полные правила акций.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaIcon}>
            <FaGift />
          </div>
          <div className={styles.ctaContent}>
            <h2>Подпишитесь на новые предложения</h2>
            <p>
              В будущем здесь можно будет подключить подписку на email‑ или пуш‑уведомления о
              новых акциях и бонусах.
            </p>
          </div>
          <button className={styles.primaryButton}>
            Подписаться
          </button>
        </div>
      </section>
    </main>
  );
}


