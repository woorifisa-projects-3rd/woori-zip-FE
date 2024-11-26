import React, { useState, useEffect } from "react";
import styles from "../map/PropertyList.module.css";
import { addBookmark, deleteBookmark } from "@/app/api/map/houseApi";

const PropertyList = ({ data, onPropertyClick }) => {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // data가 변경될 때 bookmarkedIds를 초기화
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setBookmarkedIds(data.filter((property) => property.bookmark).map((property) => property.houseId));
    }
  }, [data]);

  const toggleBookmark = async (propertyId) => {
    console.log(`북마크 토글 시도: ${propertyId}`);
    if (bookmarkedIds.includes(propertyId)) {
      // 북마크 삭제 요청
      try {
        console.log(`북마크 삭제 요청: ${propertyId}`);
        await deleteBookmark(propertyId);
        setBookmarkedIds(bookmarkedIds.filter((id) => id !== propertyId));
      } catch (error) {
        console.error("북마크 삭제 실패:", error);
      }
    } else {
      // 북마크 추가 요청
      try {
        console.log(`북마크 추가 요청: ${propertyId}`);
        await addBookmark(propertyId);
        setBookmarkedIds([...bookmarkedIds, propertyId]);
      } catch (error) {
        console.error("북마크 추가 실패:", error);
      }
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
            <img
              src={property.representativeImage || "/images/home.jpg"}
              alt={property.houseType}
              className={styles.propertyImage}
            />
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
            <p className={styles.maintenance}>
              관리비: {property.maintenanceFee.toLocaleString()}원
            </p>
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
