'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import styles from './page.module.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (!isLogin) {
        // Регистрация
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Пароли не совпадают');
        }
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccessMessage('Регистрация успешно завершена! Теперь вы можете войти.');
        setIsLogin(true); // Переключаем на форму входа
      } else {
        // Вход
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccessMessage('Вход выполнен успешно!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.div 
          className={styles.authCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${isLogin ? styles.active : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Вход
            </button>
            <button
              className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Регистрация
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'register'}
              className={styles.form}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              {error && (
                <motion.div 
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {successMessage && (
                <motion.div 
                  className={styles.success}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {successMessage}
                </motion.div>
              )}

              {!isLogin && (
                <div className={styles.formGroup}>
                  <label htmlFor="name">Имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите ваш email"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Введите пароль"
                  required
                />
              </div>

              {!isLogin && (
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Подтвердите пароль</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Подтвердите пароль"
                    required
                  />
                </div>
              )}

              <motion.button
                type="submit"
                className={styles.submitButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
              </motion.button>
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
} 