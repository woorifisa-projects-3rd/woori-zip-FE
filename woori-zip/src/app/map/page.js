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
import { fetchHouseList, fetchHouseDetails } from "@/app/api/map/houseApi";

const defaultFilters = {
  level: 7,
  southWestLatitude: 37.5189,
  southWestLongitude: 126.8952,
  northEastLatitude: 37.6157,
  northEastLongitude: 127.0601,
  houseType: "아파트",
  minDeposit: 0,
  maxDeposit: 1000000000,
  minMonthlyRentFee: 0,
  maxMonthlyRentFee: 2000000000,
  minMaintenanceFee: 0,
  maxMaintenanceFee: 5000000,
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapState, setMapState] = useState({ ...defaultFilters });
  const [houseType, setHouseType] = useState("아파트");
  const [houseInfo, setHouseInfo] = useState({ houseContents: [], counts: [] });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [houseData, setHouseData] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 37.5189,
    lng: 126.8952,
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 393);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await fetchHouseList(defaultFilters);
        updateHouseData(data);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };
    loadInitialData();
  }, []);

  const updateHouseData = (data) => {
    if (data?.houseContents) {
      setHouseInfo(data);
      setHouseData(data.houseContents);
      setMapLocations(
        data.houseContents.map((house) => ({
          lat: house.latitude,
          lng: house.longitude,
          houseId: house.houseId,
        }))
      );
    }
  };

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  const toggleCategoryMenu = () => setCategoryMenuVisible(!isCategoryMenuVisible);
  const togglePropertyList = () => setIsExpanded(!isExpanded);

  const handleCategorySelect = (category) => setHouseType(category);
  const handlePropertyClick = async (propertyId) => {
    try {
      const data = await fetchHouseDetails(propertyId);
      setSelectedProperty(data);
    } catch (error) {
      console.error("Failed to load property details:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar houseType={houseType} onSelectCategory={handleCategorySelect} />
      <div className={styles.mainContent}>
        <NavBar
          houseType={houseType}
          mapState={mapState}
          onHouseInfoUpdate={updateHouseData}
        />
        <div className={styles.contentArea}>
          {isMobile ? (
            <MobilePropertyList
              data={houseData}
              isExpanded={isExpanded}
              togglePropertyList={togglePropertyList}
              onPropertyClick={handlePropertyClick}
            />
          ) : (
            <PropertyList
              data={houseData}
              className={styles.webPropertyList}
              onPropertyClick={handlePropertyClick}
            />
          )}
          <MapView
            property={selectedProperty}
            locations={mapLocations}
            selectedLocation={selectedLocation}
            onMapChange={setMapState}
          />
          {selectedProperty && (
            <PropertyDetails
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          )}
        </div>
      </div>
      {isCategoryMenuVisible && (
        <CategoryMenu
          isVisible={isCategoryMenuVisible}
          onClose={toggleCategoryMenu}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory} 
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

function MobilePropertyList({ data, isExpanded, togglePropertyList, onPropertyClick }) {
  return (
    <div
      className={styles.mobilePropertyList}
      style={{ height: isExpanded ? "50vh" : "10vh" }}
    >
      <div className={styles.handle} onClick={togglePropertyList}>
        <div className={styles.handleText}>집 목록 보기</div>
      </div>
      <PropertyList data={data} onPropertyClick={onPropertyClick} />
    </div>
  );
}
