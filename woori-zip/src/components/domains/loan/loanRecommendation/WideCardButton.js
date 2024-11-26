import React from 'react';
import styles from './WideCardButton.module.css'; 
import Link from "next/link"; 

const WideCardButton = ({loanGoodsId}) => {
  return (
    <div className={styles.buttonContainer}>
      <Link href = {`/loan/loanDetail/${loanGoodsId}`}>
        <button className={`${styles.button} ${styles.detailButton}`}>상세보기</button>
      </Link>
      <button className={`${styles.button} ${styles.consultButton}`}>상담사 연결</button>
    </div>
  );
};

export default WideCardButton;
