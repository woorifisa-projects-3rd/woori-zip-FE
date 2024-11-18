import React, { useRef, useState, useEffect } from 'react';
import CategoryMenu from './CategoryMenu';
import styles from '../map/NavBar.module.css';

export default function NavBar({ onCategoryClick, selectedCategory, mapState }) {
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

    // 카테고리 메뉴 토글
    const toggleCategoryVisibility = () => {
        setCategoryVisible((prev) => !prev);
    };

    // 카테고리 적용
    const handleCategoryApply = (updatedState) => {
        setCategoryState(updatedState);
        setCategoryVisible(false);
    };

    // 최종 적용 버튼 클릭 시 동작
    const handleFinalApply = () => {
        console.log("사용자 선택 상태:");
        console.log(`거래 유형: ${rentType}`);
        console.log(`거래 금액: 0만 - ${(priceValue / 10000).toFixed(0)}만`);
        console.log(`관리비: 0만 - ${(maintenanceValue / 10000).toFixed(0)}만`);
        console.log("사용자 선택 상태:", categoryState);
        console.log("현재 지도 상태:", mapState); // 부모에서 전달된 최신 지도 상태 출력
        console.log("사용자 선택 상태:", { category: selectedCategory });
    };

    // mapState 변경 시 로그 출력
    useEffect(() => {
        console.log("NavBar에서 받은 mapState:", mapState);
    }, [mapState]);

    return (
        <div className={styles.navBar}>
            <div className={styles.webNav}>
                {/* 월세/전세 버튼 */}
                <button
                    ref={rentTypeButtonRef}
                    onClick={() => setRentTypeVisible((prev) => !prev)}
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
                            {["전체", "월세", "전세"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setRentType(type)}
                                    className={`${styles.toggleButton} ${rentType === type ? styles.selected : ""}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setRentTypeVisible(false)} className={styles.applyButton}>
                            적용
                        </button>
                    </div>
                )}

                {/* 거래 금액 버튼 */}
                <button
                    ref={priceButtonRef}
                    onClick={() => setPriceVisible((prev) => !prev)}
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
                    onClick={() => setMaintenanceVisible((prev) => !prev)}
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
                {isCategoryVisible && (
                    <CategoryMenu
                        isVisible={isCategoryVisible}
                        onClose={toggleCategoryVisibility}
                        buttonRef={categoryButtonRef}
                        categoryState={categoryState}
                        onApply={handleCategoryApply}
                    />
                )}
            </div>

            {/* 최종 적용 버튼 */}
            <button onClick={handleFinalApply} className={styles.applyButton}>
                적용 최종
            </button>
        </div>
    );
}
