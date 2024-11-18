'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import Tabs from './components/Tabs/Tabs';
import Member from './components/MemberInfo/Member';
import BookMarks from './components/Bookmarks/BookMarks';
import Loan from './components/loan/loan';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('회원 정보 확인');

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.container}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.content}>
          {activeTab === '회원 정보 확인' && <Member />}
          {activeTab === '북마크 조회' && <BookMarks />}
          {activeTab === '최근 본 대출 상품' && <Loan />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;