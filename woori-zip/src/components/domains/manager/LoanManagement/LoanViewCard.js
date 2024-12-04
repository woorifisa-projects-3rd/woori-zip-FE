'use client';
import { useState } from 'react';
import styles from "./LoanViewCard.module.css";

// 대출 유형 매핑 객체
const LOAN_TYPE_MAPPING = {
  LOAN_LEASE_DEPOSIT: '전세자금대출',
  NATIONAL_HOUSING_URBAN_FUND: '주택도시기금'
};

const LoanViewCard = ({ loanGoods, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: loanGoods.name,
    loanType: loanGoods.loanType,
    target: loanGoods.target,
    limitAmount: loanGoods.limitAmount,
    term: loanGoods.term,
    normalRate: loanGoods.normalRate || 0,
    specialRate: loanGoods.specialRate || 0,
    repayType: loanGoods.repayType || '',
    guarantee: loanGoods.guarantee || '',
    targetHouse: loanGoods.targetHouse || '',
    customerCost: loanGoods.customerCost || '',
    interestMethod: loanGoods.interestMethod || '',
    imageUrl: loanGoods.imageUrl || ''
  });

  const handleEdit = async () => {
    try {
      await onEdit(loanGoods.id, editData);
      setIsEditing(false);
    } catch (error) {
      alert('수정에 실패했습니다.');
    }
  };

  if (isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.cardItem}>
          <div className={styles.cardTopContent}>
            <div className={styles.cardContent}>
              {/* 기본 정보 */}
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>대출명</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>대출유형</span>
                <select
                  className={styles.loanTargetText}
                  value={editData.loanType}
                  onChange={(e) => setEditData({...editData, loanType: e.target.value})}
                >
                  <option value="LOAN_LEASE_DEPOSIT">전세자금대출</option>
                  <option value="NATIONAL_HOUSING_URBAN_FUND">주택도시기금</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>대출대상</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.target}
                  onChange={(e) => setEditData({...editData, target: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>대출한도</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.limitAmount}
                  onChange={(e) => setEditData({...editData, limitAmount: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>대출기간</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.term}
                  onChange={(e) => setEditData({...editData, term: e.target.value})}
                />
              </div>
              
              {/* 금리 정보 */}
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>이자방식</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.interestMethod}
                  onChange={(e) => setEditData({...editData, interestMethod: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>일반금리</span>
                <input
                  className={styles.loanTargetText}
                  type="number"
                  step="0.01"
                  value={editData.normalRate}
                  onChange={(e) => setEditData({...editData, normalRate: parseFloat(e.target.value)})}
                />
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>특별금리</span>
                <input
                  className={styles.loanTargetText}
                  type="number"
                  step="0.01"
                  value={editData.specialRate}
                  onChange={(e) => setEditData({...editData, specialRate: parseFloat(e.target.value)})}
                />
              </div>

              {/* 상환 및 보증 정보 */}
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>상환방식</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.repayType}
                  onChange={(e) => setEditData({...editData, repayType: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>보증방식</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.guarantee}
                  onChange={(e) => setEditData({...editData, guarantee: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>대상주택</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.targetHouse}
                  onChange={(e) => setEditData({...editData, targetHouse: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <span className={styles.loanTarget}>고객부담비용</span>
                <input
                  className={styles.loanTargetText}
                  type="text"
                  value={editData.customerCost}
                  onChange={(e) => setEditData({...editData, customerCost: e.target.value})}
                />
              </div>
            </div>
            <div className={styles.imageContainer}>
              <img className={styles.cardImage} src={loanGoods.imageUrl} alt="대출 상품 이미지" />
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.modifyButton}
                onClick={handleEdit}
              >
                저장
              </button>
              <button
                className={styles.removeButton}
                onClick={() => setIsEditing(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardItem}>
        <div className={styles.cardTopContent}>
          <div className={styles.cardContent}>
            <div className={styles.loanType}>{LOAN_TYPE_MAPPING[loanGoods.loanType] || loanGoods.loanType}</div>
            <div className={styles.loanName}>{loanGoods.name}</div>
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
              onClick={() => setIsEditing(true)}
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