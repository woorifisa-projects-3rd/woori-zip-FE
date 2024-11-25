"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './Detail.module.css'; 
import Link from "next/link"; 

const Details = ({loanDetails}) => {
  
  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.titleAndImageBox}>
          <div className={styles.leftBox}>
            <h1 className={styles.loanTitle}>{loanDetails.name}</h1>
            <div className={styles.loanType}>{loanDetails.loanGoodsType === 'JEONSE'?'전세' : '월세'}</div>
          </div>
          <div className= {styles.rightBox}>
            <img  src={loanDetails.imageUrl} 
                  alt={loanDetails.name}
                  className={styles.loanImage}
            />
            </div>
          </div>
         <div className={styles.line}></div>
         <p className={styles.loanDescription}>{loanDetails.description}</p>
      </div>

      <div className={styles.bottomBox}>
      <p className={styles.loanContent}>{loanDetails.content}</p>
      </div>

      <Link href={`/loan/loanCheckList?loanGoodsType=${loanDetails.loanGoodsType}`}>
        <button className={styles.goToChecklistButton}>
          대출 자격 요건 확인
        </button>
      </Link>
    </div>
  );
};

export default Details;
