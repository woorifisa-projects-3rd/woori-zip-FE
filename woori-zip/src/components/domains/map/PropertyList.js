import React, { useState } from "react";
import styles from "../map/PropertyList.module.css";

const PropertyList = ({ data, onPropertyClick }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState(
    data.filter((property) => property.bookmark).map((property) => property.houseId)
  );

  const toggleBookmark = (propertyId) => {
    if (bookmarkedIds.includes(propertyId)) {
      setBookmarkedIds(bookmarkedIds.filter((id) => id !== propertyId));
    } else {
      setBookmarkedIds([...bookmarkedIds, propertyId]);
    }
  };

  return (
    <div className={styles.listContainer}>
      {data.map((property) => (
        <div
          key={property.houseId}
          className={styles.propertyItem}
          onClick={() => onPropertyClick(property.houseId)}
        >
          {/* 북마크 아이콘 */}
          <div
            className={styles.bookmarkWrapper}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(property.houseId);
            }}
          >
            {bookmarkedIds.includes(property.houseId) ? (
              <span style={{ color: "red", fontSize: "20px" }}>❤️</span>
            ) : (
              <span style={{ color: "gray", fontSize: "20px" }}>🤍</span>
            )}
          </div>
          {/* 이미지 */}
          <div className={styles.imageWrapper}>
            <img src={property.representativeImage || "/images/home.jpg"} alt={property.houseType} className={styles.propertyImage} />
          </div>
          {/* 상세 정보 */}
          <div className={styles.propertyDetails}>
            <h2 className={styles.title}>
              {property.housingExpenses}{" "}
              {`${(property.deposit / 10000).toLocaleString()}`}
              {property.housingExpenses === "월세" &&
                `/${(property.monthlyRentFee / 10000).toLocaleString()}`}
            </h2>
            <p className={styles.location}>
              {property.gu} {property.dong}
            </p>
            <p className={styles.maintenance}>관리비: {property.maintenanceFee.toLocaleString()}원</p>
            <p className={styles.description}>
              {property.comment.length > 17
                ? `${property.comment.substring(0, 17)}...`
                : property.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
