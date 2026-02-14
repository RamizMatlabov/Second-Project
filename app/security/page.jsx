'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaLock, 
  FaFingerprint, 
  FaExclamationTriangle, 
  FaPhoneAlt, 
  FaKey, 
  FaCheckCircle,
  FaInfoCircle,
  FaUserShield
} from 'react-icons/fa';
import styles from './page.module.scss';

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
    staggerChildren: 0.1,
    delayChildren: 0
  }
};

const SecurityPage = () => {
  const protectionFeatures = [
    {
      icon: <FaLock />,
      title: 'Шифрование данных',
      description: 'Мы используем современные протоколы шифрования AES-256 для защиты всех ваших транзакций и личной информации. Ваши данные в безопасности даже при передаче через открытые сети.',
      status: 'Активно'
    },
    {
      icon: <FaFingerprint />,
      title: 'Биометрия и 2FA',
      description: 'Дополнительный уровень защиты вашего аккаунта с помощью SMS-кодов, Face ID или Touch ID. Мы гарантируем, что доступ к счету имеете только вы.',
      status: 'Рекомендуется'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Мониторинг 24/7',
      description: 'Наша система интеллектуального мониторинга на базе ИИ анализирует подозрительные операции в режиме реального времени и блокирует их до совершения кражи.',
      status: 'Активно'
    }
  ];

  const safetyTips = [
    {
      title: 'Никогда не сообщайте свой PIN-код',
      text: 'Сотрудники банка никогда не запрашивают ваш PIN-код, CVV-код или пароли от личного кабинета. Если кто-то просит их — это мошенники.',
      icon: <FaInfoCircle />
    },
    {
      title: 'Используйте сложные пароли',
      text: 'Создавайте уникальные пароли для банковских приложений и регулярно их обновляйте. Избегайте использования дат рождения и простых комбинаций.',
      icon: <FaKey />
    },
    {
      title: 'Проверяйте URL-адрес',
      text: 'Всегда убеждайтесь, что вы находитесь на официальном сайте банка (safepoint.com) перед вводом данных. Проверяйте наличие замочка в адресной строке.',
      icon: <FaCheckCircle />
    },
    {
      title: 'Будьте осторожны с ссылками',
      text: 'Не открывайте ссылки из SMS или писем от неизвестных отправителей. Банк не рассылает сообщения с просьбой перейти по ссылке для разблокировки счета.',
      icon: <FaExclamationTriangle />
    }
  ];

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.iconBadge}>
            <FaUserShield className={styles.mainIcon} />
          </div>
          <h1>Безопасность и защита</h1>
          <p>
            Мы применяем банковские стандарты безопасности последнего поколения, 
            чтобы вы могли быть спокойны за свои средства и данные.
          </p>
        </motion.div>
      </section>

      <section className={styles.protection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeader}
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <FaShieldAlt className={styles.sectionIcon} />
            <h2>Система защиты SafePoint</h2>
          </motion.div>

          <motion.div 
            className={styles.grid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {protectionFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                className={styles.card}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className={styles.cardIcon}>{feature.icon}</div>
                <div className={styles.statusBadge}>{feature.status}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.tips}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeader}
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <FaExclamationTriangle className={styles.sectionIcon} />
            <h2>Ваши правила безопасности</h2>
          </motion.div>

          <motion.div 
            className={styles.tipsGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {safetyTips.map((tip, index) => (
              <motion.div 
                key={index} 
                className={styles.tipCard}
                variants={fadeInUp}
              >
                <div className={styles.tipHeader}>
                  <span className={styles.tipIcon}>{tip.icon}</span>
                  <h3>{tip.title}</h3>
                </div>
                <p>{tip.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.emergency}>
        <div className={styles.container}>
          <motion.div 
            className={styles.emergencyContent}
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <div className={styles.emergencyText}>
              <h2>Экстренная помощь</h2>
              <p>Если вы потеряли карту или заметили подозрительную активность, свяжитесь с нами немедленно.</p>
            </div>
            <div className={styles.emergencyGrid}>
              <motion.div className={styles.emergencyCard} whileHover={{ scale: 1.02 }}>
                <FaPhoneAlt className={styles.cardIcon} />
                <div className={styles.cardInfo}>
                  <span>Блокировка карты</span>
                  <a href="tel:88001234567" className={styles.phone}>8 800 123-45-67</a>
                  <p>Бесплатно по РФ, 24/7</p>
                </div>
              </motion.div>
              <motion.div className={styles.emergencyCard} whileHover={{ scale: 1.02 }}>
                <FaPhoneAlt className={styles.cardIcon} />
                <div className={styles.cardInfo}>
                  <span>Поддержка</span>
                  <a href="tel:+998334334404" className={styles.phone}>+998 33 433-44-04</a>
                  <p>Международная линия</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default SecurityPage;
