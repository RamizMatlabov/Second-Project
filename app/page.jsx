'use client';
import Link from 'next/link';
import styles from './page.module.scss';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Kapital Bank</h1>
          <p>Ваш надежный финансовый партнер</p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryButton}>Начать сейчас</button>
            <button className={styles.secondaryButton}>Узнать больше</button>
          </div>
        </motion.div>
      </section>

      <section className={styles.features}>
        <h2>Наши преимущества</h2>
        <div className={styles.featureGrid}>
          <motion.div
            className={styles.featureCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.featureIcon}>💳</div>
            <h3>Быстрые переводы</h3>
            <p>Мгновенные переводы в любое время и в любую точку мира</p>
          </motion.div>

          <motion.div
            className={styles.featureCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.featureIcon}>🔒</div>
            <h3>Безопасность</h3>
            <p>Современные технологии защиты ваших средств</p>
          </motion.div>

          <motion.div
            className={styles.featureCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.featureIcon}>📱</div>
            <h3>Мобильный банкинг</h3>
            <p>Управляйте финансами с любого устройства</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Готовы начать?</h2>
        <p>Присоединяйтесь к тысячам довольных клиентов</p>
        <Link href="/auth" className={styles.ctaButton}>Создать аккаунт</Link>
      </section>
    </main>
  );
}
