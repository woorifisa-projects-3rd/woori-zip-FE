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
    throw new Error(error.response?.data?.message || '회원 목록을 불러오는데 실패했습니다.');
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
    throw new Error(error.response?.data?.message || '권한 변경에 실패했습니다.');
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
    throw new Error(error.response?.data?.message || '대출 상품 목록을 불러오는데 실패했습니다.');
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
    throw new Error(error.response?.data?.message || '대출 상품 상세 정보를 불러오는데 실패했습니다.');
  }
};

export const updateLoanProduct = async (loanId, loanData) => {
  try {
    if (!loanData.name?.trim()) throw new Error('대출명은 필수 입력값입니다.');
    if (!loanData.target?.trim()) throw new Error('대출대상은 필수 입력값입니다.');
    if (!loanData.limit_amount?.trim()) throw new Error('대출한도는 필수 입력값입니다.'); // limitAmount -> limit_amount
    if (!loanData.term?.trim()) throw new Error('대출기간은 필수 입력값입니다.');

    // 금리 유효성 검사
    if (!loanData.rateRequests?.[0]) {
      throw new Error('금리 정보는 필수입니다.');
    }

    const response = await instance(`loangoods/${loanId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: loanData.name,
        loan_type: loanData.loan_type,
        target: loanData.target,
        limit_amount: loanData.limit_amount,  // 스네이크 케이스로 통일
        term: loanData.term,
        repay_type: loanData.repay_type,     // repayType -> repay_type
        guarantee: loanData.guarantee,
        target_house: loanData.target_house,  // targetHouse -> target_house
        customer_cost: loanData.customer_cost, // customerCost -> customer_cost
        interest_method: loanData.interest_method, // interestMethod -> interest_method
        rateRequests: loanData.rateRequests
      })
    });

    return JSON.parse(JSON.stringify(response?.data || {}));
  } catch (error) {
    console.error('대출 상품 수정 실패:', error);
    throw new Error(error.message || '대출 상품 수정에 실패했습니다.');
  }
};

export const deleteLoanProduct = async (loanId) => {
  try {
    if (!loanId) throw new Error('삭제할 대출 상품 ID가 필요합니다.');
    
    const response = await instance(`loangoods/${loanId}`, {
      method: 'DELETE'
    });
    return JSON.parse(JSON.stringify(response?.data || {}));
  } catch (error) {
    console.error('대출 상품 삭제 실패:', error);
    throw new Error(error.response?.data?.message || '대출 상품 삭제에 실패했습니다.');
  }
};


// 대출 상품 추천 목록 조회
export const getRecommendedLoanProducts = async (houseId, filters) => {
  try {
    const response = await instance(`loangoods/recommend/${houseId}`, {
      method: 'GET',
      params: filters
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.error('대출 상품 추천 목록 조회 실패:', error);
    throw new Error(error.response?.data?.message || '대출 상품 추천 목록을 불러오는데 실패했습니다.');
  }
};

// 새로운 대출 상품 등록
export const saveLoanProduct = async (loanData) => {
  try {
    const response = await instance('loangoods', {
      method: 'POST',
      body: JSON.stringify(loanData)
    });
    return JSON.parse(JSON.stringify(response?.data || {}));
  } catch (error) {
    console.error('대출 상품 등록 실패:', error);
    throw new Error(error.response?.data?.message || '대출 상품 등록에 실패했습니다.');
  }
};

// 대출 상품 수정
export const modifyLoanProduct = async (loanId, modifyData) => {
  try {
    if (!loanId) throw new Error('수정할 대출 상품 ID가 필요합니다.');
    
    const response = await instance(`loangoods/${loanId}`, {
      method: 'PUT',
      body: JSON.stringify(modifyData)
    });
    
    return JSON.parse(JSON.stringify(response?.data || {}));
  } catch (error) {
    console.error('대출 상품 수정 실패:', error);
    throw new Error(error.response?.data?.message || '대출 상품 수정에 실패했습니다.');
  }
};