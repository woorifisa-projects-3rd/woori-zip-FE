import React from 'react'
import './WideCard.css'
import WideCardButton from './WideCardButton';

const WideCard = () => {
    return (
      <div>
        <h1 id ="top-text">ooo님께 추천하는 대출 상품이에요</h1>
        <div className="wide-card">
          ITOUCH 전세론
          <WideCardButton/>
        </div>
      </div>
    );
  };
  
  export default WideCard;