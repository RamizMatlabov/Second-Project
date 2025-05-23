'use client';
import styles from './page.module.css';
import { motion } from 'framer-motion';

export default function Contacts() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Свяжитесь с нами</h1>
          <p>Мы всегда готовы помочь вам</p>
        </motion.div>
      </section>

      <section className={styles.contactInfo}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <motion.div 
              className={styles.infoCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.infoIcon}>📞</div>
              <h3>Телефон</h3>
              <p>+7 (800) 123-45-67</p>
              <p>Круглосуточно</p>
            </motion.div>

            <motion.div 
              className={styles.infoCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.infoIcon}>✉️</div>
              <h3>Email</h3>
              <p>info@kapitalbank.ru</p>
              <p>Ответим в течение 24 часов</p>
            </motion.div>

            <motion.div 
              className={styles.infoCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.infoIcon}>🏢</div>
              <h3>Адрес</h3>
              <p>г. Москва, ул. Примерная, 123</p>
              <p>Пн-Пт: 9:00 - 18:00</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.contactForm}>
        <div className={styles.container}>
          <h2>Напишите нам</h2>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Ваше имя</label>
              <input type="text" id="name" placeholder="Введите ваше имя" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Введите ваш email" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Тема</label>
              <input type="text" id="subject" placeholder="Введите тему сообщения" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Сообщение</label>
              <textarea id="message" rows="5" placeholder="Введите ваше сообщение"></textarea>
            </div>

            <motion.button 
              className={styles.submitButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Отправить сообщение
            </motion.button>
          </form>
        </div>
      </section>

      <section className={styles.map}>
        <div className={styles.container}>
          <h2>Наше местоположение</h2>
          <div className={styles.mapContainer}>
            {/* Здесь будет карта */}
            <div className={styles.mapPlaceholder}>
              Карта будет отображаться здесь
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 