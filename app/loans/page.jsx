'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHandHoldingUsd, FaHome, FaCar, FaUniversity, FaTimes, FaCheckCircle } from 'react-icons/fa';
import styles from './page.module.scss';
import LoanCalculator from '../components/LoanCalculator';

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
    rate: 22,
    maxAmount: 300000000,
    maxTerm: 60,
  },
  {
    name: 'Ипотечный',
    icon: <FaHome />,
    description: 'Для покупки квартиры, дома или строительства собственного жилья.',
    note: 'Пример: первоначальный взнос от 20%, срок до 25 лет.',
    rate: 18,
    maxAmount: 2000000000,
    maxTerm: 300,
  },
  {
    name: 'Автокредит',
    icon: <FaCar />,
    description: 'Новый или подержанный автомобиль на удобных условиях.',
    note: 'Пример: финансирование до 90% стоимости авто.',
    rate: 24,
    maxAmount: 500000000,
    maxTerm: 60,
  },
  {
    name: 'Образовательный',
    icon: <FaUniversity />,
    description: 'Инвестиции в ваше образование и развитие.',
    note: 'Пример: льготный период на время обучения.',
    rate: 14,
    maxAmount: 100000000,
    maxTerm: 120,
  },
];

export default function LoansPage() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApplyClick = (loan) => {
    setSelectedLoan(loan);
    setShowCalculator(true);
    setIsSuccess(false);
    setIsLoading(false);
  };

  const handleApply = (calcData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowCalculator(false);
    setSelectedLoan(null);
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
              Выберите подходящий кредитный продукт и рассчитайте условия с помощью нашего калькулятора.
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
                <button
                  className={styles.primaryButton}
                  onClick={() => handleApplyClick(loan)}
                >
                  Оставить заявку
                </button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showCalculator && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={closeModal}>
                <FaTimes />
              </button>

              {isLoading ? (
                <div className={styles.loadingState}>
                  <div className={styles.spinner}></div>
                  <p>Обработка заявки...</p>
                </div>
              ) : isSuccess ? (
                <div className={styles.successState}>
                  <FaCheckCircle className={styles.successIcon} />
                  <h3>Заявка принята!</h3>
                  <p>Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
                  <button className={styles.confirmBtn} onClick={closeModal}>
                    Понятно
                  </button>
                </div>
              ) : (
                <LoanCalculator loan={selectedLoan} onApply={handleApply} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


