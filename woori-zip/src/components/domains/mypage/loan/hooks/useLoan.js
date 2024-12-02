'use client';

import { useState, useEffect } from "react";
import { fetchRecentlyLoan } from "@/app/api/mypage/RecentlyLoanListAPI";

export const useLoan = () => {
    const [loanData, setLoanData] = useState({
        hasNext: false,
        recentlyLoanGoods: [],
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchRecentlyLoan(0);

                console.log("Initial fetchRecentlyLoan response:", data);

                setLoanData(data?.data || {
                    hasNext: false,
                    recentlyLoanGoods: [],
                });
            } catch (err) {
                console.error("Error fetching initial data:", err);
                setError(err.message || "데이터를 불러오는 중 에러가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, []);

    return {
        loanData,
        isLoading,
        error  
    };
}