'use client';
import React from 'react'
import styles from './WebViewLoanRecommendation.module.css';
import Link from "next/link"; 

export default function WebViewLoanRecommendation({loanRecommendations}) {
  
  if (!loanRecommendations || loanRecommendations.length === 0) {
    return (
      <div className={styles.full}>
        <h1 className={styles.recommendText}>추천할 대출 상품이 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className={styles.full}>
      <h1 className={styles.recommendText}>000님에게 추천하는 대출 상품이에요</h1>
      <div className={styles.recommendContainer}>
      {loanRecommendations.map((loan) => (
        <div key={loan.id} className={styles.recommendItem}>
            <img  src={loan.imageUrl} 
                  alt={loan.name}
                  className={styles.loanImage}/>
          <Link href = {`/loan/loanDetail/${loan.id}`}>
            <button className={styles.recommendDetailBtn}>상세보기</button>
          </Link>
        </div>
      ))}
      </div>
      
    </div>
  );
};

