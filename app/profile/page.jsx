'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaMobileAlt, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import styles from './page.module.scss';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

  const displayName = user.displayName || 'Клиент SafePoint';
  const email = user.email || 'Не указан';

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.section
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>
              <FaUserCircle />
            </div>
            <div className={styles.headerText}>
              <h1>{displayName}</h1>
              <p>Личный кабинет клиента SafePoint Bank</p>
            </div>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.logoutButton} onClick={logout}>
              <FaSignOutAlt />
              <span>Выйти из аккаунта</span>
            </button>
          </div>
        </motion.section>

        <section className={styles.grid}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className={styles.cardHeader}>
              <div>
                <h2>Личные данные</h2>
                <span className={styles.cardSubtitle}>Информация о вашем аккаунте</span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Имя</span>
                <span className={styles.infoValue}>{displayName}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <FaEnvelope /> Email
                </span>
                <span className={styles.infoValue}>{email}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <FaMobileAlt /> Мобильное приложение
                </span>
                <span className={styles.infoValue}>Подключено к вашему аккаунту</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className={styles.cardHeader}>
              <div>
                <h2>Безопасность</h2>
                <span className={styles.cardSubtitle}>Рекомендуемые настройки защиты</span>
              </div>
              <div className={styles.cardBadge}>
                <FaShieldAlt />
                <span>Рекомендуется</span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <ul className={styles.securityList}>
                <li>Включите двухфакторную аутентификацию в настройках профиля.</li>
                <li>Регулярно обновляйте пароль и не используйте один пароль везде.</li>
                <li>Подключите вход по Face ID или Touch ID в мобильном приложении.</li>
                <li>Проверяйте историю входов в личный кабинет на наличие подозрительных устройств.</li>
              </ul>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

