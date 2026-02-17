'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FaUserCircle,
  FaEnvelope,
  FaMobileAlt,
  FaShieldAlt,
  FaSignOutAlt,
  FaUserEdit,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInfoCircle
} from 'react-icons/fa';
import styles from './page.module.scss';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = window.localStorage.getItem('safepoint_profile_cache');
        if (raw) {
          const cached = JSON.parse(raw);
          return {
            phone: cached.phone || '',
            address: cached.address || '',
            bio: cached.bio || ''
          };
        }
      }
    } catch (e) {
      console.error('Failed to read profile cache', e);
    }

    return {
      phone: '',
      address: '',
      bio: ''
    };
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    const fetchDetails = async () => {
      try {
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          return;
        }

        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setProfileData({
            phone: data.phone || '',
            address: data.address || '',
            bio: data.bio || ''
          });
        }
      } catch (e) {
        console.error('Failed to load profile details', e);
      }
    };

    fetchDetails();
  }, [user]);

  useEffect(() => {
    const updated = searchParams.get('updated');
    if (updated === '1') {
      setShowSuccessBanner(true);
      const timeout = setTimeout(() => {
        setShowSuccessBanner(false);
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.delete('updated');
          router.replace(url.pathname + url.search);
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [searchParams, router]);

  if (loading || !user) {
    return null;
  }

  const displayName = user.displayName || 'Клиент SafePoint';
  const email = user.email || 'Не указан';
  const phone = profileData.phone || 'Не указан';
  const address = profileData.address || 'Не указан';
  const bio = profileData.bio || 'Не указано';

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {showSuccessBanner && (
          <div className={styles.successBanner}>
            <span>Профиль успешно обновлён</span>
          </div>
        )}
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
            <button
              className={styles.editButton}
              onClick={() => router.push('/profile/edit')}
            >
              <FaUserEdit />
              <span>Редактировать профиль</span>
            </button>
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
                <span className={styles.infoLabel}>
                  <FaUserCircle /> Имя
                </span>
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
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <FaPhoneAlt /> Телефон
                </span>
                <span className={styles.infoValue}>{phone}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <FaMapMarkerAlt /> Адрес
                </span>
                <span className={styles.infoValue}>{address}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  <FaInfoCircle /> О себе
                </span>
                <span className={styles.infoValue}>{bio}</span>
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
