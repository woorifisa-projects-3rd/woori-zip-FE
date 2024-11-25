'use client';
import React from 'react'
import styles from './WideCard.module.css';
import WideCardButton from './WideCardButton';

const WideCard = ({loanRecommendations}) => {
  
  if (!loanRecommendations || loanRecommendations.length === 0) {
    return <p>추천할 대출 상품이 없습니다.</p>;
  }

  const loanGoodsId = loanRecommendations[0].id; 
  console.log(loanGoodsId);

    return (
      <div className={styles.backCard}>
        <h1 id ={styles.topText}>ooo님께 추천하는 대출 상품이에요</h1>
        <div className={styles.container}>
          <div className={styles.wideCard}>
              <div className={styles.topBox}>
              <div className={styles.titleAndImageBox}>
                <div className={styles.leftBox}>
                <div className={styles.loanType}>{loanRecommendations[0].loanGoodsType === 'JEONSE'?'전세' : '월세'}</div>
                  <h1 className={styles.loanTitle}>{loanRecommendations[0].name}</h1>
                  
                </div>
                <div className= {styles.rightBox}>
                  <img  src={loanRecommendations.imageUrl} 
                        alt={loanRecommendations.name}
                        className={styles.loanImage}
                  />
                  </div>
              </div>
            <div className={styles.line}></div>
            <p className={styles.loanDescription}>{loanRecommendations[0].description}</p>
          </div>
            <WideCardButton loanGoodsId = {loanGoodsId}/>
          </div>

        </div>
      </div>
    );
  };
  
  export default WideCard;