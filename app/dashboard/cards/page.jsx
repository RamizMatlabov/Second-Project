'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './page.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLock, MdLockOpen, MdSettings, MdCreditCard } from 'react-icons/md';

export default function CardsPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([
    { id: 1, number: '4582 1234 5678 9012', type: 'visa', balance: 125400.50, locked: false, brand: 'VISA' },
    { id: 2, number: '5412 8765 4321 0987', type: 'mastercard', balance: 4500.00, locked: true, brand: 'MasterCard' },
  ]);

  const toggleLock = (id) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, locked: !card.locked } : card
    ));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Мои карты
        </motion.h1>
        <button className={styles.addCard}>+ Добавить карту</button>
      </header>

      <div className={styles.cardsGrid}>
        {cards.map((card, index) => (
          <motion.div 
            key={card.id}
            className={`${styles.cardWrapper} ${card.locked ? styles.locked : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`${styles.bankCard} ${styles[card.type]}`}>
              <div className={styles.chip} />
              <div className={styles.cardNumber}>{card.number}</div>
              <div className={styles.cardFooter}>
                <div>
                  <div className={styles.label}>Баланс</div>
                  <div className={styles.value}>{card.balance.toLocaleString('ru-RU')} ₽</div>
                </div>
                <div className={styles.brand}>{card.brand}</div>
              </div>

              <div className={styles.lockOverlay}>
                <MdLock />
                <span>Заблокирована</span>
              </div>
            </div>

            <div className={styles.cardActions}>
              <button 
                className={`${styles.lockBtn} ${card.locked ? styles.active : ''}`}
                onClick={() => toggleLock(card.id)}
              >
                {card.locked ? <MdLockOpen /> : <MdLock />}
                {card.locked ? 'Разблокировать' : 'Заблокировать'}
              </button>
              <button>
                <MdSettings />
                Лимиты
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
