'use server';

import { instance } from '../instance';

export const getMembersList = async (role, page = 0, size = 6) => {
  try {
    const response = await instance(`members?role=${role}&page=${page}&size=${size}`, {
      method: 'GET'
    });
    return response;
  } catch (error) {
    console.error('목록 조회 실패:', error);
    throw error;
  }
};

export const updateBulkPermissions = async (ids, action, type) => {
  try {
    const endpoint = action === 'approve' ? 'admins' : 'admins';
    const response = await instance(endpoint, {
      method: action === 'approve' ? 'POST' : 'DELETE',
      body: JSON.stringify({
        admins: ids
      })
    });
    return response;
  } catch (error) {
    console.error('권한 변경 실패:', error);
    throw error;
  }
};

export const getLoanProducts = async (page = 0) => {
 try {
   const response = await instance(`loangoods?page=${page}`, {
     method: 'GET'
   });
   return JSON.parse(JSON.stringify(response));
 } catch (error) {
   console.error('대출 상품 목록 조회 실패:', error);
   throw error;
 }
};

export const getLoanProductDetail = async (loanId) => {
 try {
   const response = await instance(`loangoods/${loanId}`, {
     method: 'GET'
   });
   return JSON.parse(JSON.stringify(response));
 } catch (error) {
   console.error('대출 상품 상세 조회 실패:', error);
   throw error;
 }
};

export const updateLoanProduct = async (loanId, loanData) => {
 try {
   const response = await instance(`loangoods/${loanId}`, {
     method: 'PUT', 
     body: JSON.stringify(loanData)
   });
   return JSON.parse(JSON.stringify(response?.data || {}));
 } catch (error) {
   console.error('대출 상품 수정 실패:', error);
   throw error;
 }
};

export const deleteLoanProduct = async (loanId) => {
 try {
   const response = await instance(`loangoods/${loanId}`, {
     method: 'DELETE'
   });
   return JSON.parse(JSON.stringify(response?.data || {}));
 } catch (error) {
   console.error('대출 상품 삭제 실패:', error);
   throw error;
 }
};