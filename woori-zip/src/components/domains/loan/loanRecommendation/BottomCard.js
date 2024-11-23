"use client";
import React, { useEffect, useState } from 'react';
import styles from './BottomCard.module.css'; 
import CardList from './CardList';

const BottomCard = () => {
  const [loanRecommendations, setloanRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        setIsLoading(true);

        // const response = await fetch(`/api/v1/loans/recommendation`);

        // if(!response.ok)
        //   throw new Error('대출추천목록을 불러오는데 실패했습니다');

        // const loanRecommendations = await response.json();

        //이부분 삭제
        const loanRecommendations =[
          {
            id: 1,
            name: "a",
            image: "src1",
            title: "이건",
            description: "내용1",
            type: "JEONSE",
            loanAmount: 345000000,
            downPayment: 50000000,
            duration: 200,
            interestRate: 34,
            minIncome: 600,
            maxIncome: 0,
            loanInterestRate: 2.8,
          },
          {
            id: 2,
            name: "b",
            image: "src2",
            title: "이건2",
            description: "내용2",
            type: "JEONSE",
            loanAmount: 345000000,
            downPayment: 75000000,
            duration: 7,
            interestRate: 34,
            minIncome: 600,
            maxIncome: 0,
            loanInterestRate: 2.8,
          }
        ];


        setloanRecommendations(loanRecommendations);
      }catch(err) {
        setError(err.message);
      }finally{
        setIsLoading(false);
      }
    };
    fetchLoanDetails();
  },[]);


  return (
    <div className={styles.fullBottomCard}>
      <div className={styles.bottomCard}>
        <h1 id={styles.bottomText}>OOO 님을 위한 다른 대출 상품이에요</h1>
        <CardList items={loanRecommendations} isLoading={isLoading} error={error}/>
      </div>
    </div>
  );
};

export default BottomCard;
