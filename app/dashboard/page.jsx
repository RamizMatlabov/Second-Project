'use client';
import { useAuth } from '../context/AuthContext';
import styles from './page.module.scss';
import { motion } from 'framer-motion';
import { MdArrowUpward, MdArrowDownward, MdShoppingCart, MdRestaurant, MdWork } from 'react-icons/md';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();

  // Mock data
  const balance = 125400.50;
  const transactions = [
    { id: 1, title: 'Супермаркет "Магнит"', date: 'Сегодня, 14:20', amount: -1250.00, type: 'expense', icon: <MdShoppingCart /> },
    { id: 2, title: 'Зарплата', date: 'Вчера, 10:00', amount: 85000.00, type: 'income', icon: <MdWork /> },
    { id: 3, title: 'Ресторан "Sky Lounge"', date: '11 Фев, 21:15', amount: -4500.00, type: 'expense', icon: <MdRestaurant /> },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Привет, {user?.displayName || 'Пользователь'}!
        </motion.h1>
        <p>Добро пожаловать в ваш личный кабинет SafePoint Bank.</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.cardSection}>
          <motion.div 
            className={styles.balanceCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Общий баланс</h3>
            <span className={styles.amount}>
              {balance.toLocaleString('ru-RU')} ₽
            </span>
            <div className={styles.actions}>
              <button className={styles.topUp}>Пополнить</button>
              <button className={styles.withdraw}>Вывести</button>
            </div>
          </motion.div>

          <motion.div 
            className={styles.bankCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.chip} />
            <div className={styles.cardNumber}>**** **** **** 4582</div>
            <div className={styles.cardFooter}>
              <div>
                <div className={styles.label}>Владелец</div>
                <div className={styles.value}>{user?.displayName?.toUpperCase() || 'VALUED CUSTOMER'}</div>
              </div>
              <div>
                <div className={styles.label}>Срок</div>
                <div className={styles.value}>12/28</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.transactionsSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.sectionHeader}>
            <h3>Последние операции</h3>
            <Link href="/dashboard/history" className={styles.viewAll}>Смотреть все</Link>
          </div>

          <div className={styles.transactionList}>
            {transactions.map((tx) => (
              <div key={tx.id} className={styles.transactionItem}>
                <div className={`${styles.icon} ${styles[tx.type]}`}>
                  {tx.icon}
                </div>
                <div className={styles.info}>
                  <span className={styles.title}>{tx.title}</span>
                  <span className={styles.date}>{tx.date}</span>
                </div>
                <div className={`${styles.amount} ${styles[tx.type]}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
