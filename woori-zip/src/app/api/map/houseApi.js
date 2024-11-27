'use server'

import { instance } from "../instance";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Bearer Token 설정
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MTEsIm1lbWJlclJvbGUiOiJNRU1CRVIiLCJpc3MiOiJ3b29yaXppcCIsImlhdCI6MTczMjY4MzI0NSwiZXhwIjoxNzMzMDQzMjQ1fQ.icN1Sx0qHtkeXscvVSrhoEjgSEi2i31CpCqgQR3sBos";

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
  try {
    const response = await fetch(`${BASE_URL}/houses/${propertyId}`);
    if (!response.ok) throw new Error("주택 상세정보 로드 실패");
    return await response.json();
  } catch (error) {
    console.error("주택 상세 요청 오류:", error);
    throw error;
  }
};

// 북마크 추가 요청
export const addBookmark = async (propertyId) => {
    const response = await instance(`houses/${propertyId}/bookmark`, {
      credentials: 'include',
      method: 'POST',
    });
};

// 북마크 삭제 요청
export const deleteBookmark = async (propertyId) => {
  try {
    const response = await fetch(`${BASE_URL}/houses/${propertyId}/bookmark`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    // 응답 상태 확인
    if (!response.ok) {
      throw new Error(`북마크 삭제 실패: ${response.statusText}`);
    }

    // JSON 변환 가능 여부 확인
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json(); // JSON 응답
    } else {
      console.warn("JSON 형식이 아닌 응답을 받았습니다.");
      return null; // JSON 이외의 응답 처리
    }
  } catch (error) {
    console.error("북마크 삭제 요청 오류:", error);
    throw error;
  }
};
