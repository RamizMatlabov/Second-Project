'use client';
import styles from './page.module.scss';
import { motion } from 'framer-motion';
import { FaHandshake, FaLightbulb, FaBullseye, FaUserTie, FaLaptopCode } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: {
    staggerChildren: 0.1,
    delayChildren: 0
  }
};

export default function About() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>О SafePoint Bank</h1>
          <p>Ваш надежный финансовый партнер с 1995 года. Мы объединяем традиции банковского дела с инновационными технологиями.</p>
        </motion.div>
      </section>

      <section className={styles.history}>
        <div className={styles.container}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Наша история
          </motion.h2>
          
          <motion.div 
            className={styles.timeline}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            <motion.div 
              className={styles.timelineItem}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.1 } }}
            >
              <div className={styles.year}>1995</div>
              <h3>Основание</h3>
              <p>SafePoint Bank был основан группой визионеров с целью создания банка нового поколения.</p>
            </motion.div>

            <motion.div 
              className={styles.timelineItem}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.1 } }}
            >
              <div className={styles.year}>2005</div>
              <h3>Федеральная сеть</h3>
              <p>Масштабирование бизнеса и открытие филиалов во всех крупных экономических центрах.</p>
            </motion.div>

            <motion.div 
              className={styles.timelineItem}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.1 } }}
            >
              <div className={styles.year}>2015</div>
              <h3>Digital First</h3>
              <p>Полная цифровая трансформация и запуск лучшего мобильного приложения на рынке.</p>
            </motion.div>

            <motion.div 
              className={styles.timelineItem}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.1 } }}
            >
              <div className={styles.year}>2024</div>
              <h3>Экосистема</h3>
              <p>Внедрение ИИ-ассистентов и персонализированных финансовых продуктов для каждого клиента.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Наши ценности
          </motion.h2>
          
          <motion.div 
            className={styles.valuesGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            <motion.div 
              className={styles.valueCard}
              variants={fadeInUp}
            >
              <div className={styles.valueIcon}><FaHandshake /></div>
              <h3>Надежность</h3>
              <p>Мы гарантируем абсолютную безопасность ваших активов благодаря передовым системам шифрования и страхования.</p>
            </motion.div>

            <motion.div 
              className={styles.valueCard}
              variants={fadeInUp}
            >
              <div className={styles.valueIcon}><FaLightbulb /></div>
              <h3>Инновации</h3>
              <p>Мы постоянно внедряем новейшие технологии, чтобы сделать управление финансами простым и интуитивным.</p>
            </motion.div>

            <motion.div 
              className={styles.valueCard}
              variants={fadeInUp}
            >
              <div className={styles.valueIcon}><FaBullseye /></div>
              <h3>Прозрачность</h3>
              <p>Никаких скрытых комиссий и мелкого шрифта. Мы строим отношения на доверии и честности.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.container}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Почему клиенты выбирают SafePoint
          </motion.h2>
          
          <motion.div 
            className={styles.teamGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            <motion.div 
              className={styles.teamMember}
              variants={fadeInUp}
            >
              <div className={styles.memberPhoto}><FaHandshake /></div>
              <h3>Персональный подход</h3>
              <p>Каждый клиент получает выделенного менеджера и индивидуальные финансовые решения.</p>
            </motion.div>

            <motion.div 
              className={styles.teamMember}
              variants={fadeInUp}
            >
              <div className={styles.memberPhoto}><FaLightbulb /></div>
              <h3>Цифровой банк 24/7</h3>
              <p>Полный спектр услуг в приложении: от платежей до инвестиций без визита в офис.</p>
            </motion.div>

            <motion.div 
              className={styles.teamMember}
              variants={fadeInUp}
            >
              <div className={styles.memberPhoto}><FaBullseye /></div>
              <h3>Фокус на безопасности</h3>
              <p>Многоуровневая защита, мониторинг транзакций и мгновенные уведомления о рисках.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 
