'use client';
import styles from './page.module.scss';
import { motion } from 'framer-motion';
import { 
  MdShoppingCart, 
  MdRestaurant, 
  MdWork, 
  MdSwapHoriz, 
  MdCheckCircle, 
  MdSchedule 
} from 'react-icons/md';

export default function HistoryPage() {
  // Mock data
  const operations = [
    { id: 1, name: 'Супермаркет "Магнит"', category: 'Продукты', date: '13 Фев 2026, 14:20', amount: -1250.00, type: 'expense', status: 'completed', icon: <MdShoppingCart /> },
    { id: 2, name: 'Зарплата', category: 'Доход', date: '12 Фев 2026, 10:00', amount: 85000.00, type: 'income', status: 'completed', icon: <MdWork /> },
    { id: 3, name: 'Перевод Ивану К.', category: 'Переводы', date: '11 Фев 2026, 18:30', amount: -2000.00, type: 'expense', status: 'completed', icon: <MdSwapHoriz /> },
    { id: 4, name: 'Ресторан "Sky Lounge"', category: 'Развлечения', date: '11 Фев 2026, 21:15', amount: -4500.00, type: 'expense', status: 'completed', icon: <MdRestaurant /> },
    { id: 5, name: 'Подписка Netflix', category: 'Сервисы', date: '10 Фев 2026, 09:00', amount: -799.00, type: 'expense', status: 'pending', icon: <MdShoppingCart /> },
    { id: 6, name: 'Кэшбэк за покупки', category: 'Доход', date: '09 Фев 2026, 12:00', amount: 450.20, type: 'income', status: 'completed', icon: <MdWork /> },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          История операций
        </motion.h1>

        <div className={styles.filters}>
          <select defaultValue="all">
            <option value="all">Все операции</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
          </select>
          <select defaultValue="month">
            <option value="month">За месяц</option>
            <option value="week">За неделю</option>
            <option value="year">За год</option>
          </select>
        </div>
      </header>

      <motion.div 
        className={styles.tableWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Операция</th>
              <th>Категория</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op) => (
              <tr key={op.id}>
                <td>
                  <div className={styles.operation}>
                    <div className={`${styles.icon} ${styles[op.type]}`}>
                      {op.icon}
                    </div>
                    <span className={styles.name}>{op.name}</span>
                  </div>
                </td>
                <td>{op.category}</td>
                <td className={styles.date}>{op.date}</td>
                <td>
                  <span className={`${styles.status} ${styles[op.status]}`}>
                    {op.status === 'completed' ? <MdCheckCircle /> : <MdSchedule />}
                    {op.status === 'completed' ? 'Выполнено' : 'В обработке'}
                  </span>
                </td>
                <td className={`${styles.amount} ${styles[op.type]}`}>
                  {op.amount > 0 ? '+' : ''}{op.amount.toLocaleString('ru-RU')} ₽
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
