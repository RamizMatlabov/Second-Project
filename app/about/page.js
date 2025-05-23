import styles from './page.module.scss';

export default function About() {
  return (
    <main className={styles.main}>
      <section className={styles.about}>
        <div className={styles.container}>
          <h1 className={styles.title}>О нас</h1>
          <div className={styles.content}>
            <div className={styles.text}>
              <h2 className={styles.sectionTitle}>Наша история</h2>
              <p className={styles.sectionText}>
                Kapital Bank был основан в 2000 году с целью предоставления качественных
                банковских услуг населению. За время своего существования мы выросли
                в одного из ведущих банков страны.
              </p>
              <h2 className={styles.sectionTitle}>Наша миссия</h2>
              <p className={styles.sectionText}>
                Мы стремимся сделать банковские услуги доступными и удобными для каждого
                клиента, используя современные технологии и индивидуальный подход.
              </p>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <h3 className={styles.statNumber}>20+</h3>
                <p className={styles.statText}>Лет на рынке</p>
              </div>
              <div className={styles.stat}>
                <h3 className={styles.statNumber}>1M+</h3>
                <p className={styles.statText}>Довольных клиентов</p>
              </div>
              <div className={styles.stat}>
                <h3 className={styles.statNumber}>100+</h3>
                <p className={styles.statText}>Отделений</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 