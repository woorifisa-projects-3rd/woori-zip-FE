import React, { useEffect, useState } from 'react';
import styles from './LogSearch.module.css';
import { getLogs } from '@/app/api/manager/managerAPI';
import LogModal from './LogDetail';
import Modal from './Modal';

const LogSearch = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [keyword, setKeyword] = useState(null);  
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [logs, setLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState(null);

  const params = {
    size:5,
    keyword,
    page,
    startDate,
    endDate,
  };

  const handleShow = (logId) => {
    setSelectedLogId(logId);
    setShowModal(true); 
  }
  const handleClose = () => {
    setSelectedLogId(null);
    setShowModal(false);
  }
  const [localKeyword, setLocalKeyword] = useState();
  const [localStartDate, setLocalStartDate] = useState();
  const [localEndDate, setLocalEndDate] = useState();

  // 검색 버튼 클릭 시 상태 동기화
  const handleSearch = () => {
    setKeyword(localKeyword);
    setStartDate(localStartDate);
    setEndDate(localEndDate);
  };

  useEffect(() => {
    const fetchData = async () => {
      const queryString = Object.keys(params).filter(key => params[key] !== null && params[key] !== undefined)
      .map(key => `${key}=${params[key]}`)
      .join("&");

      const response = await getLogs({queryString});
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
      setLogs(response.data.logs);
    }
    fetchData();
  }, [startDate, endDate, keyword, page]);

  const getPageRange = () => {
    const pageGroup = Math.ceil((page + 1) / 5);
    const start = (pageGroup - 1) * 5;
    const end = Math.min(pageGroup * 5, totalPages);
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="아이디 검색"
            value={localKeyword ? localKeyword : ''}
            onChange={(e) => setLocalKeyword(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.dateRange}>
          <input
            type="datetime-local"
            value={localStartDate ? localStartDate : ''}
            onChange={(e) => setLocalStartDate(e.target.value)}
            className={styles.dateInput}
          />
          <span className={styles.dateSeparator}>-</span>
          <input
            type="datetime-local"
            value={localEndDate ? localEndDate : ''}
            onChange={(e) => setLocalEndDate(e.target.value)}
            className={styles.dateInput}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.logTable}>
          <colgroup>
            <col width="100px" />
            <col width="100px" />
            <col width="150px" />
            <col width="*"/>
            <col width="*"/>
            <col width="150px"/>
          </colgroup>
          <thead>
            <tr>
              <th>상태</th> 
              <th>로그 번호</th>
              <th>아이디</th>
              <th>시간</th>
              <th>요청 URL</th>
              <th>상태코드</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} onClick={() => handleShow(log.id)}>
                <td>
                  <span className={log.success ? styles.successLabel : styles.failureLabel}>
                    {log.success ? `성공` : `실패`}
                  </span>
                </td>
                <td>{log.id}</td>
                <td>{log.username}</td>
                <td>{log.createdAt}</td>
                <td>{log.requestUrl}</td>
                <td>{log.responseStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
      <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            이전
          </button>

          {getPageRange().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`${styles.paginationButton} ${
                page === pageNum ? styles.active : ''
              }`}
            >
              {pageNum + 1}
            </button>
          ))}

          <button
            className={styles.paginationButton}
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            다음
          </button>
        </div>
        {showModal && 
        <Modal show={showModal} onClose={handleClose}>
          <LogModal logId={selectedLogId} />
        </Modal>}
    </div>
    
  );
};

export default LogSearch;