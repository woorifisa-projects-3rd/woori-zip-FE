"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/domains/map/Sidebar";
import PropertyList from "../../components/domains/map/PropertyList";
import MapView from "../../components/domains/map/MapView";
import styles from "../../components/domains/map/map.module.css";
import NavBar from "../../components/domains/map/NavBar";
import CategoryMenu from "../../components/domains/map/CategoryMenu";
import MobileHeader from "../../components/domains/map/MobileHeader";

export default function Home() {
  const [isCategoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Sidebar 표시 여부
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // PropertyList 확장 여부
  const [mapState, setMapState] = useState({}); // 지도 상태를 저장하는 state
  const [houseType, setHouseType] = useState("선택하지 않음"); // 선택된 주택 유형 상태

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 393);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const toggleCategoryMenu = () => setCategoryMenuVisible(!isCategoryMenuVisible);

  const togglePropertyList = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCategorySelect = (category) => {
    setHouseType(category); // Sidebar에서 선택한 주택 유형을 저장
  };

  useEffect(() => {
    console.log("Home에서 업데이트된 mapState:", mapState);
  }, [mapState]);

  useEffect(() => {
    console.log("선택된 주택 유형:", houseType);
  }, [houseType]);

  return (
    <div className={styles.container}>
      {/* Sidebar는 항상 유지 */}
      <Sidebar
        houseType={houseType}
        onSelectCategory={handleCategorySelect} // Sidebar에서 선택된 주택 유형을 받음
      />

      <div className={styles.mainContent}>
        {/* NavBar */}
        <div className={styles.navBarWrapper}>
          <NavBar
            houseType={houseType} // NavBar에 선택된 주택 유형 전달
            mapState={mapState} // NavBar에 mapState 전달
          />
        </div>

        {/* Map and PropertyList */}
        <div className={styles.contentArea}>
          {isMobile ? (
            <div
              className={styles.mobilePropertyList}
              style={{ height: isExpanded ? "50vh" : "10vh" }}
            >
              <div className={styles.handle} onClick={togglePropertyList}>
                <div className={styles.handleText}>집 목록 보기</div>
              </div>
              <PropertyList />
            </div>
          ) : (
            <PropertyList className={styles.webPropertyList} />
          )}
          <MapView onMapChange={setMapState} />
        </div>
      </div>

      {/* 필터 메뉴 */}
      {isCategoryMenuVisible && (
        <CategoryMenu isVisible={isCategoryMenuVisible} onClose={toggleCategoryMenu} />
      )}

      {/* MobileHeader는 모바일 환경에서만 렌더링 */}
      {isMobile && (
        <MobileHeader
          onHamburgerClick={toggleSidebar} // 햄버거 버튼 클릭 시 Sidebar 토글
          onFilterClick={toggleCategoryMenu} // 필터 버튼 클릭 시 CategoryMenu 토글
        />
      )}
    </div>
  );
}
