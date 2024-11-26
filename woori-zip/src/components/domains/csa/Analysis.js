// csa/Analysis.js
'use client';

import styles from './Analysis.module.css';
import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analysis() {
  // 차트 데이터 설정
  const chartData = {
    labels: ['방어적', '기계', '문자', '기타'],
    datasets: [{
      data: [58, 22, 10, 10],
      backgroundColor: ['#E8F1FF', '#808080', '#A9A9A9', '#D3D3D3'],
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    },
    responsive: true,
    maintainAspectRatio: true
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>OOO 님의 소비 패턴 분석 결과</h1>
      
      <section className={styles.chartSection}>
        <div className={styles.chartWrapper}>
          <div className={styles.chartContainer}>
            <Pie data={chartData} options={chartOptions} />
          </div>
          <p className={styles.chartTitle}>OOO 님과 비슷한 유형의 카테고리별 별 평균 소비량</p>
        </div>
        <div className={styles.chartWrapper}>
          <div className={styles.chartContainer}>
            <Pie data={chartData} options={chartOptions} />
          </div>
          <p className={styles.chartTitle}>OOO 님의 카테고리별 별 평균 소비량</p>
        </div>
      </section>

      <div className={styles.resultBox}>
        <p>최종 분석 결과, OOO 님과 가장 잘 어울리는 소비 카테고리는 <strong>문화/취미</strong> 입니다.</p>
      </div>

      <section className={styles.infoSection}>
        <div className={styles.infoHeader}>
          <p>원하시는 인프라 카테고리를 선택하세요!</p>
        </div>
        <div className={styles.infoGrid}>
          <div className={styles.infoRow}>
            <div className={styles.infoItem}>의류</div>
            <div className={styles.infoItem}>서적/문구</div>
            <div className={styles.infoItem}>음식모음</div>
            <div className={styles.infoItem}>집에서쉬면서 도전 가치</div>
            <div className={styles.infoValue}>5분</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoItem}>문화/취미</div>
            <div className={styles.infoItem}>식당/카페</div>
            <div className={styles.infoItem}>지출자<br/>정보/유지</div>
            <div className={styles.infoItem}>카테고리 시설 개수</div>
            <div className={styles.infoValue}>2개</div>
          </div>
        </div>
      </section>

      <section className={styles.locationSection}>
        <div className={styles.locationGrid}>
          {Array(12).fill('노량진동').map((text, index) => (
            <div key={index} className={styles.locationItem}>{text}</div>
          ))}
        </div>
      </section>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.primaryButton}>집 검색하기</button>
        <button type="button" className={styles.secondaryButton}>메인으로</button>
      </div>
    </main>
  );
}