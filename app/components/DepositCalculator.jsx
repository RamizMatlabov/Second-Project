'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './DepositCalculator.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const DepositCalculator = ({ deposit }) => {
  const [amount, setAmount] = useState(1000000);
  const [term, setTerm] = useState(12);
  const [income, setIncome] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (deposit) {
      setTerm(deposit.minTerm); // Initialize term with minTerm from deposit
    }
  }, [deposit]);

  const calculateDeposit = useCallback(() => {
    if (!deposit) return;

    const rate = parseFloat(deposit.rate);
    const calculatedIncome = amount * (rate / 100) * (term / 12);
    setIncome(calculatedIncome);
    setTotalAmount(amount + calculatedIncome);
  }, [amount, term, deposit]);

  useEffect(() => {
    calculateDeposit();
  }, [amount, term, deposit, calculateDeposit]);

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleTermChange = (value) => {
    setTerm(value);
  };

  const handleManualAmountChange = (e) => {
    const value = parseInt(e.target.value.replace(/\D/g, ''), 10);
    setAmount(isNaN(value) ? 0 : value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!deposit) return null;

  return (
    <div className={styles.calculatorContainer}>
      <h2 className={styles.title}>Калькулятор вклада "{deposit.name}"</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="amount">Сумма вклада:</label>
        <input
          type="text"
          id="amount"
          value={formatCurrency(amount)}
          onChange={handleManualAmountChange}
          className={styles.textInput}
        />
        <Slider
          min={1000000}
          max={500000000}
          step={1000000}
          value={amount}
          onChange={handleAmountChange}
          className={styles.slider}
          trackStyle={{ backgroundColor: 'var(--accent-color)' }}
          handleStyle={{ borderColor: 'var(--accent-color)', backgroundColor: 'white' }}
          railStyle={{ backgroundColor: 'var(--glass-border)' }}
        />
        <div className={styles.sliderLabels}>
          <span>{formatCurrency(1000000)}</span>
          <span>{formatCurrency(500000000)}</span>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="term">Срок вклада (месяцев):</label>
        <input
          type="text"
          id="term"
          value={term}
          onChange={(e) => setTerm(parseInt(e.target.value, 10) || 0)}
          className={styles.textInput}
        />
        <Slider
          min={deposit.minTerm}
          max={deposit.maxTerm}
          step={1}
          value={term}
          onChange={handleTermChange}
          className={styles.slider}
          trackStyle={{ backgroundColor: 'var(--accent-color)' }}
          handleStyle={{ borderColor: 'var(--accent-color)', backgroundColor: 'white' }}
          railStyle={{ backgroundColor: 'var(--glass-border)' }}
        />
        <div className={styles.sliderLabels}>
          <span>{deposit.minTerm} мес.</span>
          <span>{deposit.maxTerm} мес.</span>
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.resultItem}>
          <span>Доход:</span>
          <span className={styles.resultValue}>{formatCurrency(income)}</span>
        </div>
        <div className={styles.resultItem}>
          <span>Итоговая сумма:</span>
          <span className={styles.resultValue}>{formatCurrency(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default DepositCalculator;
