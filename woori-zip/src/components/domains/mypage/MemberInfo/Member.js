import styles from './Member.module.css';

const Member = () => {
  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <div className={styles.textGroup}>
          <p className={styles.titleText}>이름</p>
          <p className={styles.contentText}>최종수</p>
        </div>

        <div className={styles.textGroup}>
          <p className={styles.titleText}>생년월일</p>
          <p className={styles.contentText}>1999.11.25</p>
        </div>

        <div className={styles.textGroup}>
          <p className={styles.titleText}>성별</p>
          <p className={styles.contentText}>여성</p>
        </div>

        <div className={styles.textGroup}>
          <p className={styles.titleText}>회원등급</p>
          <p className={styles.contentText}>골드</p>
        </div>
      </div>
      <div className={styles.imgBox}>
        <div className={styles.img}></div>
      </div>
    </div>
  );
};

export default Member;