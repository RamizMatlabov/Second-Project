'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './LoanCalculator.module.scss';

export default function LoanCalculator({ loan, onApply }) {
  const [amount, setAmount] = useState(loan.maxAmount / 2);
  const [term, setTerm] = useState(loan.maxTerm / 2);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    calculatePayment();
  }, [amount, term, loan.rate]);

  const calculatePayment = () => {
    const monthlyRate = loan.rate / 12 / 100;
    const payment =
      (amount * (monthlyRate * Math.pow(1 + monthlyRate, term))) /
      (Math.pow(1 + monthlyRate, term) - 1);
    setMonthlyPayment(Math.round(payment));
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.header}>
        <h3>{loan.name} кредит</h3>
        <p className={styles.rate}>Ставка: {loan.rate}%</p>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelRow}>
          <span>Сумма кредита</span>
          <span className={styles.value}>{formatNumber(amount)} сум</span>
        </div>
        <Slider
          min={1000000}
          max={loan.maxAmount}
          step={1000000}
          value={amount}
          onChange={(val) => setAmount(val)}
          trackStyle={{ backgroundColor: 'var(--accent-color)', height: 6 }}
          handleStyle={{
            borderColor: 'var(--accent-color)',
            height: 20,
            width: 20,
            marginTop: -7,
            backgroundColor: '#fff',
            opacity: 1,
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)',
          }}
          railStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 6 }}
        />
        <div className={styles.rangeLabels}>
          <span>1 млн</span>
          <span>{formatNumber(loan.maxAmount)} сум</span>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelRow}>
          <span>Срок кредита</span>
          <span className={styles.value}>{term} мес.</span>
        </div>
        <Slider
          min={3}
          max={loan.maxTerm}
          step={1}
          value={term}
          onChange={(val) => setTerm(val)}
          trackStyle={{ backgroundColor: 'var(--accent-color)', height: 6 }}
          handleStyle={{
            borderColor: 'var(--accent-color)',
            height: 20,
            width: 20,
            marginTop: -7,
            backgroundColor: '#fff',
            opacity: 1,
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)',
          }}
          railStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: 6 }}
        />
        <div className={styles.rangeLabels}>
          <span>3 мес.</span>
          <span>{loan.maxTerm} мес.</span>
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.resultItem}>
          <span>Ежемесячный платеж:</span>
          <span className={styles.paymentValue}>{formatNumber(monthlyPayment)} сум</span>
        </div>
      </div>

      <button className={styles.applyButton} onClick={() => onApply({ amount, term, monthlyPayment })}>
        Оставить заявку
      </button>
    </div>
  );
}
