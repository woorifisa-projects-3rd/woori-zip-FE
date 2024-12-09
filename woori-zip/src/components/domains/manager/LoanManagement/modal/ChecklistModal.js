'use client';

import React, { useEffect, useState } from 'react';
import styles from './ChecklistModal.module.css';
import Modal from './Modal';
import ChecklistEditModal from './ChecklistEditModal';
import { getLoanCheckListDetails } from '@/app/api/manager/managerAPI';

const ChecklistModal = ({ loanGoodsId, isOpen, onClose }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const checkListFields = [//key수정
    { key: 'workStatus', label: '직업' },
    { key: 'workTerm', label: '재직 기간' },
    { key: 'annualIncome', label: '연소득' },
    { key: 'totalAssets', label: '총자산' },
    { key: 'contract', label: '계약 여부' },
    { key: 'marriageStatus', label: '결혼 상태' },
    { key: 'leaseDeposit', label: '전세금' },
    { key: 'monthlyRent', label: '월세금' },
    { key: 'exclusiveArea', label: '전용 면적' }];

  const handleEditSave = (data) => {
    setData(data);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (isOpen && loanGoodsId) {
      const fetchData = async () => {
        try {
          const response = await getLoanCheckListDetails(loanGoodsId);  
          setData(response); 
        } catch (error) {
          console.error('Error fetching data:', error);
        } 
      };

      fetchData();
    }
}, [isOpen, loanGoodsId]);




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
            {checkListFields.map((field) => {
              const value = data[field.key];
              return value ? (
                <div key={field.key} className={styles.checklistItem}>
                  <div className={styles.label}>{field.label}</div>
                  <div className={styles.value}>{value}</div>
                </div>
              ) : <div key={field.key} className={styles.checklistItem}>
                    <div className={styles.label}>{field.label}</div>
                    <div className={styles.value}>해당 없음</div>
                  </div>;
          })}
        
          </div>
        </div>
      </Modal>

      <ChecklistEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSave}
        loanGoodsId = {loanGoodsId}
        initialData = {data}
      />
    </>
  );
};

export default ChecklistModal;