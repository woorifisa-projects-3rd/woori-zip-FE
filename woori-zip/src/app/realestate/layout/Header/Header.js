'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // useRouter 대신 useNavigation을 사용
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();

  // 로그아웃 버튼 클릭 시 메인 페이지로 이동하는 함수
  const handleLogout = () => {
    router.push('/');
  };

  return (
    <header className={styles.header}>
      {/* 로고 링크 */}
      <div className={styles.header_left}>
        <Link href="/" className={styles.header_title}>
          WOORI ZIP
        </Link>
      </div>
      
      <div>
        {/* 로그아웃 버튼 */}
        <button
          className={`${styles.login_button} ${styles.webButton}`}
          onClick={handleLogout}
        >
          로그아웃
        </button>

        {/* 나가기 버튼 */}
        <Image
          src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/mypage/back+button.png"
          alt="나가기"
          width={28}
          height={28}
          className={styles.mobileButton}
          onClick={handleLogout}
        />
      </div>
    </header>
  );
}