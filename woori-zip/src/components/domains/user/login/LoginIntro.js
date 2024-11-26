"use client";

import React, { useState } from "react";
import Tab from "./Tab";
import styles from "./LoginIntro.module.css";
import LoginPage from "./LoginPage.js";

export default function LoginIntro() {
  const [activeTab, setActiveTab] = useState(0); // 활성 탭 상태 관리

  // 탭 데이터
  const tabs = [
    { label: "회원", id: 0 },
    { label: "중개자", id: 1 },
    { label: "관리자", id: 2 },
  ];

  // 탭 클릭에 따라 렌더링할 UI
  const renderContent = () => {
    switch (activeTab) {
      case 0: // 회원
        return (
          <div className={styles.loginContent}>
            <img
              className={styles.image}
              src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/user/bankLogo.png"
              alt="Logo"
              width={110}
              height={30}
            />
            <p className={styles.text}>
              금융 데이터 분석을 위해
              <br />
              우리은행 데이터와 간편 연결하기
            </p>
            <button className={styles.loginButton}>우리은행으로 로그인</button>
          </div>
        );
      case 1: // 중개자
        return (
          <div className={styles.loginContent}>
            <LoginPage />
          </div>
        );
      case 2: // 관리자
        return (
          <div className={styles.loginContent}>
            <LoginPage />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabBox}>
        {/* 탭 컴포넌트 */}
        <Tab
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={(id) => setActiveTab(id)} // 클릭한 탭 ID로 상태 변경
        />
      </div>
      <div className={styles.componentBox}>
        {/* 선택된 탭에 따른 콘텐츠 */}
        <div className={styles.disignSpace}></div>
        {renderContent()}
      </div>
    </div>
  );
}