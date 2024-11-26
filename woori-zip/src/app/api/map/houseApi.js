const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 주택 목록 요청
export const fetchHouseList = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const url = `${BASE_URL}/houses?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("주택 목록 데이터 로드 실패");
    return await response.json();
  } catch (error) {
    console.error("주택 목록 요청 오류:", error);
    throw error;
  }
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
  try {
    console.log("추가 되었습니다.")
    const response = await fetch(`${BASE_URL}/bookmark/${propertyId}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("북마크 추가 실패");
    return await response.json();
  } catch (error) {
    console.error("북마크 추가 요청 오류:", error);
    throw error;
  }
};

// 북마크 삭제 요청
export const deleteBookmark = async (propertyId) => {
  try {
    const response = await fetch(`${BASE_URL}/bookmark/delete/${propertyId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("북마크 삭제 실패");
    return await response.json();
  } catch (error) {
    console.error("북마크 삭제 요청 오류:", error);
    throw error;
  }
};
