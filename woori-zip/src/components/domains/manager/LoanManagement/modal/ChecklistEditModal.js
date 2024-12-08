'use client';

import React, { useState } from 'react';
import styles from './ChecklistModal.module.css';
import Modal from './Modal';

const MARRIAGE_STATUS = {
  SINGLE: "미혼",
  MARRIED: "기혼",
  NEW_MARRIAGE: "신혼",
  NONE_MARRIAGE: "해당없음"
};

const WORK_STATUS = {
  UNEMPLOYED: "무직",
  EMPLOYED: "직장인",
  NONE_WORK_STATUS: "해당없음"
};

const WORK_TERM = {
  NONE_TERM: "해당없음",
  ONE_YEAR: "1년 이상",
  THREE_MONTH: "3개월 이상"
};

const ChecklistEditModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    workStatus: 'NONE_WORK_STATUS',
    workTerm: 'NONE_TERM',
    annualIncome: '',
    totalAssets: '',
    contract: false,
    marriageStatus: 'NONE_MARRIAGE',
    leaseDeposit: '',
    monthlyRent: '',
    exclusiveArea: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      annualIncome: Number(formData.annualIncome),
      totalAssets: Number(formData.totalAssets),
      leaseDeposit: Number(formData.leaseDeposit),
      monthlyRent: Number(formData.monthlyRent),
      exclusiveArea: Number(formData.exclusiveArea)
    };
    onSave(submitData);
  };

  const renderStatusButtons = (field, options) => (
    <div className={styles.buttonGroup}>
      {Object.entries(options).map(([key, value]) => (
        <button
          key={key}
          type="button"
          className={`${styles.statusButton} ${formData[field] === key ? styles.selected : ''}`}
          onClick={() => handleInputChange(field, key)}
        >
          {value}
        </button>
      ))}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="체크리스트 수정">
      <form onSubmit={handleSubmit} className={styles.editContainer}>
        <div className={styles.formGroup}>
          <label>근로 상태</label>
          {renderStatusButtons('workStatus', WORK_STATUS)}
        </div>

        <div className={styles.formGroup}>
          <label>근로 기간</label>
          {renderStatusButtons('workTerm', WORK_TERM)}
        </div>

        <div className={styles.formGroup}>
          <label>결혼 상태</label>
          {renderStatusButtons('marriageStatus', MARRIAGE_STATUS)}
        </div>

        <div className={styles.formGroup}>
          <label>연소득</label>
          <input
            type="number"
            value={formData.annualIncome}
            onChange={(e) => handleInputChange('annualIncome', e.target.value)}
            className={styles.input}
            placeholder="연소득을 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label>총자산</label>
          <input
            type="number"
            value={formData.totalAssets}
            onChange={(e) => handleInputChange('totalAssets', e.target.value)}
            className={styles.input}
            placeholder="총자산을 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label>계약 여부</label>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.contract}
              onChange={(e) => handleInputChange('contract', e.target.checked)}
            />
            <span>계약</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>전세금</label>
          <input
            type="number"
            value={formData.leaseDeposit}
            onChange={(e) => handleInputChange('leaseDeposit', e.target.value)}
            className={styles.input}
            placeholder="전세금을 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label>월세</label>
          <input
            type="number"
            value={formData.monthlyRent}
            onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
            className={styles.input}
            placeholder="월세를 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label>전용면적</label>
          <input
            type="number"
            value={formData.exclusiveArea}
            onChange={(e) => handleInputChange('exclusiveArea', e.target.value)}
            className={styles.input}
            placeholder="전용면적을 입력하세요"
            step="0.01"
          />
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
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

export default ChecklistEditModal;