import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>이용약관</a>
            <span className={styles.divider}>|</span>
            <a href="#" className={`${styles.footerLink} ${styles.footerLinkBold}`}>개인정보처리방침</a>
            <span className={styles.divider}>|</span>
            <a href="#" className={styles.footerLink}>자주묻는질문</a>
          </div>
          <div className={styles.footerCompany}>
            <span className={styles.footerCompanySpan}>상호: (주)우리집</span>
            <span className={styles.divider}>|</span>
            <span className={styles.footerCompanySpan}>대표: 피사범대</span>
            <span className={styles.divider}>|</span>
            <span className={styles.footerCompanySpan}>이메일 문의: woorizip2024@gmail.com</span>
          </div>
          <div className={styles.footerCopyright}>
            Copyright © WOORIZIP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}