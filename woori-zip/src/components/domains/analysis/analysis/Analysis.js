'use client';

import { useState, useEffect } from 'react';
import styles from './Analysis.module.css';
import Chart from '../chat/Chat';
import AnalysisController from './analysis.controller';

export default function Analysis({ similarChartData, memberChartData, bestCategory }) {
    const [userName, setUserName] = useState('회원');
    const [activeCategory, setActiveCategory] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDong, setSelectedDong] = useState('');
    const [selectedData, setSelectedData] = useState({
        district: '',
        dong: '',
        category: ''
    });

    const categories = [
        { id: 'CLOTH', label: '의류' },
        { id: 'BOOK', label: '서적/문구' },
        { id: 'GROCERY', label: '음식료품' },
        { id: 'CULTURE', label: '문화/취미' },
        { id: 'FOOD', label: '식당/카페' },
        { id: 'CAR', label: '자동차정비/유지' },
    ];

    const bestCategoryKorean = bestCategory ? 
        AnalysisController.getBestCategoryName(bestCategory) : 
        '서적/문구';

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
        if (!category) return;
        
        setActiveCategory(category);
        setSelectedData(prev => ({
            ...prev,
            category: category
        }));
    };

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        setSelectedDong('');
        setSelectedData(prev => ({
            ...prev,
            district,
            dong: ''
        }));
    };

    const handleDongSelect = (dong) => {
        setSelectedDong(dong);
        setSelectedData(prev => ({
            ...prev,
            dong
        }));
    };

    const handleSearch = () => {
        const searchData = {
            selectedCategory: {
                id: activeCategory,
                name: categories.find(cat => cat.id === activeCategory)?.label || ''
            },
            location: {
                district: selectedDistrict,
                dong: selectedDong
            },
            analysisResults: {
                bestCategory: {
                    id: bestCategory,
                    name: bestCategoryKorean
                },
                similarChartData: similarChartData,
                memberChartData: memberChartData
            },
            userInfo: {
                name: userName
            },
            timestamp: new Date().toISOString()
        };

        console.group('🏠 집 검색 데이터');
        console.log('📊 선택된 카테고리:', searchData.selectedCategory);
        console.log('📍 선택된 지역:', searchData.location);
        console.log('📈 분석 결과:', searchData.analysisResults);
        console.log('👤 사용자 정보:', searchData.userInfo);
        console.log('⏰ 검색 시간:', searchData.timestamp);
        console.groupEnd();

        localStorage.setItem('searchData', JSON.stringify(searchData));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{userName}님의 소비 패턴 분석 결과</h1>

            <div className={styles.chartSection}>
                <div className={styles.chartBox}>
                    <Chart
                        data={similarChartData || { items: [] }}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                    <h2 className={styles.chartTitle}>
                        {userName}님과 비슷한 유형의 카테고리 별 평균 소비량
                    </h2>
                </div>

                <div className={styles.chartBox}>
                    <Chart
                        data={memberChartData || { items: [] }}
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
                    {categories.map((category) => (
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
                            onChange={handleDistrictChange}
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
                                onClick={() => handleDongSelect(dong)}
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
                <button 
                    className={styles.primaryButton} 
                    onClick={handleSearch}
                    disabled={!selectedDistrict || !selectedDong || !activeCategory}
                >
                    집 검색하기
                </button>
                <button 
                    className={styles.secondaryButton} 
                    onClick={() => window.location.href = '/'}
                >
                    메인으로
                </button>
            </div>
        </div>
    );
}