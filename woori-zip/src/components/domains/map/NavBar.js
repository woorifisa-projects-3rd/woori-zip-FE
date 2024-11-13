// components/NavBar.js
import React, { useRef, useState } from 'react';
import CategoryMenu from './CategoryMenu';
import styles from '../map/NavBar.module.css';

export default function NavBar() {
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
    const categoryButtonRef = useRef(null);

    const toggleCategoryMenu = () => {
        setCategoryMenuVisible((prev) => !prev);
    };

    return (
        <div className={styles.navBar}>
            {/* 웹 버전: 필터 드롭다운 메뉴와 카테고리 버튼 */}
            <div className={styles.webNav}>
                <select className={styles.filterSelect}>
                    <option>월세, 전세</option>
                </select>
                <select className={styles.filterSelect}>
                    <option>거래 금액</option>
                </select>
                <select className={styles.filterSelect}>
                    <option>관리비</option>
                </select>
                <button
                    ref={categoryButtonRef}
                    onClick={toggleCategoryMenu}
                    className={styles.categoryButton}
                >
                    카테고리 ▼
                </button>
                <button className={styles.applyButton}>적용</button>
            </div>

            {/* 모바일 버전: 필터 설정 버튼만 표시 */}
            <button className={styles.mobileFilterButton} onClick={toggleCategoryMenu}>
                필터 설정하기
            </button>

            {/* 카테고리 메뉴 */}
            {categoryMenuVisible && (
                <CategoryMenu
                    isVisible={categoryMenuVisible}
                    onClose={toggleCategoryMenu}
                    buttonRef={categoryButtonRef}
                />
            )}
        </div>
    );
}
