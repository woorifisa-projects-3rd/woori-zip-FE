'use client';

import { useState } from 'react';
import styles from './UploadedProperties.module.css';

const PropertyCard = ({ property }) => {
  const [isStarred, setIsStarred] = useState(true);

  const handleStarClick = (e) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  return (
    <div className={styles.propertyCard}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>매물 이미지</div>
        <button
          onClick={handleStarClick}
          className={styles.bookmarkButton}
          aria-label="북마크 토글"
        >
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
  );
};

export default PropertyCard;
