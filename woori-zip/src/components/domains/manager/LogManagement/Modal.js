import React, { useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.modalClose} onClick={onClose}>{`닫기`}</button>
      </div>
    </div>
  );
};

export default Modal;
