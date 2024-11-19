// components/bookmarks/BookmarkTabs/index.js
import { useState } from 'react';
import styles from './BookmarkTabs.module.css';

export default function BookmarkTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('회원 정보 확인');
  
  const tabs = ['회원 정보 확인', '북마크 조회', '최근 본 대출 상품'];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}