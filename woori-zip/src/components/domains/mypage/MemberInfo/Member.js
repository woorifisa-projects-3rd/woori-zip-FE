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
    
        const data = {
          name: memberData.name || 'Unknown',
          birthDate: memberData.birthDate || 'N/A',
          gender: memberData.gender || 'N/A',
          membership: memberData.membership || 'N/A',
        };

        setMemberInfo(data);
      } catch (error) {
        console.error('회원를 찾을 수 없습니다', error);
        setError('로딩 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    getMemberInfo();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? ( // 로딩 중일 때
        <div className={styles.loading}>정보를 불러오는 중입니다...</div>
      ) : error ? ( // 에러 발생 시
        <div className={styles.error}>{error}</div>
      ) : ( // 로딩이 완료되었을 때
        <>
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
        </>
      )}
    </div>
  );
};

export default Member;
