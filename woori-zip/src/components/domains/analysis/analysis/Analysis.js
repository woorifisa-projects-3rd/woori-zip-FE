// components/domains/analysis/analysis/Analysis.js
'use client';

import { useState } from 'react';
import styles from './Analysis.module.css';
import Chart from '../chat/Chat';
import AnalysisController from './analysis.controller';

export default function Analysis({ similarChartData, memberChartData, bestCategory }) {
    const userName = localStorage.getItem('userName') || '회원';
    const bestCategoryKorean = AnalysisController.getBestCategoryName(bestCategory);
    const [activeCategory, setActiveCategory] = useState('');
    const [walkingDistance, setWalkingDistance] = useState('');
    const [facilitiesCount, setFacilitiesCount] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDong, setSelectedDong] = useState('');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{userName}님의 소비 패턴 분석 결과</h1>

            <div className={styles.chartSection}>
                <div className={styles.chartBox}>
                    <Chart 
                        type="similar" 
                        data={similarChartData}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                    <h2 className={styles.chartTitle}>
                        {userName}님과 비슷한 유형의 카테고리 별 평균 소비량
                    </h2>
                </div>

                <div className={styles.chartBox}>
                    <Chart 
                        type="member" 
                        data={memberChartData}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
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
                        { id: 'CAR', label: '자동차정비/유지' }
                    ].map((category) => (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${
                                activeCategory === category.id ? styles.selected : ''
                            }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.infoSection}>
                <div className={styles.infoRow}>
                    <div className={styles.infoItem}>
                        <div className={styles.distanceInput}>
                            <label>집에서부터 도보 거리</label>
                            <input 
                                type="number"
                                value={walkingDistance}
                                onChange={(e) => setWalkingDistance(e.target.value)}
                                className={styles.numberInput}
                            />
                            <span className={styles.unit}>분</span>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.distanceInput}>
                            <label>카테고리 시설 개수</label>
                            <input 
                                type="number"
                                value={facilitiesCount}
                                onChange={(e) => setFacilitiesCount(e.target.value)}
                                className={styles.numberInput}
                            />
                            <span className={styles.unit}>개</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.locationSection}>
                <h4 className={styles.locationTitle}>지역 선택</h4>
                <div className={styles.locationGrid}>
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className={styles.districtSelect}
                    >
                        <option value="">구 선택</option>
                        <option value="강서구">강서구</option>
                        <option value="강동구">강동구</option>
                        <option value="강남구">강남구</option>
                        <option value="마포구">마포구</option>
                    </select>

                    {selectedDistrict && (
                        <div className={styles.dongButtons}>
                            {selectedDistrict === "강서구" && (
                                <>
                                    <button 
                                        onClick={() => setSelectedDong('화곡동')}
                                        className={`${styles.dongButton} ${selectedDong === '화곡동' ? styles.selected : ''}`}
                                    >
                                        화곡동
                                    </button>
                                    <button 
                                        onClick={() => setSelectedDong('발산동')}
                                        className={`${styles.dongButton} ${selectedDong === '발산동' ? styles.selected : ''}`}
                                    >
                                        발산동
                                    </button>
                                    <button 
                                        onClick={() => setSelectedDong('우장산동')}
                                        className={`${styles.dongButton} ${selectedDong === '우장산동' ? styles.selected : ''}`}
                                    >
                                        우장산동
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
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