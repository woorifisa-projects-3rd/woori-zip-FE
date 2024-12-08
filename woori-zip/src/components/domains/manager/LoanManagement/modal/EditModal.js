'use client';

import React from 'react';
import styles from './EditModal.module.css';
import Modal from './Modal';

const EditModal = ({ isOpen, onClose, editData, handleInputChange, handleEdit, rateTypeMapping }) => {
  const handleModalClose = () => {
    // 원본 데이터로 다시 설정
    Object.keys(editData).forEach(key => {
      if (key === 'rates' && editData.rates && editData.rates[0]) {
        const rate = editData.rates[0];
        Object.keys(rate).forEach(rateKey => {
          handleInputChange('rates', [{...editData.rates[0], [rateKey]: rate[rateKey]}]);
        });
      } else {
        handleInputChange(key, editData[key]);
      }
    });
    onClose();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit 시작 - 초기 editData:', editData);

    try {
      if (!editData.name?.trim()) {
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
        rates: editData.rates.map(rate => ({
          id: rate.id,
          rateType: rate.rateType,
          basicRate: parseFloat(rate.basicRate),
          addRate: parseFloat(rate.addRate),
          normalRate: parseFloat(rate.normalRate),
          specialRate: parseFloat(rate.specialRate),
          minRate: parseFloat(rate.minRate)
        }))
      };

      console.log('API 호출 전 최종 데이터:', dataToSubmit);

      await handleEdit(editData.id, dataToSubmit);
      console.log('API 호출 성공');
      onClose();
    } catch (error) {
      console.error('수정 중 상세 오류:', {
        error,
        errorData: error.data,
        errorDetails: error.data?.errors,
        requestData: dataToSubmit
      });
      if (error.data?.errors) {
        const errorMessage = error.data.errors
          .map(err => err.defaultMessage || err.message)
          .join('\n');
        alert(errorMessage);
      } else {
        alert(error.message || '수정 중 오류가 발생했습니다.');
      }
    }
  };

  const rate = editData.rates?.[0] || {
    id: null,
    rateType: 'FIXED',
    basicRate: '0',
    addRate: '0',
    normalRate: '0',
    specialRate: '0',
    minRate: '0'
  };

  const handleRateInputChange = (field, value) => {
    console.log(`금리 입력 변경 - ${field}:`, value);
    
    let cleanedValue = value.replace(/[^0-9.]/g, '');
    const parts = cleanedValue.split('.');
    let formattedValue = parts[0];
    
    if (parts.length > 1) {
      formattedValue += '.' + parts[1].slice(0, 2);
    }

    const numValue = parseFloat(formattedValue);
    if (isNaN(numValue) || numValue < 0) {
      formattedValue = '0.00';
    }

    console.log(`금리 입력 처리 결과 - ${field}:`, formattedValue);
    handleInputChange('rates', [{...rate, [field]: formattedValue}]);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} title="대출 상품 수정">
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <span>대출명</span>
          <input
            type="text"
            value={editData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            maxLength={100}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>대출유형</span>
          <select
            value={editData.loan_type || 'NATIONAL_HOUSING_URBAN_FUND'}
            onChange={(e) => handleInputChange('loan_type', e.target.value)}
            required
          >
            <option value="NATIONAL_HOUSING_URBAN_FUND">주택도시기금</option>
            <option value="LOAN_LEASE_DEPOSIT">전세자금대출</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <span>대출대상</span>
          <input
            type="text"
            value={editData.target || ''}
            onChange={(e) => handleInputChange('target', e.target.value)}
            maxLength={200}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>대출한도</span>
          <input
            type="text"
            value={editData.limit_amount || ''}
            onChange={(e) => handleInputChange('limit_amount', e.target.value)}
            placeholder="예: 3억원, 5000만원"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>대출기간</span>
          <input
            type="text"
            value={editData.term || ''}
            onChange={(e) => handleInputChange('term', e.target.value)}
            placeholder="예: 1년, 2년 6개월"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>이자방식</span>
          <input
            type="text"
            value={editData.interest_method || ''}
            onChange={(e) => handleInputChange('interest_method', e.target.value)}
            maxLength={50}
          />
        </div>
        <div className={styles.formGroup}>
          <span>금리유형</span>
          <select
            value={rate.rateType}
            onChange={(e) => handleInputChange('rates', [{...rate, rateType: e.target.value}])}
            required
          >
            {Object.entries(rateTypeMapping).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <span>기본금리 (%)</span>
          <input
            type="text"
            value={rate.basicRate || '0'}
            onChange={(e) => handleRateInputChange('basicRate', e.target.value)}
            placeholder="예: 3.5"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>가산금리 (%)</span>
          <input
            type="text"
            value={rate.addRate || '0'}
            onChange={(e) => handleRateInputChange('addRate', e.target.value)}
            placeholder="예: 3.5"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>일반금리 (%)</span>
          <input
            type="text"
            value={rate.normalRate || '0'}
            onChange={(e) => handleRateInputChange('normalRate', e.target.value)}
            placeholder="예: 3.5"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>특별금리 (%)</span>
          <input
            type="text"
            value={rate.specialRate || '0'}
            onChange={(e) => handleRateInputChange('specialRate', e.target.value)}
            placeholder="예: 3.5"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>최저금리 (%)</span>
          <input
            type="text"
            value={rate.minRate || '0'}
            onChange={(e) => handleRateInputChange('minRate', e.target.value)}
            placeholder="예: 3.5"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <span>상환방식</span>
          <input
            type="text"
            value={editData.repay_type || ''}
            onChange={(e) => handleInputChange('repay_type', e.target.value)}
            maxLength={100}
          />
        </div>
        <div className={styles.formGroup}>
          <span>보증방식</span>
          <input
            type="text"
            value={editData.guarantee || ''}
            onChange={(e) => handleInputChange('guarantee', e.target.value)}
            maxLength={100}
          />
        </div>
        <div className={styles.formGroup}>
          <span>대상주택</span>
          <input
            type="text"
            value={editData.target_house || ''}
            onChange={(e) => handleInputChange('target_house', e.target.value)}
            maxLength={200}
          />
        </div>
        <div className={styles.formGroup}>
          <span>고객부담비용</span>
          <input
            type="text"
            value={editData.customer_cost || ''}
            onChange={(e) => handleInputChange('customer_cost', e.target.value)}
            maxLength={200}
          />
        </div>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={handleModalClose}
          >
            취소
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.confirmButton}`}
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;