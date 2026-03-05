'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdCheckCircle } from 'react-icons/md';
import styles from './LeadModal.module.scss';

const LeadModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    comment: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Сброс формы при открытии/закрытии
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: '', company: '', phone: '', email: '', comment: '' });
        setErrors({});
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Номер телефона обязателен';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Некорректный формат телефона';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error('Ошибка при отправке');
      }
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <MdClose />
            </button>

            {isSuccess ? (
              <div className={styles.successContent}>
                <MdCheckCircle className={styles.successIcon} />
                <h2>Спасибо!</h2>
                <p>Ваша заявка успешно отправлена. Наш менеджер свяжется с вами в ближайшее время.</p>
                <button className={styles.doneButton} onClick={onClose}>Закрыть</button>
              </div>
            ) : (
              <div className={styles.formContent}>
                <h2>Оставить заявку</h2>
                <p>Заполните форму, и мы перезвоним вам для консультации.</p>
                
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>Ваше имя *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов"
                      className={errors.name ? styles.errorInput : ''}
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Название компании</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="ООО 'Моя Компания'"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Номер телефона *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+998 90 123 45 67"
                      className={errors.phone ? styles.errorInput : ''}
                    />
                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@company.com"
                      className={errors.email ? styles.errorInput : ''}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Ваш вопрос или комментарий</label>
                    <textarea 
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder="Опишите ваш запрос..."
                      rows="3"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
