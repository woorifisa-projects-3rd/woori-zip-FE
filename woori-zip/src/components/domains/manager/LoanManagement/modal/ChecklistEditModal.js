'use client';

import React, { useState } from 'react';
import styles from './ChecklistEditModal.module.css';

import Modal from './Modal';
import { updateLoanChecklist } from '@/app/api/manager/managerAPI';


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


const ChecklistEditModal = ({ loanGoodsId, isOpen, onClose, onSave,initialData}) => {
  const [formData, setFormData] = useState({initialData});

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const changeValue = (value) => {
        if (!value) return 0; 
        const stringValue = typeof value === "string" ? value.replace(/,/g, "") : value.toString();
        return Number(stringValue);
      };
  
      const modifyLoanChecklistRequest = {
        annualIncome: changeValue(formData.annualIncome),
        totalAssets: changeValue(formData.totalAssets),
        leaseDeposit: changeValue(formData.leaseDeposit),
        monthlyRent: changeValue(formData.monthlyRent),
        exclusiveArea: formData.exclusiveArea ? parseFloat(formData.exclusiveArea) : 0,
        marriageStatus: formData.marriageStatus,
        contract: formData.contract,
        workStatus: formData.workStatus,
        workTerm: formData.workTerm
      };
      console.log("수정");
      console.log(modifyLoanChecklistRequest);

      await updateLoanChecklist(loanGoodsId, modifyLoanChecklistRequest); 
      onSave(modifyLoanChecklistRequest);
      onClose();
    } catch (err) {
      console.error("Error modify loan checklist:", err);
    } 
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
    <Modal className={styles.modalBox} isOpen={isOpen} onClose={onClose} title="체크리스트 수정">
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
            type="text"
            defaultValue={formData.annualIncome ? Number(formData.annualIncome).toString() : ''}
            onChange={(e) => handleInputChange('annualIncome',  Number(e.target.value))}
            className={styles.input}
            placeholder="연소득을 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label>총자산</label>
          <input
            type="text"
            defaultValue={formData.totalAssets ? Number(formData.totalAssets).toString() : ''}
            onChange={(e) => handleInputChange('totalAssets',  Number(e.target.value))}
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
            type="text"
            defaultValue={formData.leaseDeposit ? Number(formData.exclusiveArea).toString() : ''}
            onChange={(e) => handleInputChange('leaseDeposit',  Number(e.target.value))}
            className={styles.input}
            placeholder="전세금을 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label>월세</label>
          <input
            type="text"
            defaultValue={formData.monthlyRent ? Number(formData.monthlyRent).toString() : ''}
            onChange={(e) => handleInputChange('monthlyRent',  Number(e.target.value))}
            className={styles.input}
            placeholder="월세를 입력하세요"
          />
        </div>

        <div className={styles.formGroup}>
          <label>전용면적</label>
          <input
            type="text"
            defaultValue={formData.exclusiveArea ? Number(formData.exclusiveArea).toString() : ''}
            onChange={(e) => handleInputChange('exclusiveArea', Number(e.target.value))}
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