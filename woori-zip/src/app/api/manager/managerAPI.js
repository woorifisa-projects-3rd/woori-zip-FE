'use server';

import { instance } from '../instance';

// 회원 목록 조회
export const getMembersList = async () => {
  try {
    const response = await instance('member/list', {
      method: 'GET'
    });
    return JSON.parse(JSON.stringify(response?.data || []));
  } catch (error) {
    console.error('회원 목록 조회 실패:', error);
    throw error;
  }
};

// 에이전트 목록 조회
export const getAgentList = async () => {
  try {
    const response = await instance('agent/list', {
      method: 'GET'
    });
    return JSON.parse(JSON.stringify(response?.data || []));
  } catch (error) {
    console.error('중개사 목록 조회 실패:', error);
    throw error;
  }
};

// 관리자 목록 조회
export const getManagerList = async () => {
  try {
    const response = await instance('manager/list', {
      method: 'GET'
    });
    return JSON.parse(JSON.stringify(response?.data || []));
  } catch (error) {
    console.error('관리자 목록 조회 실패:', error);
    throw error;
  }
};

// 권한 일괄 변경 (공통)
export const updateBulkPermissions = async (ids, action, type) => {
  try {
    const response = await instance(`${type}/permissions/bulk`, {
      method: 'PUT',
      body: JSON.stringify({
        ids,
        action
      })
    });
    return JSON.parse(JSON.stringify(response?.data || {}));
  } catch (error) {
    console.error('권한 변경 실패:', error);
    throw error;
  }
};

// 대출 상품 목록 조회 (관리자용)
export async function getLoanProducts(page = 0) {
  try {
    const response = await instance(`loangoods?page=${page}`, {
      method: 'GET'
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.error('대출 상품 목록 조회 실패:', error);
    throw error;
  }
}

// 대출 상품 상세 조회
export async function getLoanProductDetail(loanId) {
  try {
    const response = await instance(`loangoods/${loanId}`, {
      method: 'GET'
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.error('대출 상품 상세 조회 실패:', error);
    throw error;
  }
}

// 대출 상품 삭제
export async function deleteLoanProduct(loanId) {
  try {
    const response = await instance(`loangoods/${loanId}`, {
      method: 'DELETE'
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.error('대출 상품 삭제 실패:', error);
    throw error;
  }
}