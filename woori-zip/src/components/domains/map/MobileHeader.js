import React, { useState } from "react";
import CategoryMenu from "./CategoryMenu";
import styles from "../map/MobileHeader.module.css";

export default function Header({ onToggleSidebar }) {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilterMenu = () => {
    setFilterVisible((prev) => !prev);
  };

  return (
    <div className={styles.mobileHeader}>
      {/* 햄버거 버튼 */}
      <button className={styles.hamburgerButton} onClick={onToggleSidebar}>
        <img src="/images/map/hamburger-icon.png" alt="메뉴" />
      </button>

      {/* 필터 버튼 */}
      <button
        className={styles.filterButton}
        onClick={toggleFilterMenu}
      >
        필터 설정하기
      </button>

      {/* 필터 메뉴 */}
      {isFilterVisible && (
        <CategoryMenu
          isVisible={isFilterVisible}
          onClose={() => setFilterVisible(false)}
          buttonRef={null} // MobileHeader에는 buttonRef 필요 없음
        />
      )}
    </div>
  );
}
