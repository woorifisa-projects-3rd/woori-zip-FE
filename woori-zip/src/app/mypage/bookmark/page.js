"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Header from '../layout/Header/Header';
import Footer from '../layout/Footer/Footer';
import Image from 'next/image';

export default function BookmarkPage() {
    const [activeTab, setActiveTab] = useState('북마크 조회');
    const [bookmarks, setBookmarks] = useState([]);
    
    // 초기 데이터 로드
    useEffect(() => {
      const initialBookmarks = Array(8).fill({
        type: '아파트',
        location: '강동구 성내동',
        price: '7000',
        size: '풀옵션 O, 1.5인룸',
        distance: '잠실역 도보 20분 거리',
        image: '/images/property1.jpg',
        isBookmarked: true
      }).map((item, index) => ({ 
        ...item, 
        id: index + 1
      }));
  
      // 로컬 스토리지에서 북마크 상태 확인
      const savedBookmarks = localStorage.getItem('bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      } else {
        setBookmarks(initialBookmarks);
      }
    }, []);
  
    // 북마크 상태가 변경될 때마다 로컬 스토리지 업데이트
    useEffect(() => {
      if (bookmarks.length > 0) {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
    }, [bookmarks]);
  
    // 북마크 토글 핸들러
    const handleBookmarkToggle = (id) => {
      setBookmarks(prevBookmarks => 
        prevBookmarks.map(bookmark => 
          bookmark.id === id 
            ? { ...bookmark, isBookmarked: !bookmark.isBookmarked }
            : bookmark
        )
      );
    };
  
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.tabButtons}>
              {['회원 정보 확인', '북마크 조회', '최근 본 대출 상품'].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
  
            {activeTab === '북마크 조회' && (
              <div className={styles.bookmarkContainer}>
                <div className={styles.propertyGrid}>
                  {bookmarks
                    .filter(property => property.isBookmarked)
                    .map((property) => (
                    <div key={property.id} className={styles.propertyCard}>
                      <div className={styles.imageContainer}>
                        <Image
                          src={property.image}
                          alt={`${property.type} 이미지`}
                          width={280}
                          height={210}
                          className={styles.propertyImage}
                        />
                        <button 
                          className={styles.bookmarkButton}
                          onClick={() => handleBookmarkToggle(property.id)}
                          aria-label={property.isBookmarked ? "북마크 해제" : "북마크 설정"}
                        >
                          <span className={`${styles.star} ${!property.isBookmarked ? styles.starEmpty : ''}`}>
                            {property.isBookmarked ? '★' : '☆'}
                          </span>
                        </button>
                      </div>
                      <div className={styles.propertyInfo}>
                        <div className={styles.typeLocation}>
                          <span className={styles.type}>{property.type}</span>
                          <span className={styles.location}>{property.location}</span>
                        </div>
                        <div className={styles.price}>전세 {property.price} 만원</div>
                        <div className={styles.details}>
                          <p>{property.size}</p>
                          <p>{property.distance}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }