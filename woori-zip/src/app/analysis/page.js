'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';

// Chart.js SSR 이슈를 피하기 위해 dynamic import 사용
const Analysis = dynamic(() => import('@/components/domains/csa/Analysis'), {
  ssr: false, // Chart.js의 SSR 이슈 방지
  loading: () => (
    <div className={styles.loadingContainer}>
      <p>분석 데이터를 불러오는 중입니다...</p>
    </div>
  ),
});

export default function CSAPage() {
  return (
    <div className={styles.pageContainer}>
      <Analysis />
    </div>
  );
}