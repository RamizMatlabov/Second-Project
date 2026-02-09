'use client';
import styles from './page.module.scss';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaBuilding } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: {
    staggerChildren: 0.2,
    delayChildren: 0.1
  }
};

export default function Contacts() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>Свяжитесь с нами</h1>
          <p>Наша команда поддержки готова ответить на любые вопросы 24/7. Мы ценим ваше время и доверие.</p>
        </motion.div>
      </section>

      <section className={styles.contactInfo}>
        <div className={styles.container}>
          <motion.div 
            className={styles.infoGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            <motion.div 
              className={styles.infoCard}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className={styles.infoIcon}><FaPhoneAlt /></div>
              <h3>Телефон</h3>
              <p>+998334334404</p>
              <p>Круглосуточная поддержка</p>
            </motion.div>

            <motion.div 
              className={styles.infoCard}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className={styles.infoIcon}><FaEnvelope /></div>
              <h3>Email</h3>
              <p>ramizmatlabov923@gmail.com</p>
              <p>Для общих вопросов и предложений</p>
            </motion.div>

            <motion.div 
              className={styles.infoCard}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className={styles.infoIcon}><FaBuilding /></div>
              <h3>Офис</h3>
              <p>Самарканд, Абу Рейхан Беруни</p>
              <p>Узбекистан</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.contactForm}>
        <div className={styles.container}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Напишите нам
          </motion.h2>
          
          <motion.form 
            className={styles.form}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">Ваше имя</label>
              <input type="text" id="name" placeholder="Как к вам обращаться?" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="name@example.com" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Тема</label>
              <input type="text" id="subject" placeholder="Кратко опишите вопрос" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Сообщение</label>
              <textarea id="message" rows="5" placeholder="Подробности вашего обращения..."></textarea>
            </div>

            <motion.button 
              className={styles.submitButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Отправить сообщение
            </motion.button>
          </motion.form>
        </div>
      </section>

      <section className={styles.map}>
        <div className={styles.container}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Наше местоположение
          </motion.h2>
          
          <motion.div 
            className={styles.mapContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Здесь будет карта */}
            <div className={styles.mapPlaceholder}>
              <p>Самарканд, Абу Рейхан Беруни</p>
              <span style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Интерактивная карта загружается...</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 
