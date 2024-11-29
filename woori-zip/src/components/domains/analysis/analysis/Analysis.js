'use client';

import { useState, useEffect } from 'react';
import styles from './Analysis.module.css';
import Chart from '../chat/Chat';
import AnalysisController from './analysis.controller';

export default function Analysis({ similarChartData, memberChartData, bestCategory }) {
    const [userName, setUserName] = useState('회원');
    const [activeCategory, setActiveCategory] = useState('');
    const [walkingDistance, setWalkingDistance] = useState('');
    const [facilitiesCount, setFacilitiesCount] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDong, setSelectedDong] = useState('');
    const bestCategoryKorean = AnalysisController.getBestCategoryName(bestCategory);

    useEffect(() => {
        const storedUserName = window.localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const generateDummyDongs = () => {
        return Array.from({ length: 12 }, (_, i) => `노량진${i + 1}동`);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category); // 선택된 카테고리 업데이트
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{userName}님의 소비 패턴 분석 결과</h1>

            <div className={styles.chartSection}>
                <div className={styles.chartBox}>
                    <Chart
                        data={similarChartData}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                    <h2 className={styles.chartTitle}>
                        {userName}님과 비슷한 유형의 카테고리 별 평균 소비량
                    </h2>
                </div>

                <div className={styles.chartBox}>
                    <Chart
                        data={memberChartData}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                    <h2 className={styles.chartTitle}>
                        {userName}님의 카테고리 별 평균 소비량
                    </h2>
                </div>

                <div className={styles.analysisResult}>
                    <h2 className={styles.resultTitle}>
                        최종 분석 결과, {userName}님과 가장 잘 어울리는 소비 카테고리는{' '}
                        <span className={styles.highlightCategory}>{bestCategoryKorean}</span> 입니다.
                    </h2>
                </div>
            </div>

            <div className={styles.categorySection}>
                <h3 className={styles.categoryTitle}>원하시는 인프라 카테고리를 선택하세요!</h3>
                <div className={styles.categoryGrid}>
                    {[
                        { id: 'CLOTH', label: '의류' },
                        { id: 'BOOK', label: '서적/문구' },
                        { id: 'GROCERY', label: '음식료품' },
                        { id: 'CULTURE', label: '문화/취미' },
                        { id: 'FOOD', label: '식당/카페' },
                        { id: 'CAR', label: '자동차정비/유지' },
                    ].map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${
                                activeCategory === category.id ? styles.selected : ''
                            }`}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.locationSection}>
                <div className={styles.locationHeader}>
                    <h4 className={styles.locationTitle}>지역 선택</h4>
                    <div className={styles.districtWrapper}>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className={styles.districtSelect}
                        >
                            <option value="">구 선택</option>
                            <option value="강남구">강남구</option>
                            <option value="강동구">강동구</option>
                            <option value="강서구">강서구</option>
                            <option value="마포구">마포구</option>
                        </select>
                    </div>
                </div>

                {selectedDistrict && (
                    <div className={styles.dongGrid}>
                        {generateDummyDongs().map((dong, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedDong(dong)}
                                className={`${styles.dongButton} ${
                                    selectedDong === dong ? styles.selected : ''
                                }`}
                            >
                                {dong}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.buttonGroup}>
                <button className={styles.primaryButton} onClick={() => console.log('집 검색하기')}>
                    집 검색하기
                </button>
                <button className={styles.secondaryButton} onClick={() => console.log('메인으로')}>
                    메인으로
                </button>
            </div>
        </div>
    );
}