'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdExpandMore, MdCreditCard, MdAccountBalance, MdSmartphone, MdSearch, MdHelpOutline, MdChat } from 'react-icons/md';
import styles from './page.module.scss';

const faqData = [
  {
    id: 'cards',
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
    id: 'accounts',
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
    id: 'app',
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

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={styles.accordionItem}>
      <button 
        className={`${styles.question} ${isOpen ? styles.open : ''}`} 
        onClick={onClick}
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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaq = useMemo(() => {
    return faqData.map(cat => ({
      ...cat,
      questions: cat.questions.filter(q => 
        q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
        q.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(cat => 
      (activeCategory === 'all' || cat.id === activeCategory) && 
      cat.questions.length > 0
    );
  }, [searchTerm, activeCategory]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Часто задаваемые вопросы</h1>
          <p>Найдите ответы на популярные вопросы о наших услугах</p>
        </motion.div>

        <div className={styles.searchWrapper}>
          <MdSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Поиск по вопросам и ответам..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <button 
            className={`${styles.categoryBtn} ${activeCategory === 'all' ? styles.active : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <MdHelpOutline /> Все категории
          </button>
          {faqData.map(cat => (
            <button 
              key={cat.id}
              className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon} {cat.category}
            </button>
          ))}
        </aside>

        <div className={styles.faqList}>
          {filteredFaq.length > 0 ? (
            filteredFaq.map((category, catIdx) => (
              <section key={category.id} className={styles.categorySection}>
                <div className={styles.categoryTitle}>
                  <span className={styles.icon}>{category.icon}</span>
                  <h2>{category.category}</h2>
                </div>
                <div className={styles.accordionList}>
                  {category.questions.map((item, qIdx) => {
                    const uniqueId = `${catIdx}-${qIdx}`;
                    return (
                      <AccordionItem 
                        key={qIdx} 
                        question={item.q} 
                        answer={item.a} 
                        isOpen={openIndex === uniqueId}
                        onClick={() => setOpenIndex(openIndex === uniqueId ? null : uniqueId)}
                      />
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            <div className={styles.noResults}>
              <MdSearch className={styles.noResultsIcon} />
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить запрос</p>
            </div>
          )}
        </div>
      </div>

      <section className={styles.supportCta}>
        <div className={styles.ctaCard}>
          <MdChat className={styles.ctaIcon} />
          <div className={styles.ctaText}>
            <h3>Не нашли ответ?</h3>
            <p>Наши специалисты службы поддержки всегда готовы помочь вам 24/7.</p>
          </div>
          <button className={styles.contactBtn}>Связаться с нами</button>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
