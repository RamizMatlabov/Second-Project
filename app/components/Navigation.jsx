'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О нас' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="SafePoint Bank"
            width={180}
            height={50}
            style={{ width: 'auto', height: '40px' }}
            priority
          />
          <span>SafePoint Bank</span>
        </Link>

        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={styles.menuIcon}></span>
        </button>

        <AnimatePresence>
          {(isMobileMenuOpen || !isMobileMenuOpen) && (
            <motion.div 
              className={styles.navLinks}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <Link href="/dashboard" className={styles.authButton}>
                  Личный кабинет
                </Link>
              ) : (
                <Link href="/auth" className={styles.authButton}>
                  Войти
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 