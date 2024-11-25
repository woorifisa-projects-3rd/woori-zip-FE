"use client"
"use client"
import React, { useEffect, useState } from 'react'
import {useSearchParams} from 'next/navigation';
import { loanChecklistApi } from '@/components/domains/loan/api/loanAPI'

import CheckList from '@/components/domains/loan/loanCheckList/CheckList';
import WebViewLoanCheckList from '@/components/domains/loan/loanCheckList/WebViewLoanCheckList';


export default function LoanCheckList() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=> {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 393);
    };
    
    handleResize(); //초기 렌더링 시 한번만 적용
    window.addEventListener('resize',handleResize); //윈도우 크기 변경시 이벤트 리스너 등록
    return () => window.removeEventListener('resize',handleResize); // 이벤트 리스너 제거
  },[]);

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
    {isMobile ? <WebViewLoanCheckList/> : <CheckList loanQuestions ={loanQuestions} isLoading={isLoading}/>}
    </>
  );
};
