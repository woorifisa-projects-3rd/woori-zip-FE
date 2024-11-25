"use client"
import React, { useEffect, useState } from 'react';
import CheckList from '@/components/domains/loan/loanCheckList/CheckList';
import {useSearchParams} from 'next/navigation';
import { loanChecklistApi } from '@/components/domains/loan/api/loanAPI'

export default function LoanCheckList() {
// console.log(useSearchParams().get('loanGoodsType'));
  const  loanGoodsType  =  useSearchParams().get('loanGoodsType');
  const [loanQuestions, setLoanQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {

    const fetchLoanCheckLists = async (loanGoodsType) => {
      console.log('API 호출 시작', loanGoodsType);
      try {
        setIsLoading(true);
        const response = await loanChecklistApi.getChecklistQuestions(loanGoodsType);
        setLoanQuestions(response);

      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (loanGoodsType){
      fetchLoanCheckLists(loanGoodsType);  
    }
  }, [loanGoodsType]);  

  if (isLoading) return <p>로딩 중...</p>; 

  if (error) return <p>{error}</p>; 

  return (
    <>
      <CheckList loanQuestions ={loanQuestions} isLoading={isLoading}/>
    </>
  );
};

