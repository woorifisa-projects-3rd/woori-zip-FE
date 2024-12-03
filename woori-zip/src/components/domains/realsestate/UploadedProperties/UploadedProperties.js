'use client';

import { useState, useEffect } from 'react';
import styles from './UploadedProperties.module.css';
import PropertyCard from './PropertyCard';

export default function UploadedProperties() {
  const [uploadedProperties, setUploadedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const dummyData = Array(8).fill().map((_, index) => ({
        id: index + 1,
        type: '아파트',
        location: '강동구 성내동',
        price: '7000',
        details: '풀옵션 O, 1.5인룸',
        distance: '잠실역 도보 20분 거리',
      }));

      setUploadedProperties(dummyData);
    } catch (error) {
      console.error('Error loading uploaded properties:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null;

  if (!uploadedProperties || uploadedProperties.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          등록한 매물이 존재하지 않습니다.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.propertyGrid}>
        {uploadedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}
