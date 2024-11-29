'use client'

import LoginIntro from '@/components/domains/user/login/LoginIntro'
import React, { useEffect, useState } from 'react'

function page() {
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleWooriBankLogin = async (e) => {
    e.preventDefault();
    const responseType = process.env.RESPONSE_TYPE;
    const clientId = process.env.CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URL;

    const params = new URLSearchParams({
            responseType,
            clientId,
            redirectUri,
    });
    
    setRedirectUrl(`http://localhost:8082/woori-bank/auth?${params.toString()}`);
  }
    useEffect(() => {
      if (redirectUrl) {
          console.log('Redirecting to:', redirectUrl);
          window.location.href = redirectUrl; // 리다이렉트
      }
    }, [redirectUrl]);
  

  return <LoginIntro handleWooriBankLogin={handleWooriBankLogin} />
  
}

export default page;
