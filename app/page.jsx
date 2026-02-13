'use client';
import Link from 'next/link';
import styles from './page.module.scss';
import { motion } from 'framer-motion';
import { FaCreditCard, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div 
            className={styles.heroContent}
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp}>
              Банкинг будущего <br />
              <span>уже сегодня</span>
            </motion.h1>
            <motion.p variants={fadeInUp}>
              SafePoint Bank объединяет передовые технологии и премиальный сервис, чтобы вы могли управлять своими финансами с максимальным комфортом и безопасностью.
            </motion.p>
            <motion.div className={styles.heroButtons} variants={fadeInUp}>
              <Link href={user ? "/dashboard" : "/auth"} className={styles.primaryButton}>
                {user ? "В личный кабинет" : "Открыть счет"}
              </Link>
              <button className={styles.secondaryButton}>Как это работает</button>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.heroVisual}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.visualCircle}></div>
            
            {/* Floating Glass Card 1 */}
            <motion.div 
              className={`${styles.floatingCard} ${styles.card1}`}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.chip}></div>
                <span className={styles.logo}>SafePoint</span>
              </div>
              <div className={styles.cardBalance}>
                <span>Баланс</span>
                <h3>$ 124,500.00</h3>
              </div>
              <div className={styles.cardFooter}>
                <span>**** 4582</span>
                <span>12/28</span>
              </div>
            </motion.div>

            {/* Floating Glass Card 2 */}
            <motion.div 
              className={`${styles.floatingCard} ${styles.card2}`}
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.chip}></div>
                <span className={styles.logo}>Platinum</span>
              </div>
              <div className={styles.cardBalance}>
                <span>Сбережения</span>
                <h3>$ 850,000.00</h3>
              </div>
              <div className={styles.cardFooter}>
                <span>**** 9921</span>
                <span>09/29</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Почему выбирают нас
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Мы создаем финансовые инструменты, которые работают на вас, обеспечивая рост и безопасность вашего капитала.
          </motion.p>
        </div>

        <div className={styles.featureGrid}>
          <motion.div
            className={styles.featureCard}
            whileHover={{ y: -10, transition: { duration: 0.1 } }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1,}}
          >
            <div className={styles.featureIcon}><FaCreditCard /></div>
            <h3>Мгновенные переводы</h3>
            <p>Отправляйте средства в любую точку мира за секунды с минимальными комиссиями и полной прозрачностью.</p>
          </motion.div>

          <motion.div
            className={styles.featureCard}
            whileHover={{ y: -10, transition: { duration: 0.1 } }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1, }}
          >
            <div className={styles.featureIcon}><FaShieldAlt /></div>
            <h3>Банковская гарантия</h3>
            <p>Ваши средства защищены передовыми протоколами шифрования и системой страхования вкладов.</p>
          </motion.div>

          <motion.div
            className={styles.featureCard}
            whileHover={{ y: -10, transition: { duration: 0.1 } }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.1, }}
          >
            <div className={styles.featureIcon}><FaChartLine /></div>
            <h3>Умная аналитика</h3>
            <p>Отслеживайте расходы и доходы с помощью детальных графиков и персональных финансовых советов.</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Готовы к новому уровню?
          </motion.h2>
          <p>Присоединяйтесь к SafePoint Bank и откройте для себя премиальное обслуживание уже сегодня.</p>
          <Link href={user ? "/dashboard" : "/auth"} className={styles.ctaButton}>
            {user ? "Перейти в кабинет" : "Стать клиентом"}
          </Link>
        </div>
      </section>
    </main>
  );
}
