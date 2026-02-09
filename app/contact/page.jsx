'use client';

import { useState } from 'react';
import styles from './page.module.scss';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
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
      <section className={styles.contact}>
        <div className={styles.container}>
          <h1 className={styles.title}>Свяжитесь с нами</h1>
          <div className={styles.content}>
            <div className={styles.info}>
              <h2 className={styles.infoTitle}>Контактная информация</h2>
              <div className={styles.details}>
                <div className={styles.item}>
                  <h3 className={styles.itemTitle}>Адрес</h3>
                  <p className={styles.itemText}>г. Самарканд, Абу Рейхан Беруни</p>
                </div>
                <div className={styles.item}>
                  <h3 className={styles.itemTitle}>Телефон</h3>
                  <p className={styles.itemText}>+998334334404</p>
                </div>
                <div className={styles.item}>
                  <h3 className={styles.itemTitle}>Email</h3>
                  <p className={styles.itemText}>ramizmatlabov923@gmail.com</p>
                </div>
              </div>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Сообщение</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className={styles.button}>
                Отправить
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
} 