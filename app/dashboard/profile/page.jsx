'use client';
import { useAuth } from '../../context/AuthContext';
import styles from './page.module.scss';
import { motion } from 'framer-motion';
import { MdPerson, MdEmail, MdPhone, MdSecurity } from 'react-icons/md';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Профиль
        </motion.h1>
      </header>

      <div className={styles.profileGrid}>
        <motion.div 
          className={styles.profileCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.avatar}>
            {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || <MdPerson />}
          </div>
          <div className={styles.info}>
            <h2>{user?.displayName || 'Пользователь'}</h2>
            <p className={styles.role}>Премиум клиент</p>
          </div>
        </motion.div>

        <motion.div 
          className={styles.detailsCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Контактная информация</h3>
          <div className={styles.detailItem}>
            <MdEmail />
            <div>
              <label>Email</label>
              <span>{user?.email}</span>
            </div>
          </div>
          <div className={styles.detailItem}>
            <MdPhone />
            <div>
              <label>Телефон</label>
              <span>+7 (999) 000-00-00</span>
            </div>
          </div>
          <div className={styles.detailItem}>
            <MdSecurity />
            <div>
              <label>Статус аккаунта</label>
              <span className={styles.verified}>Верифицирован</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
