'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import styles from './LoanView.module.css';
import LoanViewCard from './LoanViewCard';
import { useLoanManager } from '../hooks/useLoanManager';
import { deleteLoanProduct } from '../../../../app/api/manager/managerAPI'; // 삭제 API 가져오기

const LoanView = () => {
  const {
    loanData,
    isLoading,
    showLoadingMessage,
    error,
    loadMore,
    setLoanData, // loanData 업데이트를 위한 setter
  } = useLoanManager();

  console.log('[LoanView] Current loanData:', loanData);
  console.log('[LoanView] Loading state:', isLoading);

  const observerRef = useRef(null);
  const previousLastItemRef = useRef(null);
  const scrollPositionKey = 'loanViewScrollPosition';

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) {
        console.log('[lastItemRef] Skip observer setup - loading in progress');
        return;
      }

      if (observerRef.current) {
        console.log('[lastItemRef] Disconnecting previous observer');
        observerRef.current.disconnect();
      }

      console.log('[lastItemRef] Setting up new observer');
      observerRef.current = new IntersectionObserver((entries) => {
        console.log('[IntersectionObserver] Entry intersecting:', entries[0]?.isIntersecting);
        console.log('[IntersectionObserver] HasNext:', loanData.hasNext);

        if (entries[0].isIntersecting && loanData.hasNext) {
          console.log('[IntersectionObserver] Triggering loadMore');
          if (node) previousLastItemRef.current = node;
          loadMore();
        }
      });

      if (node) {
        console.log('[lastItemRef] Starting to observe node');
        observerRef.current.observe(node);
      }
    },
    [isLoading, loanData.hasNext, loadMore]
  );

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem(scrollPositionKey);
    if (savedScrollPosition) {
      console.log('[ScrollRestore] Restoring scroll position:', savedScrollPosition);
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  useEffect(() => {
    const saveScrollPosition = () => {
      const position = window.scrollY.toString();
      console.log('[ScrollSave] Saving scroll position:', position);
      localStorage.setItem(scrollPositionKey, position);
    };

    window.addEventListener('scroll', saveScrollPosition);
    return () => window.removeEventListener('scroll', saveScrollPosition);
  }, []);

  useEffect(() => {
    if (
      !isLoading &&
      previousLastItemRef.current &&
      document.body.contains(previousLastItemRef.current)
    ) {
      console.log('[ScrollAdjust] Adjusting scroll to previous item');
      previousLastItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [loanData.loans, isLoading]);

  // 삭제 버튼 핸들러
  const handleDelete = async (loanId) => {
    try {
      console.log(`[LoanView] Deleting loan product with ID: ${loanId}`);
      await deleteLoanProduct(loanId); // 삭제 API 호출

      // 삭제 후 상태 업데이트
      setLoanData((prevData) => {
        const updatedLoans = prevData.loans.filter((loan) => loan.id !== loanId);
        return {
          ...prevData,
          loans: updatedLoans,
          numberOfElements: updatedLoans.length,
        };
      });

      alert('대출 상품이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('[LoanView] Failed to delete loan product:', error);
      alert('대출 상품 삭제에 실패했습니다.');
    }
  };

  if (error) {
    console.error('[LoanView] Error state:', error);
    return <div className={styles.emptyState}>{error}</div>;
  }

  if (!loanData.loans?.length && !isLoading) {
    console.log('[LoanView] Empty state');
    return <div className={styles.emptyState}>대출 상품이 존재하지 않습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {loanData.loans.map((loan, index) => {
          const isLastItem = index === loanData.loans.length - 1;
          return (
            <div key={loan.id || index} ref={isLastItem ? lastItemRef : null}>
              <LoanViewCard
                loanGoods={loan}
                onDelete={() => handleDelete(loan.id)} // 삭제 핸들러 연결
              />
            </div>
          );
        })}
      </div>
      {(showLoadingMessage && loanData.hasNext) && (
        <div className={styles.loadingMessage}>데이터를 불러오는 중...</div>
      )}
    </div>
  );
};

export default LoanView;