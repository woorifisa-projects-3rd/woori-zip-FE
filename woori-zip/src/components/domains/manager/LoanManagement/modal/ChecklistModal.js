'use client';

import React, { useState } from 'react';
import styles from './ChecklistModal.module.css';
import Modal from './Modal';
import ChecklistEditModal from './ChecklistEditModal';

const ChecklistModal = ({ isOpen, onClose }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [checklistItems, setChecklistItems] = useState([
    { id: 'submit', label: '제출 여부', value: '신청예정' },
    { id: 'review', label: '제출 기간', value: '2024.01.01 ~ 2024.12.31' },
    { id: 'process', label: '연소득', value: '6,000 만원' },
    { id: 'complete', label: '종자산', value: '3억원' },
    { id: 'review2', label: '계약 여부', value: '무' },
    { id: 'result', label: '결론 상태', value: '심사중' },
    { id: 'funds', label: '전세금', value: '3억원' },
    { id: 'monthly', label: '월세금', value: '50만원' },
    { id: 'area', label: '전용 면적', value: '84m²' }
  ]);

  const handleEditSave = (updatedData) => {
    setChecklistItems(updatedData);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="체크리스트">
        <div className={styles.checklistContainer}>
          <div className={styles.headerContainer}>
            <h3 className={styles.title}>대출 체크리스트</h3>
            <button 
              className={styles.editButton}
              onClick={() => setIsEditModalOpen(true)}
            >
              수정
            </button>
          </div>
          <div className={styles.content}>
            {checklistItems.map(item => (
              <div key={item.id} className={styles.checklistItem}>
                <div className={styles.label}>{item.label}</div>
                <div className={styles.value}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <ChecklistEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSave}
        initialData={checklistItems}
      />
    </>
  );
};

export default ChecklistModal;