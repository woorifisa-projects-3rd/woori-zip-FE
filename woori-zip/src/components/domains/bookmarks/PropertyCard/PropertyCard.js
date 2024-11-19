// components/bookmarks/PropertyCard/index.js
import styles from './PropertyCard.module.css';
import Image from 'next/image';

export default function PropertyCard({ property }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image 
          src={property.image} 
          alt={property.type}
          layout="fill"
          objectFit="cover"
        />
        <span className={styles.bookmark}>★</span>
      </div>
      <div className={styles.content}>
        <div className={styles.type}>{property.type}</div>
        <div className={styles.location}>{property.location}</div>
        <div className={styles.price}>전세 {property.price}만원</div>
        <div className={styles.info}>
          {property.size} | {property.distance}
        </div>
      </div>
    </div>
  );
}