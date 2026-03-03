'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdBusiness, MdPerson, MdCreditCard, MdUploadFile, MdCheckCircle, MdArrowBack, MdArrowForward } from 'react-icons/md';
import styles from './page.module.scss';

const steps = [
  { id: 1, title: 'Компания', icon: <MdBusiness /> },
  { id: 2, title: 'Контакты', icon: <MdPerson /> },
  { id: 3, title: 'Тариф', icon: <MdCreditCard /> },
  { id: 4, title: 'Документы', icon: <MdUploadFile /> },
  { id: 5, title: 'Проверка', icon: <MdCheckCircle /> }
];

const OpenAccountPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    inn: '',
    address: '',
    fullName: '',
    phone: '',
    email: '',
    plan: 'development',
    files: []
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <h2>Информация о компании</h2>
            <div className={styles.inputGroup}>
              <label>Название компании</label>
              <input 
                type="text" 
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="ООО 'Бизнес Решения'"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>ИНН</label>
              <input 
                type="text" 
                name="inn"
                value={formData.inn}
                onChange={handleChange}
                placeholder="123456789"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Юридический адрес</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="г. Ташкент, ул. Навои, 1"
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <h2>Контактное лицо</h2>
            <div className={styles.inputGroup}>
              <label>ФИО</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Номер телефона</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+998 90 123 45 67"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ivan@company.uz"
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <h2>Выбор тарифа</h2>
            <div className={styles.planSelector}>
              {['start', 'development', 'corporation'].map(plan => (
                <div 
                  key={plan}
                  className={`${styles.planOption} ${formData.plan === plan ? styles.active : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, plan }))}
                >
                  <div className={styles.radio}></div>
                  <div className={styles.planInfo}>
                    <h3>{plan === 'start' ? 'Старт' : plan === 'development' ? 'Развитие' : 'Корпорация'}</h3>
                    <p>{plan === 'start' ? '0 UZS/мес' : plan === 'development' ? '119 000 UZS/мес' : '319 000 UZS/мес'}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <h2>Загрузка документов</h2>
            <p>Загрузите скан-копии Устава и Свидетельства о регистрации</p>
            <div className={styles.uploadArea}>
              <MdUploadFile className={styles.uploadIcon} />
              <p>Перетащите файлы сюда или нажмите для выбора</p>
              <input type="file" multiple className={styles.fileInput} />
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.stepContent}
          >
            <h2>Проверка данных</h2>
            <div className={styles.reviewGrid}>
              <div className={styles.reviewItem}>
                <span>Компания:</span>
                <strong>{formData.companyName}</strong>
              </div>
              <div className={styles.reviewItem}>
                <span>ИНН:</span>
                <strong>{formData.inn}</strong>
              </div>
              <div className={styles.reviewItem}>
                <span>Контактное лицо:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div className={styles.reviewItem}>
                <span>Тариф:</span>
                <strong>{formData.plan === 'start' ? 'Старт' : formData.plan === 'development' ? 'Развитие' : 'Корпорация'}</strong>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.progressHeader}>
          {steps.map(step => (
            <div 
              key={step.id} 
              className={`${styles.stepIndicator} ${currentStep >= step.id ? styles.active : ''} ${currentStep === step.id ? styles.current : ''}`}
            >
              <div className={styles.iconWrapper}>{step.icon}</div>
              <span>{step.title}</span>
            </div>
          ))}
        </div>

        <div className={styles.formBody}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        <div className={styles.formFooter}>
          <button 
            className={styles.backButton} 
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <MdArrowBack /> Назад
          </button>
          <button 
            className={styles.nextButton} 
            onClick={currentStep === 5 ? () => alert('Заявка отправлена!') : handleNext}
          >
            {currentStep === 5 ? 'Отправить заявку' : 'Далее'} <MdArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenAccountPage;
