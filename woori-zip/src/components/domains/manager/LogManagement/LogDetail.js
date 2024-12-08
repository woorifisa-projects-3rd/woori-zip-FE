import { getLog } from '@/app/api/manager/managerAPI';
import React, { useEffect, useState } from 'react';
import styles from './LogDetail.module.css';

const LogModal = ({ logId }) => {

  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const response = await getLog(logId);
        if(response.success) setLoading(false);
        setLog(response.data);
    }
    fetchData();
  }, [logId]);

  return (
    <div>
        <h3>요청 정보</h3>
        {loading ? `정보 불러오는 중 ..`
         :         
         <table className={styles.logTable}>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{log.id}</td>
            </tr>
            <tr>
              <th>Username</th>
              <td>{log.username || '비회원'}</td>
            </tr>
            <tr>
              <th>Client IP</th>
              <td>{log.clientIp}</td>
            </tr>
            <tr>
              <th>Request URL</th>
              <td>{log.requestUrl}</td>
            </tr>
            <tr>
              <th>Request Body</th>
              <td>{log.requestBody || '없음'}</td>
            </tr>
            <tr>
              <th>Response Status</th>
              <td>{log.responseStatus}</td>
            </tr>
            <tr>
              <th>Response Body</th>
              <td>{log.responseBody}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{log.createdAt}</td>
            </tr>
            <tr>
              <th>Success</th>
              <td>{log.success ? '성공' : '실패'}</td>
            </tr>
          </tbody>
        </table>
        }
        </div>
  );
};

export default LogModal;
