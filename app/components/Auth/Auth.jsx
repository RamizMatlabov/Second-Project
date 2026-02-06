'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import styles from './Auth.module.scss';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }
    if (!isLogin && formData.name.length < 2) {
      setError('Имя должно содержать минимум 2 символа');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Вход
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccess('Вход выполнен успешно!');
      } else {
        // Регистрация
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
        setSuccess('Регистрация успешно завершена!');
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Ошибка:', error);
      setError(isLogin ? 'Ошибка входа: ' : 'Ошибка регистрации: ' + (error.message || 'Неизвестная ошибка'));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className={styles.container}>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label htmlFor="name">Имя:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Введите ваше имя"
              disabled={loading}
            />
          </div>
        )}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Введите ваш email"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Введите пароль"
            disabled={loading}
          />
        </div>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Повторите пароль"
              disabled={loading}
            />
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button 
          type="submit" 
          className={styles.button}
          disabled={loading}
        >
          {loading ? (isLogin ? 'Вход...' : 'Регистрация...') : (isLogin ? 'Войти' : 'Зарегистрироваться')}
        </button>
        <button 
          type="button" 
          onClick={toggleMode} 
          className={styles.toggleButton}
          disabled={loading}
        >
          {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
        </button>
      </form>
    </div>
  );
} 