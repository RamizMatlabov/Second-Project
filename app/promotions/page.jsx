'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGift, FaPercent, FaTimes } from 'react-icons/fa';
import styles from './page.module.scss';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: {
    staggerChildren: 0.1,
  },
};

const promoItems = [
  {
    type: 'Карта',
    title: 'Кэшбэк до 15% на путешествия',
    description:
      'Повышенный кэшбэк по премиальным картам SafePoint Travel на авиабилеты, отели и аренду авто.',
    label: 'До 30 июня',
    fullTerms: [
      'Размер кэшбэка зависит от категории MCC и уровня карты.',
      'Максимальная сумма кэшбэка в расчетный период — эквивалент 1 500 000 UZS.',
      'Кэшбэк начисляется в течение 10 рабочих дней после завершения расчетного периода.',
      'Не действует на операции перевода P2P, снятия наличных и квази-кэш.',
      'Банк оставляет за собой право изменять условия с уведомлением клиентов.'
    ],
  },
  {
    type: 'Вклад',
    title: 'Повышенная ставка на новые вклады',
    description:
      'Откройте новый вклад онлайн и получите дополнительный бонус к базовой ставке.',
    label: 'Только онлайн‑оформление',
    fullTerms: [
      'Повышенная ставка применяется только к новым договорам, оформленным через мобильное приложение или сайт.',
      'Минимальная сумма вклада — 1 000 000 UZS.',
      'Досрочное расторжение приводит к перерасчету процентов по ставке до востребования.',
      'Срок действия акции и размер бонуса могут быть изменены банком.',
      'Налогообложение процентов производится в соответствии с законодательством.'
    ],
  },
  {
    type: 'Кредит',
    title: 'Льготный период до 90 дней',
    description:
      'Оформите кредитную карту и пользуйтесь средствами без процентов в течение льготного периода.',
    label: 'Условия могут отличаться в зависимости от тарифа',
    fullTerms: [
      'Льготный период распространяется на безналичные покупки, кроме операций снятия наличных.',
      'Минимальный обязательный платеж и сроки его внесения определяются тарифами.',
      'При несоблюдении сроков платежа льготный период прекращается.',
      'Кредитный лимит и условия зависят от результатов скоринговой оценки.',
      'Подробные тарифы доступны на сайте и в отделениях банка.'
    ],
  },
];

export default function PromotionsPage() {
  const [selectedPromo, setSelectedPromo] = useState(null);

  useEffect(() => {
    if (!selectedPromo) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPromo(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selectedPromo]);

  const closeModal = () => setSelectedPromo(null);
  const onBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>Акции и специальные предложения</h1>
          <p>
            Актуальные промо‑предложения, бонусы и повышенные ставки для клиентов SafePoint Bank.
          </p>
        </motion.div>
      </section>

      <section className={styles.promos}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Текущие акции</h2>
            <p>
              Ниже представлены примеры активных акций. В дальнейшем блок можно наполнить данными
              из CMS или бэкенда.
            </p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {promoItems.map((promo) => (
              <motion.article
                key={promo.title}
                className={styles.promoCard}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className={styles.promoMeta}>
                  <span className={styles.badge}>{promo.type}</span>
                  <span className={styles.label}>{promo.label}</span>
                </div>
                <h3>{promo.title}</h3>
                <p className={styles.description}>{promo.description}</p>
                <button
                  className={styles.outlineButton}
                  onClick={() => setSelectedPromo(promo)}
                >
                  Подробнее об условиях
                </button>
              </motion.article>
            ))}
          </motion.div>

          <section className={styles.notice}>
            <div className={styles.noticeIcon}>
              <FaPercent />
            </div>
            <div className={styles.noticeContent}>
              <h2>Важно</h2>
              <p>
                Все указанные условия являются примером. После подключения реальных продуктов сюда
                необходимо будет подставлять юридически значимую информацию и полные правила акций.
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaIcon}>
            <FaGift />
          </div>
          <div className={styles.ctaContent}>
            <h2>Подпишитесь на новые предложения</h2>
            <p>
              В будущем здесь можно будет подключить подписку на email‑ или пуш‑уведомления о
              новых акциях и бонусах.
            </p>
          </div>
          <button className={styles.primaryButton}>
            Подписаться
          </button>
        </div>
      </section>
      <AnimatePresence>
        {selectedPromo && (
          <motion.div
            className={styles.modalBackdrop}
            onClick={onBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={styles.modalContainer}
              role="dialog"
              aria-modal="true"
              aria-labelledby="promo-title"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.modalHeader}>
                <h3 id="promo-title" className={styles.modalTitle}>
                  {selectedPromo.title}
                </h3>
                <button
                  aria-label="Закрыть"
                  className={styles.modalClose}
                  onClick={closeModal}
                >
                  <FaTimes />
                </button>
              </div>

              <div className={styles.modalBody}>
                {Array.isArray(selectedPromo.fullTerms) ? (
                  <ul className={styles.termsList}>
                    {selectedPromo.fullTerms.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{selectedPromo.fullTerms}</p>
                )}
              </div>

              <div className={styles.modalFooter}>
                <button className={styles.modalAction} onClick={closeModal}>
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


