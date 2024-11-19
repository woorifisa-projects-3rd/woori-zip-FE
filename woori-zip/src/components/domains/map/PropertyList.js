import React from 'react';
import styles from '../map/PropertyList.module.css';

const PropertyList = ({ filterData }) => {
  console.log("PropertyList에 전달된 filterData:", filterData); // 전달된 데이터 확인

  if (!filterData || filterData.length === 0) {
    return <p className={styles.noData}>데이터가 없습니다. 필터를 적용해주세요.</p>;
  }

  return (
    <div className={styles.propertyList}>
      {filterData.map((property) => (
        <div key={property.houseId} className={styles.propertyItem}>
          <div className={styles.propertyHeader}>
            <span className={styles.houseType}>{property.houseType}</span>
            <span className={styles.housingExpenses}>{property.housingExpenses}</span>
          </div>
          <p className={styles.comment}>{property.comment}</p>
          <div className={styles.propertyDetails}>
            <p>
              <strong>보증금:</strong> {property.deposit.toLocaleString()}원
            </p>
            <p>
              <strong>월세:</strong> {property.monthlyRentFee > 0 ? property.monthlyRentFee.toLocaleString() + '원' : '없음'}
            </p>
            <p>
              <strong>관리비:</strong> {property.maintenanceFee.toLocaleString()}원
            </p>
            <p>
              <strong>주소:</strong> {`${property.gu} ${property.dong}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
