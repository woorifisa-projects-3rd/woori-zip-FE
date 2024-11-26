"use client";
import React, { useState } from 'react'
import styles from './WebViewLoanDetail.module.css';
import Link from "next/link"; 


export default function WebViewLoanDetail({loanDetails}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={styles.productContainer}>
      <div className={styles.productHeader}>
        <h2 className={styles.productTitle}>{loanDetails.name}</h2>
        <span className={styles.productTag}>{loanDetails.loanGoodsType === 'JEONSE'?'전세' : '월세'}</span>
      </div>
      <p className={styles.productDescription}>{loanDetails.description}</p>

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
                      {loanDetails.content}
                    </div>
                </div>
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.callBtn}>상담시 연결</button>
                <Link href={`/loan/loanCheckList?loanGoodsType=${loanDetails.loanGoodsType}`}>
                  <button className={styles.goToChecklistButton}>대출 자격 요건 확인</button>
                </Link>
            </div>
        
    </div>
  );
};

