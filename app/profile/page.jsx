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
  FaInfoCircle,
  FaClipboardList
} from 'react-icons/fa';
import styles from './page.module.scss';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [errorApps, setErrorApps] = useState(null);
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
    if (!user) return;

    setLoadingApps(true);
    setErrorApps(null);
    let hadLocal = false;
    if (typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem('safepoint_applications_local');
        const local = raw ? JSON.parse(raw) : [];
        const localForUser = local.filter((x) => x.userId === user.uid).map((x) => ({
          id: x.id,
          userId: x.userId,
          userName: x.userName,
          phone: x.phone,
          email: x.email,
          cardType: x.cardType,
          pickupPoint: x.pickupPoint,
          status: x.status || 'pending',
          createdAt: x.createdAt ? new Date(x.createdAt) : new Date()
        })).sort((a, b) => b.createdAt - a.createdAt);
        if (localForUser.length > 0) {
          setApplications(localForUser);
          setLoadingApps(false);
          hadLocal = true;
        }
      } catch (e) {}
    }

    const loadTimeout = setTimeout(() => {
      setLoadingApps(prevLoading => {
        if (prevLoading && !hadLocal) {
          setErrorApps('Загрузка занимает слишком много времени. Попробуйте обновить страницу.');
          return false;
        }
        return prevLoading;
      });
    }, 5000);

    const q = query(
      collection(db, 'applications'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      clearTimeout(loadTimeout);
      try {
        const apps = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Безопасно преобразуем дату, учитывая возможные null/undefined
            createdAt: data.createdAt?.toDate() || new Date()
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt);
        if (apps.length === 0 && typeof window !== 'undefined') {
          try {
            const raw = window.localStorage.getItem('safepoint_applications_local');
            const local = raw ? JSON.parse(raw) : [];
            const localForUser = local.filter((x) => x.userId === user.uid).map((x) => ({
              id: x.id,
              userId: x.userId,
              userName: x.userName,
              phone: x.phone,
              email: x.email,
              cardType: x.cardType,
              pickupPoint: x.pickupPoint,
              status: x.status || 'pending',
              createdAt: x.createdAt ? new Date(x.createdAt) : new Date()
            })).sort((a, b) => b.createdAt - a.createdAt);
            if (localForUser.length > 0) {
              setApplications(localForUser);
              setLoadingApps(false);
              setErrorApps(null);
              return;
            }
          } catch (e) {}
        }
        setApplications(apps);
        setLoadingApps(false);
        setErrorApps(null);
      } catch (err) {
        console.error('Error processing applications snapshot:', err);
        setErrorApps('Ошибка при обработке данных заявок');
        setLoadingApps(false);
      }
    }, (err) => {
      clearTimeout(loadTimeout);
      console.error('Firestore onSnapshot error:', err);
      if (typeof window !== 'undefined') {
        try {
          const raw = window.localStorage.getItem('safepoint_applications_local');
          const local = raw ? JSON.parse(raw) : [];
          const localForUser = local.filter((x) => x.userId === user.uid).map((x) => ({
            id: x.id,
            userId: x.userId,
            userName: x.userName,
            phone: x.phone,
            email: x.email,
            cardType: x.cardType,
            pickupPoint: x.pickupPoint,
            status: x.status || 'pending',
            createdAt: x.createdAt ? new Date(x.createdAt) : new Date()
          })).sort((a, b) => b.createdAt - a.createdAt);
          if (localForUser.length > 0) {
            setApplications(localForUser);
            setErrorApps(null);
            setLoadingApps(false);
            return;
          }
        } catch (e) {}
      }
      setErrorApps('Не удалось загрузить список заявок. Возможно, отсутствуют права доступа.');
      setLoadingApps(false);
    });

    return () => {
      clearTimeout(loadTimeout);
      unsubscribe();
    };
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

        <section className={styles.applicationsSection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2>Мои заявки</h2>
            {loadingApps ? (
              <div className={styles.loadingApplications}>
                <div className={styles.spinner}></div>
                <p>Загрузка заявок...</p>
              </div>
            ) : errorApps ? (
              <div className={styles.errorApplications}>
                <p>{errorApps}</p>
                <button onClick={() => window.location.reload()} className={styles.secondaryButton}>
                  Попробовать снова
                </button>
              </div>
            ) : applications.length > 0 ? (
              <div className={styles.applicationsList}>
                {applications.map((app) => (
                  <div key={app.id} className={styles.applicationCard}>
                    <div className={styles.appInfo}>
                      <h3>{app.cardType}</h3>
                      <p>Дата подачи: {app.createdAt?.toLocaleDateString() || 'Не указана'}</p>
                      <p>Пункт выдачи: {app.pickupPoint}</p>
                    </div>
                    <div className={`${styles.appStatus} ${styles[app.status]}`}>
                      {app.status === 'pending' ? 'В обработке' : 
                       app.status === 'approved' ? 'Одобрено' : 
                       app.status === 'rejected' ? 'Отклонено' : app.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noApplications}>
                <FaClipboardList />
                <p>У вас пока нет активных заявок.</p>
                <button 
                  className={styles.editButton}
                  onClick={() => router.push('/cards')}
                >
                  Оформить карту
                </button>
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </main>
  );
}
