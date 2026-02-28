'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPiggyBank, FaPercent, FaCalendarAlt, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import DepositCalculator from '../components/DepositCalculator';
import styles from './page.module.scss';

const depositTypes = [
  {
    name: 'Накопительный',
    rate: 18,
    minTerm: 3,
    maxTerm: 12,
    description: 'Идеально для постепенного накопления с возможностью пополнения.'
  },
  {
    name: 'Выгодный',
    rate: 23,
    minTerm: 12,
    maxTerm: 36,
    description: 'Максимальная доходность для долгосрочных вложений.'
  },
  {
    name: 'Универсальный',
    rate: 15,
    minTerm: 1,
    maxTerm: 24,
    description: 'Гибкие условия снятия и пополнения в любое время.'
  }
];

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
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculateClick = (deposit) => {
    setSelectedDeposit(deposit);
    setShowCalculator(true);
    setIsSuccess(false);
    setIsLoading(false);
  };

  const handleCloseCalculator = () => {
    setShowCalculator(false);
    setSelectedDeposit(null);
    setIsSuccess(false);
    setIsLoading(false);
  };

  const handleApply = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

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
                <p className={styles.rate}>{item.rate}% годовых</p>
                <p className={styles.term}>от {item.minTerm} до {item.maxTerm} месяцев</p>
                <p className={styles.description}>{item.description}</p>
                <button
                  onClick={() => handleCalculateClick(item)}
                  className={styles.primaryButton}
                >
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

      <AnimatePresence>
        {showCalculator && selectedDeposit && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseCalculator}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: "0", opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 500 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {isLoading ? (
                <div className={styles.loadingMessage}>
                  <FaSpinner className={styles.spinnerIcon} />
                  <h2>Обработка заявки...</h2>
                  <p>Пожалуйста, подождите, мы регистрируем вашу заявку на открытие вклада.</p>
                </div>
              ) : isSuccess ? (
                <div className={styles.successMessage}>
                  <FaCheckCircle className={styles.successIcon} />
                  <h2>Заявка принята!</h2>
                  <p>Заявка на открытие вклада "{selectedDeposit.name}" принята! Наш специалист свяжется с вами в ближайшее время.</p>
                  <button 
                    className={styles.primaryButton} 
                    onClick={handleCloseCalculator}
                  >
                    Понятно
                  </button>
                </div>
              ) : (
                <DepositCalculator deposit={selectedDeposit} onApply={handleApply} />
              )}
              <button className={styles.closeButton} onClick={handleCloseCalculator}>
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


