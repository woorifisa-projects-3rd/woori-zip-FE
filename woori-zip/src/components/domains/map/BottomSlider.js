// components/BottomSlider.js
import React from 'react';
import styles from '../map/BottomSlider.module.css';

export default function BottomSlider({ onToggle }) {
    return (
        <div className={styles.bottomSlider} onClick={onToggle}>
            <div className={styles.handle}>
                <span className={styles.handleText}>집 목록 보기</span>
            </div>
        </div>
    );
}
