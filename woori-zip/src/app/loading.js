"use client";

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), {
 ssr: false,
 loading: () => <p>Loading...</p>
});

import loadingAnimation from "./loading-animation.json";

export default function Loading() {
 return (
   <div 
     style={{ 
       display: "flex", 
       flexDirection: "column", 
       alignItems: "center", 
       justifyContent: "center", 
       height: "100vh" 
     }}
   >
     <Lottie 
       animationData={loadingAnimation} 
       loop={true} 
       style={{ width: 150, height: 150 }}
     />
     <p 
       style={{ 
         marginTop: "20px", 
         fontSize: "18px", 
         color: "#374151" 
       }}
     >
       페이지를 불러오는 중입니다...
     </p>
   </div>
 );
}