'use client'

import React, { useEffect } from "react";
import styles from "./Tab.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function Tab({ tabs }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 현재 URL에서 `role` 값을 가져오되, 없으면 기본값 1로 설정
  const currentRole = searchParams.get('role') || "0";

  // 기본값을 적용하기 위해 URL을 강제로 변경
  useEffect(() => {
    if (!searchParams.get('role')) {
      router.replace(`/user/login?role=0`);
    }
  }, [searchParams, router]);

  return (
    <div className={styles.tabList}>
      <ul>
        {tabs.map((tab) => (
          <li key={`tab${tab.id}`}>
            <Link
              href={`/user/login?role=${tab.id}`}
              className={currentRole === tab.id.toString() ? styles.active : ""}
            >
              <span>{tab.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
