// pages/Home.js
"use client";
import React, { useState } from 'react';
import Sidebar from '../../components/domains/map/Sidebar';
import PropertyList from '../../components/domains/map/PropertyList';
import MapView from '../../components/domains/map/MapView';
import styles from '../../components/domains/map/map.module.css';
import NavBar from '../../components/domains/map/NavBar';
import CategoryMenu from '../../components/domains/map/CategoryMenu';

export default function Home() {
    const [isCategoryMenuVisible, setCategoryMenuVisible] = useState(false);

    const toggleCategoryMenu = () => {
        setCategoryMenuVisible(!isCategoryMenuVisible);
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.navBarWrapper}>
                    <NavBar onCategoryClick={toggleCategoryMenu} />
                </div>
                <div className={styles.contentArea}>
                    <PropertyList />
                    <MapView />
                </div>
            </div>
            {isCategoryMenuVisible && (
                <CategoryMenu isVisible={isCategoryMenuVisible} onClose={toggleCategoryMenu} />
            )}
        </div>
    );
}
