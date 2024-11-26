import React, { useState } from 'react';
import styles from './LogSearch.module.css';

const LogSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [logData, setLogData] = useState([
    { id: 1, userId: 'admin01', date: '2023-11-24 02:25:08', status: '성공' },
    { id: 2, userId: 'admin02', date: '2023-11-24 02:25:08', status: '실패' },
    { id: 3, userId: 'admin03', date: '2023-11-24 02:25:08', status: '성공' },
    { id: 4, userId: 'admin04', date: '2023-11-24 02:25:08', status: '성공' },
    { id: 5, userId: 'admin01', date: '2023-11-24 02:25:08', status: '실패' },
    { id: 6, userId: 'admin02', date: '2023-11-24 02:25:08', status: '성공' },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const handleSearch = () => {
    console.log('검색어:', searchTerm);
    console.log('시작일:', startDate);
    console.log('종료일:', endDate);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const displayedLogs = logData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="로그 번호/아이디 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.dateRange}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.dateInput}
          />
          <span className={styles.dateSeparator}>-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.dateInput}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>
      <table className={styles.logTable}>
        <thead>
          <tr>
            <th>로그 번호</th>
            <th>아이디</th>
            <th>시간</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {displayedLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.userId}</td>
              <td>{log.date}</td>
              <td className={log.status === '성공' ? styles.successLabel : styles.failureLabel}>
                {log.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 0}
          onClick={() => handlePageChange(-1)}
        >
          이전
        </button>
        <button
          className={styles.paginationButton}
          disabled={(currentPage + 1) * pageSize >= logData.length}
          onClick={() => handlePageChange(1)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default LogSearch;