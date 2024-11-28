'use server';

import { instance } from "../instance";

export async function getConsumptionData() {
    try {
        const response = await instance('consumption', {
            method: 'GET'
        });
        return JSON.parse(JSON.stringify(response));
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}