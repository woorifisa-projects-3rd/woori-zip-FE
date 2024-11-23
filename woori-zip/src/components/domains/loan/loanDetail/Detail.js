"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './Detail.module.css'; 
import CardList from '../loanRecommendation/CardList';

{/*  대출 이름/}
        {/ 대출 설명, 대출 사진 /}
        {/ 대출 타입 /}
        {/ 대출상세설명 */}

const Details = ({loanDetails}) => {



  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.titleAndImageBox}>
          <div className={styles.leftBox}>
            <h1 className={styles.loanTitle}>{loanDetails.name}</h1>
            <div className={styles.loanType}>{loanDetails.loanGoodstype === 'JENSOE'?'전세' : '월세'}</div>
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

      <button className={styles.goToChecklistButton}>
        대출 자격 요건 확인
      </button>
    </div>
  );
};

export default Details;
