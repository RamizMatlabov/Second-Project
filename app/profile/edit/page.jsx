'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FaArrowLeft, FaPhoneAlt, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import styles from './page.module.scss';

const formatUzPhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  let local = digits;

  if (local.startsWith('998')) {
    local = local.slice(3);
  }

  local = local.slice(0, 9);

  if (!local.length) {
    return '';
  }

  let result = '+998';

  result += ' (' + local.slice(0, 2);

  if (local.length >= 2) {
    result += ')';
  }

  if (local.length > 2) {
    result += ' ' + local.slice(2, 5);
  }

  if (local.length > 5) {
    result += '-' + local.slice(5, 7);
  }

  if (local.length > 7) {
    result += '-' + local.slice(7, 9);
  }

  return result;
};

const getUzLocalDigitsCount = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  let local = digits;

  if (local.startsWith('998')) {
    local = local.slice(3);
  }

  return local.length;
};

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
            phone: formatUzPhone(cached.phone || ''),
            address: cached.address || '',
            bio: cached.bio || ''
          };
        }
      }
    } catch (e) {
      console.error('Failed to read profile cache', e);
    }

    return {
      phone: formatUzPhone(''),
      address: '',
      bio: ''
    };
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    phone: '',
    address: '',
    bio: ''
  });

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
            phone: formatUzPhone(data.phone || ''),
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
    setFieldErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    let local = digits;

    if (local.startsWith('998')) {
      local = local.slice(3);
    }

    local = local.slice(0, 9);

    const formatted = formatUzPhone(local);

    setFormData((prev) => ({
      ...prev,
      phone: formatted
    }));

    setFieldErrors((prev) => ({
      ...prev,
      phone: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const errors = {};

    const phoneLocalDigits = getUzLocalDigitsCount(formData.phone);

    if (phoneLocalDigits !== 9) {
      errors.phone = 'Введите номер в формате +998 (XX) XXX-XX-XX';
    }

    if (formData.address.trim() === '') {
      errors.address = 'Заполните это поле';
    }

    if (formData.bio.trim() === '') {
      errors.bio = 'Заполните это поле';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors({
        phone: errors.phone || '',
        address: errors.address || '',
        bio: errors.bio || ''
      });
      return;
    }

    setFieldErrors({
      phone: '',
      address: '',
      bio: ''
    });

    setSaving(true);

    const ref = doc(db, 'users', user.uid);

    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'safepoint_profile_cache',
          JSON.stringify({
            phone: formData.phone,
            address: formData.address,
            bio: formData.bio
          })
        );
      }
    } catch (e) {
      console.error('Failed to write profile cache', e);
    }

    setDoc(
      ref,
      {
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
        updatedAt: new Date()
      },
      { merge: true }
    )
      .catch((e) => {
        console.error('Failed to save profile', e);
        setError('Не удалось сохранить изменения. Попробуйте еще раз.');
      })
      .finally(() => {
        setSaving(false);
      });

    router.push('/profile?updated=1');
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
            <FaArrowLeft />
            <span>Назад в профиль</span>
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

          <div
            className={`${styles.fieldGroup} ${
              fieldErrors.phone ? styles.fieldGroupError : ''
            }`}
          >
            <label htmlFor="phone">
              <FaPhoneAlt />
              <span>Номер телефона</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+998 (XX) XXX-XX-XX"
              value={formData.phone}
              onChange={handlePhoneChange}
              inputMode="numeric"
              autoComplete="tel"
            />
            {fieldErrors.phone && <p className={styles.fieldError}>{fieldErrors.phone}</p>}
          </div>

          <div
            className={`${styles.fieldGroup} ${
              fieldErrors.address ? styles.fieldGroupError : ''
            }`}
          >
            <label htmlFor="address">
              <FaMapMarkerAlt />
              <span>Адрес</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Город, улица, дом"
              value={formData.address}
              onChange={handleChange}
            />
            {fieldErrors.address && <p className={styles.fieldError}>{fieldErrors.address}</p>}
          </div>

          <div
            className={`${styles.fieldGroup} ${
              fieldErrors.bio ? styles.fieldGroupError : ''
            }`}
          >
            <label htmlFor="bio">
              <FaInfoCircle />
              <span>О себе / Bio</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              placeholder="Коротко расскажите о себе"
              value={formData.bio}
              onChange={handleChange}
            />
            {fieldErrors.bio && <p className={styles.fieldError}>{fieldErrors.bio}</p>}
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
