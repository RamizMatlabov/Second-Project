'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCreditCard, FaMobileAlt, FaGlobeEurope, FaShieldAlt } from 'react-icons/fa';
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

const cardProducts = [
  {
    name: 'SafePoint Bank HUMO',
    badge: 'Премиальная',
    description: 'Максимальные привилегии для требовательных клиентов.',
    benefits: [
      'Кэшбэк до 10% в избранных категориях',
      'Доступ в бизнес‑залы аэропортов',
      'Персональный финансовый ассистент',
    ],
    logoSrc: '/humo.png',
  },
  {
    name: 'SafePoint Bank Visa',
    badge: 'Для путешествий',
    description: 'Идеальное решение для тех, кто часто в пути.',
    benefits: [
      '0% комиссия за операции за рубежом',
      'Расширенная страховка путешественника',
      'Консьерж‑сервис 24/7',
    ],
    logoSrc: '/visa.png',
  },
  {
    name: 'SafePoint Bank UZCARD',
    badge: 'На каждый день',
    description: 'Удобная карта для повседневных покупок.',
    benefits: [
      'Кэшбэк до 5% в супермаркетах и кафе',
      'Мгновенные переводы между картами',
      'Управление лимитами в приложении',
    ],
    logoSrc: '/uzcard.png',
  },
];

const featureHighlights = [
  {
    icon: <FaMobileAlt />,
    title: 'Управление из приложения',
    description: 'Блокировка, смена пин‑кода, установка лимитов и пуш‑уведомления в один клик.',
  },
  {
    icon: <FaGlobeEurope />,
    title: 'Карты для поездок',
    description: 'Выгодный курс, поддержка Apple Pay/Google Pay и бесплатные операции за границей по выбранным тарифам.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Усиленная безопасность',
    description: '3‑D Secure, мониторинг подозрительных операций и мгновенные оповещения.',
  },
];

export default function CardsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>Банковские карты SafePoint</h1>
          <p>
            Подберите карту под свой образ жизни — от повседневных покупок до премиальных путешествий.
          </p>
        </motion.div>
      </section>

      <section className={styles.products}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Типы карт</h2>
            <p>
              Выберите карту, которая лучше всего соответствует вашим целям. Ниже приведены примерные
              продукты — позже их можно заменить реальными тарифами.
            </p>
          </motion.div>

          <motion.div
            className={styles.cardGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {cardProducts.map((card) => (
              <motion.article
                key={card.name}
                className={styles.cardProduct}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className={styles.cardVisual}>
                  <Image
                    src={card.logoSrc}
                    alt={card.name}
                    width={420}
                    height={260}
                    className={styles.cardImage}
                  />
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div>
                      <span className={styles.badge}>{card.badge}</span>
                      <h3>{card.name}</h3>
                    </div>
                    <div className={styles.cardIcon}>
                      <FaCreditCard />
                    </div>
                  </div>

                  <p className={styles.cardDescription}>{card.description}</p>

                  <ul className={styles.cardBenefits}>
                    {card.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <div className={styles.cardFooter}>
                    <div className={styles.cardMeta}>
                      <div className={styles.cardMetaItem}>
                        <span className={styles.cardMetaLabel}>Оформление</span>
                        <span className={styles.cardMetaValue}>бесплатно</span>
                      </div>
                      <div className={styles.cardMetaItem}>
                        <span className={styles.cardMetaLabel}>Обслуживание</span>
                        <span className={styles.cardMetaValue}>от 0 UZS в месяц</span>
                      </div>
                      <div className={styles.cardMetaItem}>
                        <span className={styles.cardMetaLabel}>Комиссии</span>
                        <span className={styles.cardMetaValue}>прозрачные условия</span>
                      </div>
                    </div>

                    <div className={styles.cardActions}>
                      <button className={styles.primaryButton}>
                        Оформить карту
                      </button>
                      <button className={styles.secondaryButton}>
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Возможности карт</h2>
            <p>
              Основные преимущества карт SafePoint. Здесь можно будет отобразить реальные условия и
              тарифы после интеграции с бэкендом.
            </p>
          </motion.div>

          <motion.div
            className={styles.featureGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {featureHighlights.map((item) => (
              <motion.div
                key={item.title}
                className={styles.featureCard}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className={styles.featureIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}


