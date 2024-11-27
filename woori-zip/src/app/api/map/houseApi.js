'use server'

import { instance } from "../instance";


// 주택 목록 요청
export const fetchHouseList = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  return await instance(`houses?${params}`, {
    method: 'GET',
    credentials: 'include'
  });
};

// 특정 주택 상세정보 요청
export const fetchHouseDetails = async (propertyId) => {
  return await instance(`houses/${propertyId}`, {
    method: 'GET',
    credentials: 'include',
  });
};

// 북마크 추가 요청
export const addBookmark = async (propertyId) => {
  return await instance(`houses/${propertyId}/bookmark`, {
    method: 'POST',
    credentials: 'include',
  });
};


// 북마크 삭제 요청
export const deleteBookmark = async (propertyId) => {
  return await instance(`houses/${propertyId}/bookmark`, {
    method: 'DELETE',
    credentials: 'include',
  });
};
