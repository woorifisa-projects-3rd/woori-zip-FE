"use client"
import React, { useEffect, useState } from 'react'
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

  return (
    <>
    {isMobile ? <WebViewLoanCheckList/> : <CheckList/>}
    </>
  );
};
