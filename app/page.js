import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Добро пожаловать в Kapital Bank</h1>
          <p className={styles.heroText}>Ваш надежный финансовый партнер</p>
          <button className={styles.button}>Узнать больше</button>
        </div>
      </section>
      
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.featuresTitle}>Наши преимущества</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Надежность</h3>
              <p className={styles.cardText}>Более 20 лет на рынке банковских услуг</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Скорость</h3>
              <p className={styles.cardText}>Быстрое оформление всех банковских операций</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Поддержка</h3>
              <p className={styles.cardText}>Круглосуточная поддержка клиентов</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
