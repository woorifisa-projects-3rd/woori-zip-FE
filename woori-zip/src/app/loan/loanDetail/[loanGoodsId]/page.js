"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Details from '@/components/domains/loan/loanDetail/Detail';


export default function LoanDetail() {
  const { loanGoodsId } = useParams();
  const [loanDetails, setLoanDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!loanGoodsId) return;  

    const fetchLoanDetails = async () => {
      console.log('API 호출 시작', loanGoodsId);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/loans/${loanGoodsId}`);
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
        const data = await response.json();
        setLoanDetails(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);  
    fetchLoanDetails();  
  }, [loanGoodsId]);  

  if (isLoading) return <p>로딩 중...</p>; 

  if (error) return <p>{error}</p>; 
  
  return (
    <>
      <Details loanDetails={loanDetails}/>    
    </>
  );
};

