'use client';

import { useState, useEffect } from 'react';
import styles from './BookMarks.module.css';

export default function BookMarks() {
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
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
        isBookmarked: true,
        starFilled: true
      }));
      
      setBookmarkedProperties(dummyData);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBookmarkToggle = (id) => {
    setBookmarkedProperties(prev =>
      prev.map(property =>
        property.id === id
          ? { ...property, starFilled: !property.starFilled }
          : property
      )
    );
  };

  if (isLoading) return null;

  if (!bookmarkedProperties || bookmarkedProperties.filter(prop => prop.isBookmarked).length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          북마크한 집이 존재하지 않습니다.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.propertyGrid}>
        {bookmarkedProperties
          .filter(prop => prop.isBookmarked)
          .map((property) => (
            <div key={property.id} className={styles.propertyCard}>
              <div className={styles.imageContainer}>
                <div className={styles.imagePlaceholder}>
                  매물 이미지
                </div>
                <button
                  onClick={() => handleBookmarkToggle(property.id)}
                  className={styles.bookmarkButton}
                  aria-label="북마크 토글"
                >
                  <span className={`${styles.star} ${!property.starFilled ? styles.starEmpty : ''}`}>
                    {property.starFilled ? '★' : '☆'}
                  </span>
                </button>
              </div>
              <div className={styles.propertyInfo}>
                <div className={styles.typeLocation}>
                  <span className={styles.type}>{property.type}</span>
                  <span className={styles.location}>{property.location}</span>
                </div>
                <div className={styles.price}>전세 {property.price} 만원</div>
                <div className={styles.details}>
                  <p>{property.details}</p>
                  <p>{property.distance}</p>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}