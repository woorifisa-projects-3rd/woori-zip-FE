import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Loan.module.css';
import { useLoan } from './hooks/useLoan';
import LoanCard from './LoanCard';

const Loan = () => {
  const {
    loanData,
    isLoading,
    error,
    loadMore
  } = useLoan();

  const observerRef = useRef(null);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loanData.hasNext) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, loanData.hasNext, loadMore]
  );

  console.log("Loan.js 데이터 확인 -> loanData:", loanData);

  console.log("데이터 확인: ", loanData.hasNext);

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
      <ul className={styles.cardList}>
        {loanData.recentlyLoanGoods.map((data, index) => (
          <li
            key={data.id || index} 
            ref={
              index === loanData.recentlyLoanGoods.length - 1
                ? lastItemRef
                : null 
            }
          >
            <LoanCard property={[data]} hasNext={loanData.hasNext} />
          </li>
        ))}
      </ul>
      {isLoading && <div className="loader">Loading...</div>}
    </div>

  );
};

export default Loan;