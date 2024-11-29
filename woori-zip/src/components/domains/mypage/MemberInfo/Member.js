import styles from './Member.module.css';
import React, { useEffect, useState } from 'react';
import { fetchMemberInfo } from '@/app/api/mypage/MypageAPI';

const Member = () => {
  const [memberInfo, setMemberInfo] = useState({
    name: '',
    birthDate: '',
    gender: '',
    membership: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetchMemberInfo();
  
        const memberData = response.data;
        
        //데이터를 JSON으로 변환 가능한 형태로 변환
        const safeData = {
          name: memberData.name || 'Unknown',
          birthDate: memberData.birthDate || 'N/A',
          gender: memberData.gender || 'N/A',
          membership: memberData.membership || 'N/A',
        };

        setMemberInfo(safeData);
      } catch (error) {
        console.error('Failed to fetch member info:', error);
        setError('Failed to load member info.');
      } finally {
        setIsLoading(false);
      }
    };

    getMemberInfo();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <div className={styles.textGroup}>
          <p className={styles.titleText}>이름</p>
          <p className={styles.contentText}>{memberInfo.name}</p>
        </div>

        <div className={styles.textGroup}>
          <p className={styles.titleText}>생년월일</p>
          <p className={styles.contentText}>{memberInfo.birthDate}</p>
        </div>

        <div className={styles.textGroup}>
          <p className={styles.titleText}>성별</p>
          <p className={styles.contentText}>{memberInfo.gender}</p>
        </div>

        <div className={styles.textGroup}>
          <p className={styles.titleText}>회원등급</p>
          <p className={styles.contentText}>{memberInfo.membership}</p>
        </div>
      </div>
      <div className={styles.imgBox}>
        <div className={styles.img}></div>
      </div>
    </div>
  );
};

export default Member;
