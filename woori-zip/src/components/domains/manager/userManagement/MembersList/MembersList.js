'use client';

import { useState } from 'react';
import styles from './MembersList.module.css';

export default function MembersList() {
  const [managerList, setManagerList] = useState([
    { id: 1, userId: 'Agent01', name: '중개사01', status: '권한 승인' },
    { id: 2, userId: 'Agent02', name: '중개사02', status: '권한 승인' },
    { id: 3, userId: 'Agent03', name: '중개사03', status: '권한 해제' },
    { id: 4, userId: 'Agent04', name: '중개사04', status: '권한 해제' },
    { id: 5, userId: 'Agent05', name: '중개사05', status: '권한 승인' },
    { id: 6, userId: 'Agent06', name: '중개사06', status: '권한 해제' },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const totalPages = Math.ceil(managerList.length / pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    setManagerList((prevList) =>
      prevList.map((manager) =>
        selectedIds.includes(manager.id)
          ? { ...manager, status: action === 'approve' ? '권한 승인' : '권한 해제' }
          : manager
      )
    );
    setSelectedIds([]); // Clear selection after action
  };

  const displayedManagers = managerList.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className={styles.container}>
      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button
          className={`${styles.actionButton} ${styles.approved}`}
          onClick={() => handleBulkAction('approve')}
          disabled={selectedIds.length === 0}
        >
          권한 승인
        </button>
        <button
          className={`${styles.actionButton} ${styles.rejected}`}
          onClick={() => handleBulkAction('revoke')}
          disabled={selectedIds.length === 0}
        >
          권한 해제
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked
                        ? managerList.map((manager) => manager.id)
                        : []
                    )
                  }
                  checked={
                    managerList.length > 0 &&
                    managerList.every((manager) => selectedIds.includes(manager.id))
                  }
                />
              </th>
              <th>사용자 번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {displayedManagers.map((manager) => (
              <tr key={manager.id} className={styles.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(manager.id)}
                    onChange={() => toggleSelection(manager.id)}
                  />
                </td>
                <td>{manager.id}</td>
                <td>{manager.userId}</td>
                <td>{manager.name}</td>
                <td>
                  <button
                    className={`${styles.statusButton} ${
                      manager.status === '권한 승인' ? styles.approved : styles.rejected
                    }`}
                  >
                    {manager.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`${styles.paginationButton} ${
              currentPage === index ? styles.active : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.paginationButton}
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}