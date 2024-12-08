'use client';

import React, { useState, useCallback } from 'react';
import styles from "./LoanViewCard.module.css";
import Modal from './modal/Modal';
import EditModal from './modal/EditModal';
import ChecklistModal from './modal/ChecklistModal';

const LOAN_TYPE_MAPPING = {
  NATIONAL_HOUSING_URBAN_FUND: '주택도시기금',
  LOAN_LEASE_DEPOSIT: '전세자금대출'
};

const RATE_TYPE_MAPPING = {
  FIXED: '고정금리',
  NEW_COFIX_SIX_MONTH: '신규COFIX기준금리(6개월)',
  NEW_COFIX_ONE_YEAR: '신규COFIX기준금리(1년)',
  COFIX_SIX_MONTH: '신잔액COFIX기준금리(6개월)',
  COFIX_ONE_YEAR: '신잔액COFIX기준금리(1년)'
};

const LoanViewCard = ({ loanGoods, onEdit, onDelete, onModalStateChange }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [editData, setEditData] = useState(null);

  const initializeEditData = useCallback(() => {
    console.log('초기 대출 데이터:', loanGoods);
    return {
      ...loanGoods,
      loan_type: loanGoods.loan_type || 'NATIONAL_HOUSING_URBAN_FUND',
      name: loanGoods.name || '',
      target: loanGoods.target || '',
      limit_amount: loanGoods.limit_amount || '',
      term: loanGoods.term || '',
      repay_type: loanGoods.repay_type || '',
      guarantee: loanGoods.guarantee || '',
      target_house: loanGoods.target_house || '',
      customer_cost: loanGoods.customer_cost || '',
      interest_method: loanGoods.interest_method || '',
      rates: (loanGoods.rates || []).map(rate => ({
        id: rate.id,
        rateType: rate.rateType || 'FIXED',
        basicRate: rate.basicRate || '0.00',
        addRate: rate.addRate || '0.00',
        normalRate: rate.normalRate || '0.00',
        specialRate: rate.specialRate || '0.00',
        minRate: rate.minRate || '0.00'
      }))
    };
  }, [loanGoods]);

  const handleEditModalOpen = useCallback(() => {
    setEditData(initializeEditData());
    setIsEditModalOpen(true);
    onModalStateChange?.(true);
  }, [initializeEditData, onModalStateChange]);

  const handleEditModalClose = useCallback(() => {
    setEditData(null);
    setIsEditModalOpen(false);
    onModalStateChange?.(false);
  }, [onModalStateChange]);

  const handleInputChange = useCallback((field, value) => {
    setEditData(prev => {
      if (!prev) return null;

      if (field === 'rates') {
        return {
          ...prev,
          rates: value
        };
      }
      
      return {
        ...prev,
        [field]: value
      };
    });
  }, []);

  const showAlert = useCallback((message) => {
    setAlertMessage(message);
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  }, []);

  const handleEdit = useCallback(async () => {
    try {
      if (!editData?.name?.trim()) {
        throw new Error('대출명은 필수 입력값입니다.');
      }

      const validateRate = (rate) => {
        if (!rate) return false;
        const fields = ['basicRate', 'addRate', 'normalRate', 'specialRate', 'minRate'];
        return fields.every(field => {
          const value = parseFloat(rate[field]);
          return !isNaN(value) && value >= 0;
        });
      };

      if (!editData.rates?.[0] || !validateRate(editData.rates[0])) {
        throw new Error('모든 금리는 0 이상의 숫자여야 합니다.');
      }

      const dataToSubmit = {
        name: editData.name.trim(),
        loan_type: editData.loan_type,
        target: editData.target?.trim() || '',
        limit_amount: editData.limit_amount?.trim() || '',
        term: editData.term?.trim() || '',
        repay_type: editData.repay_type?.trim() || '',
        guarantee: editData.guarantee?.trim() || '',
        target_house: editData.target_house?.trim() || '',
        customer_cost: editData.customer_cost?.trim() || '',
        interest_method: editData.interest_method?.trim() || '',
        rateRequests: editData.rates.map(rate => ({
          id: rate.id,
          rateType: rate.rateType,
          basicRate: rate.basicRate,
          addRate: rate.addRate,
          normalRate: rate.normalRate,
          specialRate: rate.specialRate,
          minRate: rate.minRate
        }))
      };

      await onEdit(loanGoods.id, dataToSubmit);
      handleEditModalClose();
      showAlert('대출 상품이 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('수정 중 오류:', error);
      alert(error.message || '수정 중 오류가 발생했습니다.');
    }
  }, [editData, loanGoods.id, onEdit, handleEditModalClose, showAlert]);

  const handleDelete = useCallback(async () => {
    try {
      await onDelete(loanGoods.id);
      setIsDeleteModalOpen(false);
      showAlert('대출 상품이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 중 오류:', error);
      alert(error.message || '삭제 중 오류가 발생했습니다.');
    }
  }, [loanGoods.id, onDelete, showAlert]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardItem}>
          <div className={styles.cardTopContent}>
            <div className={styles.cardContent}>
              <div className={styles.loanType}>{LOAN_TYPE_MAPPING[loanGoods.loan_type]}</div>
              <div className={styles.loanName}>{loanGoods.name}</div>
              <div className={styles.loanSummary}>
                <div className={styles.loanTextBox1}>
                  <span className={styles.loanTarget}>대출대상</span>
                  <div className={styles.loanTargetText} title={loanGoods.target}>
                    {loanGoods.target}
                  </div>
                </div>
                <div className={styles.loanTextBox2}>
                  <span className={styles.loanDate}>대출기간</span>
                  <div className={styles.loanDateText} title={loanGoods.term}>
                    {loanGoods.term}
                  </div>
                </div>
                <div className={styles.loanTextBox3}>
                  <span className={styles.loanLimit}>대출한도</span>
                  <div className={styles.loanLimitText} title={loanGoods.limit_amount}>
                    {loanGoods.limit_amount}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={styles.checklistButton}
                onClick={() => setIsChecklistModalOpen(true)}
              >
                체크리스트 조회
              </button>
              <button
                type="button"
                className={styles.editButton}
                onClick={handleEditModalOpen}
              >
                수정
              </button>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChecklistModal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
      />

      <EditModal 
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        editData={editData || initializeEditData()}
        handleInputChange={handleInputChange}
        handleEdit={handleEdit}
        rateTypeMapping={RATE_TYPE_MAPPING}
      />

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="대출 상품 삭제"
      >
        <div className={styles.deleteConfirmation}>
          <p>정말 이 대출 상품을 삭제하시겠습니까?</p>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              취소
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>

      {showSuccessAlert && (
        <div className={styles.alertContainer}>
          <div className={styles.alertContent}>
            {alertMessage}
          </div>
        </div>
      )}
    </>
  );
};

export default LoanViewCard;