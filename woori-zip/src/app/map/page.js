"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/domains/map/Sidebar";
import PropertyList from "../../components/domains/map/PropertyList";
import MapView from "../../components/domains/map/MapView";
import PropertyDetails from "../../components/domains/map/PropertyDetails";
import styles from "../../components/domains/map/map.module.css";
import NavBar from "../../components/domains/map/NavBar";
import CategoryMenu from "../../components/domains/map/CategoryMenu";
import MobileHeader from "../../components/domains/map/MobileHeader";

const defaultFilters = {
  level: 7,
  southWestLatitude: 37.51892755821759,
  southWestLongitude: 126.89520733306287,
  northEastLatitude: 37.61568961981099,
  northEastLongitude: 127.0601661522748,
  houseType: "아파트",
  minDeposit: 0,
  maxDeposit: 1000000000,
  minMonthlyRentFee: 0,
  maxMonthlyRentFee: 2000000000,
  minMaintenanceFee: 0,
  maxMaintenanceFee: 5000000,
};


export default function Home() {
  const [isCategoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 지도 상태 초기값 세팅
  const [mapState, setMapState] = useState({
    level: 7,
    southWestLatitude: 37.51892755821759,
    southWestLongitude: 126.89520733306287,
    northEastLatitude: 37.61568961981099,
    northEastLongitude: 127.0601661522748,
  });

  // 주택 유형 초기값 세팅
  const [houseType, setHouseType] = useState("아파트");

  // 초기 주택 정보와 선택된 속성
  const [houseInfo, setHouseInfo] = useState({
    houseContents: [],
    counts: [],
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

  // 리스트와 지도에 표시될 데이터
  const [houseData, setHouseData] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: (37.4265751336532 + 37.62007751919223) / 2, // 초기 중심 좌표
    lng: (126.82104120205805 + 127.15078665069038) / 2,
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 393);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      const params = new URLSearchParams(defaultFilters).toString();
      const url = `http://localhost:8080/api/v1/houses?${params}`;
      console.log("초기 요청 URL:", url);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("초기 데이터 로드 실패");
        const data = await response.json();
        console.log("초기 데이터 로드 성공:", data);

        setHouseInfo(data);
        setHouseData(data.houseContents || []);
        setMapLocations(
          (data.houseContents || []).map((house) => ({
            lat: house.latitude,
            lng: house.longitude,
            houseId: house.houseId,
          }))
        );
      } catch (error) {
        console.error("초기 데이터 로드 오류:", error);
      }
    };

    loadInitialData();
  }, []);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  const toggleCategoryMenu = () => setCategoryMenuVisible(!isCategoryMenuVisible);
  const togglePropertyList = () => setIsExpanded(!isExpanded);

  const handleCategorySelect = (category) => setHouseType(category);

  const handleHouseInfoUpdate = (data) => {
    setHouseInfo(data);
    setHouseData(data.houseContents || []);
    setMapLocations(
      (data.houseContents || []).map((house) => ({
        lat: house.latitude,
        lng: house.longitude,
        houseId: house.houseId,
      }))
    );
  };

  const handlePropertyClick = async (propertyId) => {
    console.log("Clicked Property ID:", propertyId);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/houses/${propertyId}`);
      if (!response.ok) throw new Error("Failed to fetch property details");
      const data = await response.json();
      setSelectedProperty(data);
      setSelectedLocation({ lat: data.latitude, lng: data.longitude });
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  const handleClosePropertyDetails = () => setSelectedProperty(null);

  return (
    <div className={styles.container}>
      <Sidebar houseType={houseType} onSelectCategory={handleCategorySelect} />
      <div className={styles.mainContent}>
        <div className={styles.navBarWrapper}>
          <NavBar
            houseType={houseType}
            mapState={mapState}
            onHouseInfoUpdate={handleHouseInfoUpdate}
          />
        </div>
        <div className={styles.contentArea}>
          {isMobile ? (
            <div
              className={styles.mobilePropertyList}
              style={{ height: isExpanded ? "50vh" : "10vh" }}
            >
              <div className={styles.handle} onClick={togglePropertyList}>
                <div className={styles.handleText}>집 목록 보기</div>
              </div>
              <PropertyList data={houseData} onPropertyClick={handlePropertyClick} />
            </div>
          ) : (
            <PropertyList
              data={houseData}
              className={styles.webPropertyList}
              onPropertyClick={handlePropertyClick}
            />
          )}
          <MapView
            locations={mapLocations}
            selectedLocation={selectedLocation}
            onMapChange={setMapState}
          />
          {selectedProperty && (
            <PropertyDetails
              property={selectedProperty}
              onClose={handleClosePropertyDetails}
            />
          )}
        </div>
      </div>
      {isCategoryMenuVisible && (
        <CategoryMenu
          isVisible={isCategoryMenuVisible}
          onClose={toggleCategoryMenu}
          houseType={houseType}
          mapState={mapState}
          onApply={(filterData) => {
            console.log("Applied Filter Data:", filterData);
          }}
        />
      )}
      {isMobile && (
        <MobileHeader
          onHamburgerClick={toggleSidebar}
          onFilterClick={toggleCategoryMenu}
        />
      )}
    </div>
  );
}
