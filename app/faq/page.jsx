'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdExpandMore, MdCreditCard, MdAccountBalance, MdSmartphone } from 'react-icons/md';
import styles from './page.module.scss';

const faqData = [
  {
    category: 'Карты',
    icon: <MdCreditCard />,
    questions: [
      {
        q: 'Как активировать новую карту?',
        a: 'Вы можете активировать карту в мобильном приложении, в любом банкомате SafePoint или позвонив по номеру горячей линии.'
      },
      {
        q: 'Что делать, если я потерял карту?',
        a: 'Немедленно заблокируйте карту в мобильном приложении или позвоните нам. Мы выпустим новую карту в течение 3-5 рабочих дней.'
      },
      {
        q: 'Какие лимиты установлены по моей карте?',
        a: 'Стандартные лимиты зависят от типа вашей карты. Вы можете изменить их в настройках безопасности в личном кабинете.'
      }
    ]
  },
  {
    category: 'Счета',
    icon: <MdAccountBalance />,
    questions: [
      {
        q: 'Как открыть накопительный счет?',
        a: 'Открыть счет можно за пару кликов в мобильном приложении. Процентная ставка начисляется ежедневно на остаток.'
      },
      {
        q: 'Какая комиссия за внешние переводы?',
        a: 'Внутрибанковские переводы бесплатны. Комиссия за межбанковские переводы зависит от суммы и выбранной платежной системы.'
      }
    ]
  },
  {
    category: 'Мобильное приложение',
    icon: <MdSmartphone />,
    questions: [
      {
        q: 'Как восстановить доступ к приложению?',
        a: 'Нажмите "Забыли пароль" на экране входа. Вам потребуется номер карты и доступ к привязанному номеру телефона.'
      },
      {
        q: 'Поддерживает ли приложение FaceID/TouchID?',
        a: 'Да, вы можете включить биометрическую аутентификацию в настройках профиля для быстрого и безопасного входа.'
      }
    ]
  }
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <button 
        className={`${styles.question} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MdExpandMore />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.answerWrapper}
          >
            <div className={styles.answer}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Часто задаваемые вопросы</h1>
        <p>Найдите ответы на популярные вопросы о наших услугах</p>
      </header>

      <div className={styles.faqContent}>
        {faqData.map((category, idx) => (
          <section key={idx} className={styles.categorySection}>
            <div className={styles.categoryTitle}>
              <span className={styles.icon}>{category.icon}</span>
              <h2>{category.category}</h2>
            </div>
            <div className={styles.accordionList}>
              {category.questions.map((item, qIdx) => (
                <AccordionItem key={qIdx} question={item.q} answer={item.a} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
