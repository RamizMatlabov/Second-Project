'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import styles from './page.module.scss';

export default function EditProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState(() => {
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
      return;
    }
    if (!user) return;

    const loadProfile = async () => {
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setFormData({
            phone: data.phone || '',
            address: data.address || '',
            bio: data.bio || ''
          });
        }
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    };

    loadProfile();
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const ref = doc(db, 'users', user.uid);

    const payload = {
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
      updatedAt: new Date()
    };

    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('safepoint_profile_cache', JSON.stringify(payload));
      }
    } catch (e) {
      console.error('Failed to write profile cache', e);
    }

    setDoc(
      ref,
      payload,
      { merge: true }
    )
      .catch((e) => {
        console.error('Failed to save profile', e);
        setError('Не удалось сохранить изменения. Попробуйте еще раз.');
      })
      .finally(() => {
        setSaving(false);
      });

    router.push('/profile');
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.section
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div>
            <h1>Редактирование профиля</h1>
            <p>Обновите контактные данные и информацию о себе</p>
          </div>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.push('/profile')}
          >
            Назад в профиль
          </button>
        </motion.section>

        <motion.form
          onSubmit={handleSubmit}
          className={styles.form}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.fieldGroup}>
            <label htmlFor="phone">Номер телефона</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+998 XX XXX XX XX"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="address">Адрес</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Город, улица, дом"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="bio">О себе / Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              placeholder="Коротко расскажите о себе"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => router.push('/profile')}
              disabled={saving}
            >
              Отменить
            </button>
            <button type="submit" className={styles.primaryButton} disabled={saving}>
              Сохранить изменения
            </button>
          </div>
        </motion.form>
      </div>
    </main>
  );
}
