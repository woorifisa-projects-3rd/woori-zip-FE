'use server';

import { instance } from "../instance";

export async function getConsumptionData() {
    try {
        const response = await instance('consumption', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // 서버 응답이 없거나 에러인 경우
        if (!response || response.error) {
            throw new Error('데이터를 가져오는데 실패했습니다.');
        }

        return response;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}