'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import styles from './LoanView.module.css';
import LoanViewCard from './LoanViewCard';
import { useLoanManager } from '../hooks/useLoanManager';
import { deleteLoanProduct, updateLoanProduct } from '../../../../app/api/manager/managerAPI';

const LoanView = () => {
  const {
    loanData,
    isLoading,
    showLoadingMessage,
    error,
    loadMore,
    setLoanData,
  } = useLoanManager();

  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const observerRef = useRef(null);
  const previousLastItemRef = useRef(null);
  const scrollPositionKey = 'loanViewScrollPosition';
  const lastScrollPosition = useRef(0);
  const isInitialMount = useRef(true);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loanData.hasNext) {
          loadMore();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, loanData.hasNext, loadMore]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const savedScrollPosition = localStorage.getItem(scrollPositionKey);
      if (savedScrollPosition && !isAnyModalOpen) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }
    }

    const saveScrollPosition = () => {
      if (!isAnyModalOpen) {
        lastScrollPosition.current = window.scrollY;
        localStorage.setItem(scrollPositionKey, lastScrollPosition.current.toString());
      }
    };

    window.addEventListener('scroll', saveScrollPosition);
    return () => window.removeEventListener('scroll', saveScrollPosition);
  }, [isAnyModalOpen]);

  useEffect(() => {
    if (!isAnyModalOpen && lastScrollPosition.current > 0) {
      window.scrollTo(0, lastScrollPosition.current);
    }
  }, [isAnyModalOpen]);

  const handleEdit = async (loanId, editedData) => {
    try {
     await updateLoanProduct(loanId, editedData);
      console.log(editedData, "hi");
      setLoanData(prevData => ({
        ...prevData,
        loans: prevData.loans.map(loan =>
          loan.id === loanId ? { ...loan, ...editedData } : loan
        )
      }));
    } catch (error) {
      console.error('수정 중 오류:', error);
      throw error;
    }
  };

  const handleDelete = async (loanId) => {
    try {
      await deleteLoanProduct(loanId);
      
      setLoanData(prevData => ({
        ...prevData,
        loans: prevData.loans.filter(loan => loan.id !== loanId),
        numberOfElements: prevData.numberOfElements - 1
      }));
    } catch (error) {
      console.error('삭제 중 오류:', error);
      throw error;
    }
  };

  if (error) {
    return (
      <div className={styles.errorState}>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        <p>{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!loanData.loans?.length && !isLoading) {
    return <div className={styles.emptyState}>대출 상품이 존재하지 않습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {loanData.loans.map((loan, index) => {
          const isLastItem = index === loanData.loans.length - 1;
          return (
            <div
              key={loan.id || index}
              ref={isLastItem ? lastItemRef : null}
            >
              <LoanViewCard
                loanGoods={loan}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onModalStateChange={setIsAnyModalOpen}
                setLoanData = {setLoanData}
              />
            </div>
          );
        })}
      </div>
      {(showLoadingMessage && loanData.hasNext) && (
        <div className={styles.loadingMessage}>
          데이터를 불러오는 중...
        </div>
      )}
    </div>
  );
};

export default LoanView;