'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import styles from './page.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (!isLogin) {
        // Registration
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccessMessage('Registration successful! You can now log in.');
        setTimeout(() => {
            setIsLogin(true);
            setSuccessMessage('');
        }, 2000);
      } else {
        // Login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/profile');
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      let msg = error.message;
      if (error.code === 'auth/email-already-in-use') msg = 'Email is already in use.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email address.';
      if (error.code === 'auth/weak-password') msg = 'Password should be at least 6 characters.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') msg = 'Invalid email or password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.div 
          className={styles.authCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className={styles.accentLine} />
          
          <div className={styles.cardContent}>
            <div className={styles.header}>
              <div className={styles.logo}>
                 <Image src="/logo.png" alt="SafePoint Bank Logo" width={70} height={50} />
                 SafePoint Bank
              </div>
              <p className={styles.subtitle}>
                {isLogin ? 'Welcome back, please login to your account.' : 'Create an account to get started.'}
              </p>
            </div>

            <div className={styles.tabsContainer}>
                {/* Background pill that moves */}
                <motion.div 
                    className={styles.activeTabIndicator}
                    initial={false}
                    animate={{ 
                        x: isLogin ? 0 : '100%' 
                    }}
                    transition={{ duration: 0.05, ease: "linear" }}
                />
                
                <button
                    className={`${styles.tab} ${isLogin ? styles.active : ''}`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button
                    className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
                    onClick={() => setIsLogin(false)}
                >
                    Register
                </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <AnimatePresence mode="wait">
                {error && (
                    <motion.div 
                        className={styles.error}
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 10 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    >
                        {error}
                    </motion.div>
                )}

                {successMessage && (
                    <motion.div 
                        className={styles.success}
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 10 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    >
                        {successMessage}
                    </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
              </div>

              <AnimatePresence initial={false} mode="popLayout">
                {!isLogin && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.05 }}
                        className={styles.inputGroup}
                        key="name-field"
                    >
                        <label className={styles.label} htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={styles.input}
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin}
                        />
                    </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
              </div>

              <AnimatePresence initial={false} mode="popLayout">
                {!isLogin && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.05 }}
                        className={styles.inputGroup}
                        key="confirm-password-field"
                    >
                        <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={styles.input}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required={!isLogin}
                        />
                    </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
