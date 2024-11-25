"use client"
import React, { useEffect, useState } from 'react';
import WideCard from '@/components/domains/loan/loanRecommendation/WideCard';
import BottomCard from '@/components/domains/loan/loanRecommendation/BottomCard';
import { loanRecommendationApi } from '@/components/domains/loan/api/loanAPI'


export default function LoanRecommendation() {

  const [loanRecommendations, setLoanRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {

    const fetchLoanRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await loanRecommendationApi.getLoanRecommendations();
        console.log(response);
        setLoanRecommendations(response);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
      fetchLoanRecommendations();  
  }, []);  

  if (isLoading) return <p>로딩 중...</p>; 

  if (error) return <p>{error}</p>; 

  if (!loanRecommendations || !Array.isArray(loanRecommendations) || loanRecommendations.length === 0) {
      alert("추천할 수 있는 대출 상품이 없습니다.");
      return null; 
  }

  return (
    <>
     {loanRecommendations && (
                <>
                    <WideCard loanRecommendations={loanRecommendations} />
                    <BottomCard loanRecommendations={loanRecommendations} />
                </>
      )}
    </>
  );
};

