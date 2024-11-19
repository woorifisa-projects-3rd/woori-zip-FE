'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import MembersList from './components/userManagement/MembersList/MembersList';
import AgentList from './components/userManagement/AgentList/AgentList';
import ManagerList from './components/userManagement/ManagerList/ManagerList';
import LogSearch from './components/LogManagement/LogSearch';
import LoanView from './components/LoanManagement/LoanView';


const Manager = () => {
  const [mainTab, setMainTab] = useState('사용자 관리');
  const [subTab, setSubTab] = useState('회원 조회');
  const [showSubTabs, setShowSubTabs] = useState(true);

  const handleMainTabChange = (tab) => {
    setMainTab(tab);  
    if (tab === '사용자 관리') {
      setShowSubTabs(true);
      setSubTab('회원 조회');
    } else {
      setShowSubTabs(false);
    }
  };

  const handleSubTabChange = (tab) => {
    setSubTab(tab);
  };

  const renderContent = () => {
    switch(mainTab) {
      case '사용자 관리':
        if (subTab === '회원 조회') {
          return <MembersList />;
        } else if (subTab === '중개사 조회') {
          return <AgentList />;
        } else if (subTab === '관리자 조회') {
          return <ManagerList />;
        }
        break;
      case '로그 조회':
        return <LogSearch />; // 로그 관리 컴포넌트 연결
      case '대출 상품 관리':
        return <LoanView />; // 대출 상품 관리 컴포넌트 연결
      default:
        return null;
    }
    return null;
  };

  return (
    <div className={styles.pageWrapper}>
      <Header 
        mainTab={mainTab}
        subTab={subTab}
        onMainTabChange={handleMainTabChange}
        onSubTabChange={handleSubTabChange}
        showSubTabs={showSubTabs}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Manager;