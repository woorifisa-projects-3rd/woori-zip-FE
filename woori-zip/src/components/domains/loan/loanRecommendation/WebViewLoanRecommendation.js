import React from 'react'
import styles from './WebViewLoanRecommendation.module.css';


export default function WebViewLoanRecommendation() {
  return (
    <div className={styles.full}>
      <h1 className={styles.recommendText}>000님에게 추천하는 대출 상품이에요</h1>
      <div className={styles.recommendContainer}>
        <div className={styles.recommendItem}>
            <img className={styles.recommendImg} src="https://via.placeholder.com/200" alt="이미지 1"/>
            <button className={styles.recommendDetailBtn}>상세보기</button>
        </div>
      </div>
      
    </div>
  );
};

