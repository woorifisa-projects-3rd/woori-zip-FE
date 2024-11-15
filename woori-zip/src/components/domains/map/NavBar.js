import React, { useRef, useState } from 'react';
import CategoryMenu from './CategoryMenu';
import styles from '../map/NavBar.module.css';

export default function NavBar() {
    const [isCategoryVisible, setCategoryVisible] = useState(false);
    const [isMaintenanceVisible, setMaintenanceVisible] = useState(false);
    const [isRentTypeVisible, setRentTypeVisible] = useState(false);
    const [isPriceVisible, setPriceVisible] = useState(false);

    const [maintenanceValue, setMaintenanceValue] = useState(0);
    const [priceValue, setPriceValue] = useState(0);
    const [rentType, setRentType] = useState("전체");
    const [categoryState, setCategoryState] = useState({
        category: '선택하지 않음',
        walkingDistance: 10,
        facilityCount: 3,
      });

    const categoryButtonRef = useRef(null);
    const maintenanceButtonRef = useRef(null);
    const rentTypeButtonRef = useRef(null);
    const priceButtonRef = useRef(null);

    const toggleCategoryVisibility = () => {
        setCategoryVisible((prev) => !prev);
    };

    const toggleMaintenanceVisibility = () => {
        setMaintenanceVisible((prev) => !prev);
    };

    const toggleRentTypeVisibility = () => {
        setRentTypeVisible((prev) => !prev);
    };

    const togglePriceVisibility = () => {
        setPriceVisible((prev) => !prev);
    };

    const handleCategoryApply = (updatedState) => {
        setCategoryState(updatedState);
        setCategoryVisible(false);
      };
      
    const handleFinalApply = () => {
        console.log("사용자 선택 상태:");
        console.log(`거래 유형: ${rentType}`);
        console.log(`거래 금액: 0만 - ${(priceValue / 10000).toFixed(0)}만`);
        console.log(`관리비: 0만 - ${(maintenanceValue / 10000).toFixed(0)}만`);
        console.log('사용자 선택 상태:', categoryState);
    };

    return (
        <div className={styles.navBar}>
            <div className={styles.webNav}>
                {/* 월세/전세 버튼 */}
                <button
                    ref={rentTypeButtonRef}
                    onClick={toggleRentTypeVisibility}
                    className={styles.filterButton}
                >
                    월세, 전세 ▼
                </button>
                {isRentTypeVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: rentTypeButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: rentTypeButtonRef.current.getBoundingClientRect().left - 150,
                        }}
                    >
                        <h4 className={styles.menuTitle}>거래 유형</h4>
                        <div className={styles.toggleButtons}>
                            <button
                                onClick={() => setRentType("전체")}
                                className={`${styles.toggleButton} ${rentType === "전체" ? styles.selected : ""}`}
                            >
                                전체
                            </button>
                            <button
                                onClick={() => setRentType("월세")}
                                className={`${styles.toggleButton} ${rentType === "월세" ? styles.selected : ""}`}
                            >
                                월세
                            </button>
                            <button
                                onClick={() => setRentType("전세")}
                                className={`${styles.toggleButton} ${rentType === "전세" ? styles.selected : ""}`}
                            >
                                전세
                            </button>
                        </div>
                        <button onClick={() => setRentTypeVisible(false)} className={styles.applyButton}>
                            적용
                        </button>
                    </div>
                )}

                {/* 거래 금액 버튼 */}
                <button
                    ref={priceButtonRef}
                    onClick={togglePriceVisibility}
                    className={styles.filterButton}
                >
                    거래 금액 ▼
                </button>
                {isPriceVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: priceButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: priceButtonRef.current.getBoundingClientRect().left - 150,
                        }}
                    >
                        <label className={styles.rangeLabel}>거래 금액 범위</label>
                        <input
                            type="range"
                            min="0"
                            max="1000000"
                            step="100000"
                            value={priceValue}
                            onChange={(e) => setPriceValue(e.target.value)}
                            className={styles.rangeSlider}
                        />
                        <div className={styles.rangeValues}>0만 - {(priceValue / 10000).toFixed(0)}만</div>
                        <button onClick={() => setPriceVisible(false)} className={styles.applyButton}>
                            적용
                        </button>
                    </div>
                )}

                {/* 관리비 버튼 */}
                <button
                    ref={maintenanceButtonRef}
                    onClick={toggleMaintenanceVisibility}
                    className={styles.filterButton}
                >
                    관리비 ▼
                </button>
                {isMaintenanceVisible && (
                    <div
                        className={styles.popupMenu}
                        style={{
                            top: maintenanceButtonRef.current.getBoundingClientRect().bottom + window.scrollY + 5,
                            left: maintenanceButtonRef.current.getBoundingClientRect().left - 150,
                        }}
                    >
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
                        <div className={styles.rangeValues}>0만 - {(maintenanceValue / 10000).toFixed(0)}만</div>
                        <button onClick={() => setMaintenanceVisible(false)} className={styles.applyButton}>
                            적용
                        </button>
                    </div>
                )}

                {/* 카테고리 버튼 */}
                <button
                    ref={categoryButtonRef}
                    onClick={toggleCategoryVisibility}
                    className={styles.categoryButton}
                >
                    카테고리 ▼
                </button>
            </div>

            {isCategoryVisible && (
                <CategoryMenu
                    isVisible={isCategoryVisible}
                    onClose={toggleCategoryVisibility}
                    buttonRef={categoryButtonRef}
                    categoryState={categoryState}
                    onApply={handleCategoryApply}
                />
        )}

            <button onClick={handleFinalApply} className={styles.applyButton}>적용 최종</button>
        </div>
    );
}
