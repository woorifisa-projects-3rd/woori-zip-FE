"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/domains/map/Sidebar';
import PropertyList from '../../components/domains/map/PropertyList';
import MapView from '../../components/domains/map/MapView';
import styles from '../../components/domains/map/map.module.css';
import NavBar from '../../components/domains/map/NavBar';
import CategoryMenu from '../../components/domains/map/CategoryMenu';

export default function Home() {
    const [isCategoryMenuVisible, setCategoryMenuVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isPropertyListVisible, setPropertyListVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 393);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleCategoryMenu = () => setCategoryMenuVisible(!isCategoryMenuVisible);
    const togglePropertyList = () => setPropertyListVisible(!isPropertyListVisible);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.navBarWrapper}>
                    <NavBar onCategoryClick={toggleCategoryMenu} />
                </div>
                <div className={styles.contentArea}>
                    {isMobile ? (
                        <>
                            {isPropertyListVisible && (
                                <div className={`${styles.mobilePropertyList} ${isPropertyListVisible ? styles.visible : ''}`}>
                                    <PropertyList />
                                </div>
                            )}
                            <div className={styles.bottomSlider} onClick={togglePropertyList}>
                                <span>리스트 보기</span>
                            </div>
                        </>
                    ) : (
                        <PropertyList className={styles.webPropertyList} />
                    )}
                    <MapView />
                </div>
            </div>
            {isCategoryMenuVisible && (
                <CategoryMenu isVisible={isCategoryMenuVisible} onClose={toggleCategoryMenu} />
            )}
        </div>
    );
}
