"use client";
import React, { useState } from 'react'
import styles from './WebViewLoanDetail.module.css';


export default function WebViewLoanDetail() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={styles.productContainer}>
      <div className={styles.productHeader}>
        <h2 className={styles.productTitle}>대출이름</h2>
        <span className={styles.productTag}>전세대출</span>
      </div>
      <p className={styles.productDescription}>주택금융공사 주택신용보증서 담보(90%보증)로 영업점 방문없이 인터넷상담 및 대출 실행이 가능한 전세대출</p>

      <div className={styles.productInfoSection}>
                <div 
                    className={styles.infoHeader} 
                    onClick={() => setIsExpanded(!isExpanded)}
                >   
                    <span>상품안내</span>
                    <span className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}>
                        ▼
                    </span>
                </div>
                <hr className ={styles.line}></hr>
                <div className={`${styles.infoContent} ${isExpanded ? styles.show : ''}`}>
                    <div className={styles.contentInner}>
                        <p>상품 상세 내용이 들어갑니다...</p>
                        <p>대출대상, 한도, 금리 등의 정보가 들어갑니다.</p>
                    </div>
                </div>
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.callBtn}>상담시 연결</button>
                <button className={styles.gotoOtherLoanBtn}>다른 대출상품보러가기</button>
            </div>
        
    </div>
  );
};

