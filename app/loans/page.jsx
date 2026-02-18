'use client';

import { motion } from 'framer-motion';
import { FaHandHoldingUsd, FaHome, FaCar, FaUniversity } from 'react-icons/fa';
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

const loanProducts = [
  {
    name: 'Потребительский',
    icon: <FaHandHoldingUsd />,
    description: 'Для личных целей: ремонт, техника, путешествия и любые другие планы.',
    note: 'Пример: сумма до 300 000 000 сум, срок до 5 лет.',
  },
  {
    name: 'Ипотечный',
    icon: <FaHome />,
    description: 'Для покупки квартиры, дома или строительства собственного жилья.',
    note: 'Пример: первоначальный взнос от 20%, срок до 25 лет.',
  },
  {
    name: 'Автокредит',
    icon: <FaCar />,
    description: 'Новый или подержанный автомобиль на удобных условиях.',
    note: 'Пример: финансирование до 90% стоимости авто.',
  },
  {
    name: 'Образовательный',
    icon: <FaUniversity />,
    description: 'Инвестиции в ваше образование и развитие.',
    note: 'Пример: льготный период на время обучения.',
  },
];

export default function LoansPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>Кредиты SafePoint</h1>
          <p>
            Поддержим ваши планы — от первых покупок до крупных жизненных решений.
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
            <h2>Виды кредитов</h2>
            <p>
              Ниже представлены примерные категории кредитных продуктов. В дальнейшем сюда можно
              вывести реальные предложения банка.
            </p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {loanProducts.map((loan) => (
              <motion.article
                key={loan.name}
                className={styles.loanCard}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className={styles.icon}>{loan.icon}</div>
                <h3>{loan.name}</h3>
                <p className={styles.description}>{loan.description}</p>
                <p className={styles.note}>{loan.note}</p>
                <button className={styles.primaryButton}>
                  Оставить заявку
                </button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}


