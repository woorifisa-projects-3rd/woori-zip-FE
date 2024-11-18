import React, { useRef, useState, useEffect } from 'react';
import CategoryMenu from './CategoryMenu';
import styles from '../map/Sidebar.module.css';

export default function Sidebar({ selectedCategory, onSelectCategory }) {
    const categories = [
      { name: '원/투룸', image: '/images/map/house.png', key: 'oneroom' },
      { name: '오피스텔', image: '/images/map/officetel.png', key: 'officetel' },
      { name: '주택/빌라', image: '/images/map/house.png', key: 'house' },
      { name: '아파트', image: '/images/map/apartment.png', key: 'apartment' },
    ];

    const filterButtonRef = useRef(null);
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // 화면 크기 감지하여 isMobile 설정
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 393);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = (key) => {
        if (typeof onSelectCategory === 'function') {
            onSelectCategory(key);
        }
    };

    const toggleFilterMenu = () => {
        setFilterVisible((prev) => !prev);
    };

    return (
        <div className={styles.sidebar}>
          {categories.map((category) => (
            <div
              key={category.key}
              className={`${styles.menuItem} ${
                selectedCategory === category.key ? styles.selected : ''
              }`}
              onClick={() => handleClick(category.key)}
            >
              <img src={category.image} alt={category.name} className={styles.icon} />
              <span className={styles.text}>{category.name}</span>
            </div>
          ))}

          {/* 모바일에서만 표시되는 필터 설정 버튼 */}
          {isMobile && (
            <button
              ref={filterButtonRef}
              className={styles.mobileFilterButton}
              onClick={toggleFilterMenu}
            >
              필터 설정하기
            </button>
          )}

          {/* 필터 메뉴 */}
          {isFilterVisible && (
            <CategoryMenu
              isVisible={isFilterVisible}
              onClose={() => setFilterVisible(false)}
              buttonRef={filterButtonRef}
            />
          )}
        </div>
    );
}
