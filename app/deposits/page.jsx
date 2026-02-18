'use client';

import { motion } from 'framer-motion';
import { FaPiggyBank, FaPercent, FaCalendarAlt } from 'react-icons/fa';
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

const depositTypes = [
  {
    name: 'Накопительный',
    rate: 'до 14% годовых',
    term: 'от 3 до 24 месяцев',
    description: 'Подходит для постепенного формирования финансовой подушки.',
  },
  {
    name: 'Срочный',
    rate: 'до 16% годовых',
    term: 'от 6 до 36 месяцев',
    description: 'Максимальная ставка при фиксированном сроке размещения.',
  },
  {
    name: 'Управляемый',
    rate: 'до 12% годовых',
    term: 'от 1 до 18 месяцев',
    description: 'Можно пополнять и частично снимать средства без потери процентов.',
  },
];

const infoBlocks = [
  {
    icon: <FaPercent />,
    title: 'Начисление процентов',
    text: 'Проценты начисляются ежемесячно и могут капитализироваться или выводиться на карту — это настраивается в договоре.',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Гибкие сроки',
    text: 'Выберите удобный срок размещения и валюту вклада. Здесь позже появятся реальные условия банка.',
  },
];

export default function DepositsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>Вклады SafePoint</h1>
          <p>
            Сохраните и приумножьте капитал с помощью продуманных вкладов под конкурентные ставки.
          </p>
        </motion.div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Типы вкладов</h2>
            <p>
              Ниже представлены примерные варианты вкладов. В дальнейшем сюда можно подгружать
              реальные продукты из API.
            </p>
          </motion.div>

          <motion.div
            className={styles.cardsGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {depositTypes.map((item) => (
              <motion.article
                key={item.name}
                className={styles.depositCard}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className={styles.iconCircle}>
                  <FaPiggyBank />
                </div>
                <h3>{item.name}</h3>
                <p className={styles.rate}>{item.rate}</p>
                <p className={styles.term}>{item.term}</p>
                <p className={styles.description}>{item.description}</p>
                <button className={styles.primaryButton}>
                  Рассчитать доходность
                </button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Как работают вклады</h2>
            <p>
              Краткая справочная информация о механике начисления процентов и основных условиях.
              Тексты ниже можно заменить реальными правилами банка.
            </p>
          </motion.div>

          <motion.div
            className={styles.infoGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {infoBlocks.map((block) => (
              <motion.div
                key={block.title}
                className={styles.infoCard}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className={styles.infoIcon}>{block.icon}</div>
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}


