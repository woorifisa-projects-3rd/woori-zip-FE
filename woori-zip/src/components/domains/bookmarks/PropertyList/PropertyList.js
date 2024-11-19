// components/bookmarks/PropertyList/index.js
import PropertyCard from '../PropertyCard';
import styles from './PropertyList.module.css';

export default function PropertyList({ properties }) {
  return (
    <div className={styles.grid}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}