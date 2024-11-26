"use client";
import React, { useEffect, useState } from 'react';
import styles from './BottomCard.module.css'; 
import Link from "next/link"; 


const BottomCard = ({loanRecommendations}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  if (!loanRecommendations || !Array.isArray(loanRecommendations)) {
    return <p>아이템이 비어있습니다</p>;
  }
  loanRecommendations = loanRecommendations.slice(1);
  // 터치 이벤트 핸들러들
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    }
    if (distance < -50) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // 다음/이전 슬라이드 핸들러
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(loanRecommendations.length - 2, prevIndex + 2)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };

  // 총 슬라이드 수 계산
  const totalSlides = Math.ceil(loanRecommendations.length / 2);

  // 현재 보여줄 카드들만 선택
  const visibleCards = loanRecommendations.slice(currentIndex, currentIndex + 2);

  return (
    <div className={styles.fullBottomCard}>
      <div className={styles.bottomCard}>
        <h1 id={styles.bottomText}>OOO 님을 위한 다른 대출 상품이에요</h1>
        <div className={styles.cardContainer}>
          <div
            className={styles.cardSlider}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {visibleCards.map((item) => (
              <div key={item.id} className={styles.cardItem}>
                <Link href = {`/loan/loanDetail/${item.id}`}>
                  <div className={styles.imageContainer}>
                    <img
                      className={styles.cardImage}
                      src={item.image}
                      alt={`Item ${item.id}`}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <button className={styles.detailButton}>상세보기</button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className={`${styles.navButton} ${styles.prev}`}
              aria-label="이전 슬라이드"
            >
              ←
            </button>
          )}

          {currentIndex < loanRecommendations.length - 2 && (
            <button
              onClick={handleNext}
              className={`${styles.navButton} ${styles.next}`}
              aria-label="다음 슬라이드"
            >
              →
            </button>
          )}

          <div className={styles.pagination}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 2)}
                className={`${styles.dotButton} ${
                  currentIndex / 2 === index ? styles.active : ""
                }`}
                aria-label={`슬라이드 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BottomCard;
