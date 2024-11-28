'use client'

import React from "react";
import styles from "./Tab.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Tab({ tabs }) {
  const searchParams = useSearchParams();
  return (
    <div className={styles.tabList}>
      <ul>
        {tabs.map((tab) => (
          // <button
          //   key={tab.id}
          //   onClick={() => onTabClick(tab.id)}
          //   className={`${styles.tabButton} ${
          //     activeTab === tab.id ? styles.active : ""
          //   }`}
          // > 
          //   {tab.label}
          // </button>
          <li key={`tab${tab.id}`}>
            <Link href={`/user/login?role=${tab.id}`} className={searchParams.get('role') == tab.id ? styles.active : ''}>
              <span>{tab.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
