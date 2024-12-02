'use client';

import { useEffect } from 'react';
import styles from './Loan.module.css';
import { useLoan } from './hooks/useLoan';
import LoanCard from './LoanCard';

const Loan = () => {
  const {
    loanData,
    isLoading,
    error,
  } = useLoan();

  console.log("Loan.js -> isLoading:", isLoading);
  console.log("Loan.js -> loanData:", loanData);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  if (!loanData.recentlyLoanGoods || loanData.recentlyLoanGoods.length === 0) {
    return (
      <div className={styles.container}>
        최근에 본 대출이 존재하지 않습니다.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <LoanCard property={loanData.recentlyLoanGoods} />
        </div>
    </div>
  );
};

export default Loan;