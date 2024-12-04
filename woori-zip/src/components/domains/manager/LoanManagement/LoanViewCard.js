'use client';

import styles from "./LoanViewCard.module.css";

const LoanViewCard = ({ loanGoods, onModify, onDelete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardItem}>
        <div className={styles.cardTopContent}>
          <div className={styles.cardContent}>
            <div className={styles.loanType}>{loanGoods.loanType}</div>
            <div className={styles.loanName}>{loanGoods.loanName}</div>
            <div className={styles.loanSummary}>
              <div className={styles.loanTextBox1}>
                <span className={styles.loanTarget}>대출대상</span>
                <div className={styles.loanTargetText} title={loanGoods.target}>
                  {loanGoods.target}
                </div>
              </div>
              <p></p>
              <div className={styles.loanTextBox2}>
                <span className={styles.loanDate}>대출기간</span>
                <div className={styles.loanDateText} title={loanGoods.term}>
                  {loanGoods.term}
                </div>
              </div>
              <p></p>
              <div className={styles.loanTextBox3}>
                <span className={styles.loanLimit}>대출한도</span>
                <div className={styles.loanLimitText} title={loanGoods.limitAmount}>
                  {loanGoods.limitAmount}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img className={styles.cardImage} src={loanGoods.imageUrl} alt="대출 상품 이미지" />
          </div>
          <div className={styles.buttonContainer}>
            <button 
              className={styles.modifyButton}
              onClick={onModify}
            >
              수정
            </button>
            <button 
              className={styles.removeButton}
              onClick={onDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanViewCard;