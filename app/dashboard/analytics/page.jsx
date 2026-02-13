'use client';
import { motion } from 'framer-motion';
import { 
  MdFastfood, 
  MdShoppingBag, 
  MdHome, 
  MdDirectionsBus, 
  MdTrendingUp, 
  MdTrendingDown 
} from 'react-icons/md';
import styles from './page.module.scss';

export default function AnalyticsPage() {
  const categories = [
    { name: 'Продукты', amount: 15200, percentage: 45, icon: <MdFastfood />, color: '#0070f3' },
    { name: 'Шопинг', amount: 8400, percentage: 25, icon: <MdShoppingBag />, color: '#00d4ff' },
    { name: 'Жилье', amount: 6700, percentage: 20, icon: <MdHome />, color: '#00d084' },
    { name: 'Транспорт', amount: 3400, percentage: 10, icon: <MdDirectionsBus />, color: '#faad14' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.analyticsContainer}>
      <header className={styles.pageHeader}>
        <h1>Аналитика расходов</h1>
        <p>Обзор ваших финансов за текущий месяц</p>
      </header>

      <motion.div 
        className={styles.overviewGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.overviewCard} variants={itemVariants}>
          <div className={styles.cardIcon} style={{ background: 'rgba(0, 208, 132, 0.1)', color: '#00d084' }}>
            <MdTrendingUp />
          </div>
          <div className={styles.cardInfo}>
            <span>Общий доход</span>
            <h3>85 000 ₽</h3>
          </div>
        </motion.div>

        <motion.div className={styles.overviewCard} variants={itemVariants}>
          <div className={styles.cardIcon} style={{ background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f' }}>
            <MdTrendingDown />
          </div>
          <div className={styles.cardInfo}>
            <span>Общий расход</span>
            <h3>33 700 ₽</h3>
          </div>
        </motion.div>
      </motion.div>

      <div className={styles.mainGrid}>
        <motion.section 
          className={styles.chartSection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Распределение трат</h2>
          <div className={styles.chartWrapper}>
            <svg viewBox="0 0 36 36" className={styles.donutChart}>
              <path
                className={styles.donutRing}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="3"
              />
              {/* Продукты (45%) */}
              <path
                className={styles.donutSegment}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#0070f3"
                strokeWidth="3"
                strokeDasharray="45, 100"
                strokeDashoffset="25"
              />
              {/* Шопинг (25%) */}
              <path
                className={styles.donutSegment}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="3"
                strokeDasharray="25, 100"
                strokeDashoffset="-20"
              />
              {/* Жилье (20%) */}
              <path
                className={styles.donutSegment}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#00d084"
                strokeWidth="3"
                strokeDasharray="20, 100"
                strokeDashoffset="-45"
              />
              {/* Транспорт (10%) */}
              <path
                className={styles.donutSegment}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#faad14"
                strokeWidth="3"
                strokeDasharray="10, 100"
                strokeDashoffset="-65"
              />
              <g className={styles.chartText}>
                <text x="18" y="20.35" className={styles.chartNumber}>33.7к</text>
                <text x="18" y="24.35" className={styles.chartLabel}>₽ всего</text>
              </g>
            </svg>
          </div>
        </motion.section>

        <motion.section 
          className={styles.categoriesSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Категории</h2>
          <div className={styles.categoriesList}>
            {categories.map((cat, index) => (
              <div key={index} className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryTitle}>
                    <span className={styles.categoryIcon} style={{ color: cat.color }}>
                      {cat.icon}
                    </span>
                    <span>{cat.name}</span>
                  </div>
                  <span className={styles.categoryAmount}>{cat.amount.toLocaleString()} ₽</span>
                </div>
                <div className={styles.progressBarWrapper}>
                  <motion.div 
                    className={styles.progressBar}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    style={{ background: cat.color }}
                  />
                </div>
                <div className={styles.categoryFooter}>
                  <span>{cat.percentage}% от всех трат</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
