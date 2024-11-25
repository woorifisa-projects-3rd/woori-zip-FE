import React from "react";
import styles from "./Tab.module.css";

export default function Tab({ tabs, activeTab, onTabClick }) {
  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={`${styles.tabButton} ${
            activeTab === tab.id ? styles.active : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
