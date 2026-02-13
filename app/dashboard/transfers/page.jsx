'use client';
import { useState } from 'react';
import styles from './page.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { MdSend, MdCheckCircle } from 'react-icons/md';

export default function TransfersPage() {
  const [formData, setFormData] = useState({
    fromCard: '4582',
    toCard: '',
    amount: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'toCard') {
      // Basic card number formatting
      const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (formData.toCard.length < 19) {
      setError('Введите полный номер карты (16 цифр)');
      setLoading(false);
      return;
    }

    if (parseFloat(formData.amount) <= 0 || !formData.amount) {
      setError('Введите корректную сумму');
      setLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setFormData({ fromCard: '4582', toCard: '', amount: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Произошла ошибка при переводе. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Переводы
        </motion.h1>
      </header>

      <motion.div 
        className={styles.transferCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence>
          {success && (
            <motion.div 
              className={styles.successMessage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <MdCheckCircle size={40} style={{ marginBottom: '1rem' }} />
              <h3>Перевод успешно выполнен!</h3>
              <p>Средства будут зачислены в ближайшее время.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Списать с карты</label>
            <select name="fromCard" value={formData.fromCard} onChange={handleChange}>
              <option value="4582">SafePoint Visa Platinum (**** 4582) — 125 400 ₽</option>
              <option value="0987">SafePoint Mastercard (**** 0987) — 4 500 ₽</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Номер карты получателя</label>
            <input
              type="text"
              name="toCard"
              placeholder="0000 0000 0000 0000"
              value={formData.toCard}
              onChange={handleChange}
              required
            />
            {error && formData.toCard.length > 0 && formData.toCard.length < 19 && (
              <span className={styles.error}>{error}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Сумма перевода</label>
            <div className={styles.amountInput}>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                required
              />
              <span className={styles.currency}>₽</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Сообщение получателю (необязательно)</label>
            <input
              type="text"
              name="message"
              placeholder="Например: Возврат долга"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading || !formData.toCard || !formData.amount}
          >
            {loading ? 'Обработка...' : (
              <>
                <MdSend />
                Перевести
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
