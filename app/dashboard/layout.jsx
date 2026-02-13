'use client';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MdDashboard, 
  MdCreditCard, 
  MdSwapHoriz, 
  MdHistory, 
  MdPerson,
  MdLogout,
  MdNotifications,
  MdPieChart
} from 'react-icons/md';
import styles from './layout.module.scss';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Панель управления', icon: <MdDashboard /> },
    { href: '/dashboard/analytics', label: 'Аналитика', icon: <MdPieChart /> },
    { href: '/dashboard/cards', label: 'Мои карты', icon: <MdCreditCard /> },
    { href: '/dashboard/transfers', label: 'Переводы', icon: <MdSwapHoriz /> },
    { href: '/dashboard/history', label: 'История', icon: <MdHistory /> },
    { href: '/dashboard/profile', label: 'Профиль', icon: <MdPerson /> },
  ];

  const notifications = [
    { id: 1, text: 'Вход с нового устройства', time: '2 мин. назад' },
    { id: 2, text: 'Успешный перевод на 5000₽', time: '1 час назад' },
    { id: 3, text: 'Обновление системы безопасности', time: '3 часа назад' },
  ];

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="SafePoint Bank" width={40} height={40} />
          <span>SafePoint</span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerActions}>
            <div className={styles.notificationsWrapper}>
              <button 
                className={styles.notificationButton}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <MdNotifications />
                <span className={styles.badge}>3</span>
              </button>

              {isNotificationsOpen && (
                <motion.div 
                  className={styles.notificationsDropdown}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.dropdownHeader}>
                    <h3>Уведомления</h3>
                  </div>
                  <div className={styles.dropdownContent}>
                    {notifications.map((notif) => (
                      <div key={notif.id} className={styles.notificationItem}>
                        <p>{notif.text}</p>
                        <span>{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.displayName || user?.email}</span>
              <button onClick={logout} className={styles.logoutButton}>
                <MdLogout style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Выйти
              </button>
            </div>
          </div>
        </header>

        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
