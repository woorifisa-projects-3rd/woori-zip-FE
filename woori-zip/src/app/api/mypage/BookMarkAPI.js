'use client';

const BASE_URL = 'http://localhost:8080';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NCwibWVtYmVyUm9sZSI6Ik1FTUJFUiIsImlzcyI6Indvb3JpemlwIiwiaWF0IjoxNzMyMzcxOTU4LCJleHAiOjE3MzIzNzU1NTh9.5b0AIPKuNjwFLA_FcoOmt7DMGIEFYB0qWhnSukAKJ24';

if (typeof window !== 'undefined') {
  localStorage.setItem('token', TOKEN);
}

const getToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }
  return token;
};

const fetchWithToken = async (url, options = {}) => {
  const token = getToken();
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('로그인이 만료되었습니다.');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '요청 처리 중 오류가 발생했습니다.');
    }

    return response;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

export const fetchBookmarks = async (page = 0, size = 8) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/api/v1/bookmarks?page=${page}&size=${size}`);
    const data = await response.json();
    console.log('Fetched bookmarks data:', data);
    return data;
  } catch (error) {
    console.error('북마크 조회 에러:', error);
    throw error;
  }
};

export const removeBookmark = async (houseId) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/api/v1/houses/${houseId}/bookmark`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('북마크 삭제 에러:', error);
    throw error;
  }
};