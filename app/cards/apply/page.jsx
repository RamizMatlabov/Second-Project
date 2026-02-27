'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from '../page.module.scss';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

const initialFormState = (cardFromQuery = '') => ({
  fullName: '',
  phone: '',
  email: '',
  cardType: cardFromQuery,
  pickupPoint: '',
});

export default function CardApplyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardFromQuery = searchParams.get('card') || '';

  const [formData, setFormData] = useState(() => initialFormState(cardFromQuery));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status.type === 'success' && status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: null, message: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validate = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Пожалуйста, укажите ФИО.';
    }

    if (!data.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона.';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите e‑mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = 'Укажите корректный e‑mail.';
    }

    if (!data.cardType.trim()) {
      newErrors.cardType = 'Пожалуйста, укажите тип карты.';
    }

    if (!data.pickupPoint.trim()) {
      newErrors.pickupPoint = 'Пожалуйста, выберите пункт выдачи.';
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setStatus({ type: 'error', message: 'Пожалуйста, войдите в аккаунт, чтобы оставить заявку.' });
      return;
    }

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: 'error', message: 'Проверьте правильность заполнения полей.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      // Запускаем сохранение в Firestore и отправку на API параллельно
      const firestorePromise = addDoc(collection(db, 'applications'), {
        userId: user.uid,
        userName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        cardType: formData.cardType,
        pickupPoint: formData.pickupPoint,
        status: 'pending',
        createdAt: serverTimestamp(),
      }).catch(err => {
        console.error('Firestore error (non-blocking):', err);
        return null; // Не блокируем процесс, если Firestore подвел
      });

      const apiPromise = fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Ждем ответа от API, сохранение в Firestore может идти параллельно
      const response = await apiPromise;
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = data.message || 'Не удалось отправить заявку. Попробуйте ещё раз.';
        setStatus({ type: 'error', message });
        setIsSubmitting(false);
        return;
      }

      setStatus({
        type: 'success',
        message: 'Заявка успешно отправлена! Переходим в личный кабинет...',
      });

      setFormData((prev) => ({
        ...initialFormState(prev.cardType),
      }));

      // Перенаправляем быстрее
      setTimeout(() => {
        router.push('/profile');
      }, 800);
    } catch (error) {
      console.error('Error submitting application:', error);
      setStatus({
        type: 'error',
        message: 'Произошла ошибка при отправке заявки. Попробуйте ещё раз позже.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <h1>Оформление банковской карты</h1>
          <p>
            Заполните форму ниже, чтобы отправить заявку на оформление карты SafePoint Bank.
          </p>
        </motion.div>
      </section>

      <section className={styles.checkout}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Данные для оформления</h2>
            <p>
              Укажите свои контактные данные. После отправки заявки специалист банка свяжется с вами
              для подтверждения и уточнения деталей.
            </p>
          </motion.div>

          <form className={styles.checkoutForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>
              <div className={styles.formField}>
                <label htmlFor="fullName">ФИО *</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <span className={styles.fieldError}>{errors.fullName}</span>
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="pickupPoint">Пункт выдачи *</label>
                <select
                  id="pickupPoint"
                  name="pickupPoint"
                  value={formData.pickupPoint}
                  onChange={handleChange}
                >
                  <option value="">Выберите пункт выдачи</option>
                  <option value="Центральное отделение, Ташкент">
                    Центральное отделение, Ташкент
                  </option>
                  <option value="Отделение в ТРЦ, Ташкент">
                    Отделение в ТРЦ, Ташкент
                  </option>
                  <option value="Отделение, Самарканд">Отделение, Самарканд</option>
                  <option value="Отделение, Бухара">Отделение, Бухара</option>
                </select>
                {errors.pickupPoint && (
                  <span className={styles.fieldError}>{errors.pickupPoint}</span>
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="phone">Мобильный телефон *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
              </div>

              <div className={styles.formField}>
                <label htmlFor="email">E‑mail *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
              </div>

              <div className={styles.formField}>
                <label htmlFor="cardType">Тип карты *</label>
                {cardFromQuery ? (
                  <>
                    <input
                      id="cardType"
                      name="cardType"
                      type="text"
                      value={formData.cardType}
                      readOnly
                    />
                    <small className={styles.fieldHint}>
                      Тип карты выбран на предыдущей странице и не может быть изменён.
                    </small>
                  </>
                ) : (
                  <input
                    id="cardType"
                    name="cardType"
                    type="text"
                    value={formData.cardType}
                    onChange={handleChange}
                    placeholder="Например, SafePoint Bank HUMO"
                  />
                )}
                {errors.cardType && (
                  <span className={styles.fieldError}>{errors.cardType}</span>
                )}
              </div>
            </div>

            {status.message && (
              <div
                className={
                  status.type === 'success'
                    ? styles.statusSuccess
                    : styles.statusError
                }
              >
                {status.message}
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Обработка заявки…' : 'Подтвердить заявку'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

