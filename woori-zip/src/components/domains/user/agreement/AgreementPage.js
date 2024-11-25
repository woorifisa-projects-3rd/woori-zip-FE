"use client";
import React from 'react';
import { useState } from 'react';
import styles from './AgreementPage.module.css';


export default function Agreement() {
    const [checkboxes, setCheckboxes] = useState({
        all: false,
        required1: false,
        required2: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckboxChange = (event) => {
        const { username, checked } = event.target;
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [username]: checked,
        }));
    };

    const isAllChecked = Object.values(checkboxes).every(Boolean);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isAllChecked) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/submit-agreement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agreement: 'all_checked' }),
            });

            if (response.ok) {
                alert('약관동의 제출 완료');
            } else {
                alert('약관동의 제출 실패');
            }
        } catch (error) {
            console.error('Error submitting agreement:', error);
            alert('An error occurred while submitting agreement.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <div className={styles.agreementBox}>
                    <p className={styles.title}>약관 동의</p>
                    <div className={styles.agreementItem}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>전체 동의하기</span>
                        </label>
                        <p className={styles.description}>
                            필수항목과 선택항목에 대한 동의를 포함합니다.<br />
                            선택항목에는 동의하지 않으셔도 됩니다.
                        </p>
                    </div>
                    <div className={styles.agreementItemSub}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>개인정보 수집/이용동의</span>
                        </label>
                        <div>
                            <div className={styles.lsc}>
                                <p className={styles.descriptionSub}>
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                </p>
                            </div>
                        </div>
                        <button className={styles.detailButton}>자세히</button>
                    </div>
                    <div className={styles.agreementItemSub}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>개인정보 수집/이용동의</span>
                        </label>
                        <div>
                            <div className={styles.lsc}>
                                <p className={styles.descriptionSub}>
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                    저희 서비스는 통계자료에만의 활용목적으로 동의하신 정보들에 대해서 부동산 회사에 제공됩니다. 개인정보 보호법 제 35조, 36조 관련 개인정보 처리사항을 알려드립니다.
                                </p>
                            </div>
                        </div>
                        <button className={styles.detailButton}>자세히</button>
                    </div>

                    <button className={styles.submitButton}>
                        약관 동의하기
                    </button>
                </div>
            </div>
        </div>
    );
}