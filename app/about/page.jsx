'use client';
import styles from './page.module.scss';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>О Kapital Bank</h1>
          <p>Ваш надежный финансовый партнер с 1995 года</p>
        </motion.div>
      </section>

      <section className={styles.history}>
        <div className={styles.container}>
          <h2>Наша история</h2>
          <div className={styles.timeline}>
            <motion.div 
              className={styles.timelineItem}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.year}>1995</div>
              <h3>Основание банка</h3>
              <p>Kapital Bank был основан с целью предоставления качественных банковских услуг</p>
            </motion.div>

            <motion.div 
              className={styles.timelineItem}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.year}>2005</div>
              <h3>Расширение сети</h3>
              <p>Открытие филиалов во всех крупных городах страны</p>
            </motion.div>

            <motion.div 
              className={styles.timelineItem}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.year}>2015</div>
              <h3>Цифровая трансформация</h3>
              <p>Запуск современного интернет-банкинга и мобильного приложения</p>
            </motion.div>

            <motion.div 
              className={styles.timelineItem}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.year}>2023</div>
              <h3>Инновации</h3>
              <p>Внедрение искусственного интеллекта для улучшения обслуживания клиентов</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          <h2>Наши ценности</h2>
          <div className={styles.valuesGrid}>
            <motion.div 
              className={styles.valueCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.valueIcon}>🤝</div>
              <h3>Надежность</h3>
              <p>Мы гарантируем безопасность ваших средств и конфиденциальность данных</p>
            </motion.div>

            <motion.div 
              className={styles.valueCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.valueIcon}>💡</div>
              <h3>Инновации</h3>
              <p>Постоянно внедряем новые технологии для удобства клиентов</p>
            </motion.div>

            <motion.div 
              className={styles.valueCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.valueIcon}>🎯</div>
              <h3>Качество</h3>
              <p>Предоставляем только лучшие финансовые продукты и услуги</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.container}>
          <h2>Наша команда</h2>
          <div className={styles.teamGrid}>
            <motion.div 
              className={styles.teamMember}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.memberPhoto}>👨‍💼</div>
              <h3>Александр Петров</h3>
              <p>Генеральный директор</p>
            </motion.div>

            <motion.div 
              className={styles.teamMember}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.memberPhoto}>👩‍💼</div>
              <h3>Елена Смирнова</h3>
              <p>Финансовый директор</p>
            </motion.div>

            <motion.div 
              className={styles.teamMember}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.memberPhoto}>👨‍💻</div>
              <h3>Дмитрий Иванов</h3>
              <p>Технический директор</p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 