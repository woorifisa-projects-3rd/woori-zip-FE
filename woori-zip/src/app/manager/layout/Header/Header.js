'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import Tabs from '../../components/Tabs/Tabs';

export default function Header({ 
  mainTab, 
  subTab, 
  onMainTabChange, 
  onSubTabChange, 
  showSubTabs 
}) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <Link href="/" className={styles.header_title}>
            WOORI ZIP
          </Link>
        </div>
        
        <div>
          <button
            className={`${styles.login_button} ${styles.webButton}`}
            onClick={handleLogout}
          >
            로그아웃
          </button>
          
          <Image
            src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/mypage/back+button.png"
            alt="나가기"
            width={28}
            height={28}
            className={styles.mobileButton}
            onClick={handleLogout}
          />
        </div>
      </div>

      <nav className={styles.headerNav}>
        <ul className={styles.navList}>
          <li 
            className={`${styles.navItem} ${mainTab === '사용자 관리' ? styles.activeItem : ''}`}
            onClick={() => onMainTabChange('사용자 관리')}
          >
            <span className={styles.navLink}>사용자 관리</span>
          </li>
          <li 
            className={`${styles.navItem} ${mainTab === '로그 조회' ? styles.activeItem : ''}`}
            onClick={() => onMainTabChange('로그 조회')}
          >
            <span className={styles.navLink}>로그 조회</span>
          </li>
          <li 
            className={`${styles.navItem} ${mainTab === '대출 상품 관리' ? styles.activeItem : ''}`}
            onClick={() => onMainTabChange('대출 상품 관리')}
          >
            <span className={styles.navLink}>대출 상품 관리</span>
          </li>
        </ul>
      </nav>

      {showSubTabs && (
        <Tabs 
          currentTab={subTab} 
          onTabChange={onSubTabChange} 
        />
      )}
    </>
  );
}