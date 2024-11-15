import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from '../map/CategoryMenu.module.css';

export default function CategoryMenu({ isVisible, onClose, buttonRef }) {
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  const [depositValue, setDepositValue] = useState(0);
  const [monthlyRentValue, setMonthlyRentValue] = useState(0);
  const [maintenanceValue, setMaintenanceValue] = useState(0);

  // 거래 유형과 카테고리 버튼의 선택 상태 관리
  const [selectedTransactionType, setSelectedTransactionType] = useState(''); // 거래 유형
  const [selectedCategory, setSelectedCategory] = useState(''); // 카테고리

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 393); // 모바일 화면 너비 설정
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 웹일 때만 위치 설정
  useLayoutEffect(() => {
    if (buttonRef?.current && isVisible && !isMobile) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + 5,
        left: buttonRect.left - 150,
      });
    }
  }, [isVisible, buttonRef, isMobile]);

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className={`${isMobile ? styles.mobileMenu : styles.webMenu}`}
      style={!isMobile ? { top: `${position.top}px`, left: `${position.left}px` } : {}}
      onClick={(e) => e.stopPropagation()}
    >
      {isMobile ? (
        <>
          <div className={styles.header}>
            <h4 className={styles.menuTitle}>거래 유형</h4>
            <div className={styles.toggleButtons}>
              {['전체', '월세', '전세'].map((type) => (
                <button
                  key={type}
                  className={`${styles.toggleButton} ${selectedTransactionType === type ? styles.selected : ''}`}
                  onClick={() => setSelectedTransactionType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.rangeGroup}>
            <label className={styles.rangeLabel}>보증금 금액 범위</label>
            <input
              type="range"
              min="0"
              max="2000000"
              step="100000"
              value={depositValue}
              onChange={(e) => setDepositValue(e.target.value)}
              className={styles.rangeSlider}
            />
            <div className={styles.rangeValues}>{(depositValue / 10000).toFixed(0)}만 - 200만</div>
          </div>
          <div className={styles.rangeGroup}>
            <label className={styles.rangeLabel}>월세 금액 범위</label>
            <input
              type="range"
              min="0"
              max="400000"
              step="100000"
              value={monthlyRentValue}
              onChange={(e) => setMonthlyRentValue(e.target.value)}
              className={styles.rangeSlider}
            />
            <div className={styles.rangeValues}>{(monthlyRentValue / 10000).toFixed(0)}만 - 40만</div>
          </div>
          <div className={styles.rangeGroup}>
            <label className={styles.rangeLabel}>관리비 금액 범위</label>
            <input
              type="range"
              min="0"
              max="50000"
              step="10000"
              value={maintenanceValue}
              onChange={(e) => setMaintenanceValue(e.target.value)}
              className={styles.rangeSlider}
            />
            <div className={styles.rangeValues}>{(maintenanceValue / 10000).toFixed(0)}만 - 5만</div>
          </div>
          <div className={styles.options}>
            <label className={styles.categoryLabel}>카테고리</label>
            {['선택하지 않음', '자동차정비/유지', '문화/취미', '서적/문구', '의류', '음식료품', '식당/카페'].map((category) => (
              <button
                key={category}
                className={`${styles.optionButton} ${selectedCategory === category ? styles.selected : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>집에서부터 도보 거리</label>
            <div className={styles.inputFieldWrapper}>
              <input type="number" defaultValue="10" className={styles.inputField} />
              <span className={styles.unitLabel}>분</span>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>카테고리 시설 개수</label>
            <div className={styles.inputFieldWrapper}>
              <input type="number" defaultValue="3" className={styles.inputField} />
              <span className={styles.unitLabel}>개</span>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.cancelButton} onClick={onClose}>닫기</button>
            <button className={styles.applyButton}>적용</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <h4 className={styles.menuTitle}>카테고리</h4>
            <span className={styles.menuDescription}>카테고리는 1가지만 선택 가능합니다.</span>
          </div>
          <div className={styles.options}>
            {['선택하지 않음', '자동차정비/유지', '문화/취미', '서적/문구', '의류', '음식료품', '식당/카페'].map((category) => (
              <button
                key={category}
                className={`${styles.optionButton} ${selectedCategory === category ? styles.selected : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>집에서부터 도보 거리</label>
            <div className={styles.inputFieldWrapper}>
              <input type="number" defaultValue="10" className={styles.inputField} />
              <span className={styles.unitLabel}>분</span>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>카테고리 시설 개수</label>
            <div className={styles.inputFieldWrapper}>
              <input type="number" defaultValue="3" className={styles.inputField} />
              <span className={styles.unitLabel}>개</span>
            </div>
          </div>
          <button className={styles.applyButton} onClick={onClose}>적용</button>
        </>
      )}
    </div>
  );
}
