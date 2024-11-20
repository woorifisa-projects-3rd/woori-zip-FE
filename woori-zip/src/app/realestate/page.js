'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import Tabs from './components/Tabs/Tabs';
import AgentInfo from './components/AgentInfo/AgentInfo';
import UploadedProperties from './components/UploadedProperties/UploadedProperties';

const RealEstate = () => {
  const [activeTab, setActiveTab] = useState('중개사 정보 확인');

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.container}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.content}>
          {activeTab === '중개사 정보 확인' && <AgentInfo />}
          {activeTab === '올린 방 조회' && <UploadedProperties />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RealEstate;