"use client";

import React, { useState } from 'react';
import { useSearchParams } from "next/navigation";
import styles from './Register.module.css';
import { validatePassword, confirmPassword, validatAdminNum, validateName, validateEmail, validateDateOfBirth } from '../login/validation';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [adminNum, setAdminNum] = useState('');
  const [selectedGender, setSelectedGender] = useState("");
  const [errors, setErrors] = useState({});

  const searchParams = useSearchParams();
  const role = searchParams.get('role') || "0";

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(e.target.value),
    }));
  };

  const handleRePasswordChange = (e) => {
    const newRePassword = e.target.value;
    setRePassword(newRePassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      rePassword: confirmPassword(password, newRePassword),
    }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsAvailable(null);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(e.target.value),
    }));
  };

  const handleAdminNum = (e) => {
    setAdminNum(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      adminNum: validatAdminNum(e.target.value),
    }));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: validateName(e.target.value),
    }));
  };

  const handleDateOfBirthChange = (e) => {
    setBirthday(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      birthday: validateDateOfBirth(e.target.value),
    }));
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };


  // 이메일 중복 확인 요청 함수
  const checkEmailAvailability = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/member?username=${username}`);
      const data = await response.json();
      setIsAvailable(data.isSuccess);
      if (data.isSuccess) {
        alert("사용 가능한 이메일입니다.");
      } else {
        alert("이미 사용 중인 이메일입니다.");
      }
    } catch (error) {
      console.error("이메일 중복 확인 중 오류 발생:", error);
    }
  };

  //제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const validationErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
      name: validateName(name),
      adminNum: validatAdminNum(adminNum),
      birthday: validateDateOfBirth(birthday),
    };

    // 유효성 검사 오류가 없으면 제출
    if (Object.values(validationErrors).every((error) => !error)) {
      console.log("모든 항목 에러 없이 작성 완료");

      try {
        const response = await fetch('/api/member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            name,
            adminNum,
            birthday,
            selectedGender
          }),
        });

        if (response.ok) {
          router.push('/user/login');
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData);
        }
      } catch (error) {
        console.error('An error occurred:', error); //질문 하기) 처리 해줘야 하나??
      }
    } else {
      setErrors(validationErrors);
      //alert("모든 항목을 입력해주세요");
    }
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        <div className={styles.container}>
          {role === '0' ? <div className={styles.loginContent}>
            <img
              className={styles.image}
              src="https://fisa-woorizip.s3.ap-northeast-2.amazonaws.com/images/user/bankLogo.png"
              alt="Logo"
              width={110}
              height={30}
            />
            <p className={styles.text}>
              금융 데이터 분석을 위해
              <br />
              우리은행 데이터와 간편 연결하기
            </p>
            <button className={styles.loginButton}>우리은행으로 로그인</button>
          </div>:
          <form className={styles.form} onSubmit={handleSubmit}>
          {/* 아이디 입력 */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>이메일</label>
            <div className={styles.flexRow}>
              <input
                type="text"
                placeholder="이메일 입력"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.checkButton}
                onClick={checkEmailAvailability}
              >
                중복 확인
              </button>
            </div>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>비밀번호</label>
            <input
              type="password"
              placeholder="8자리 이상 대소문자, 숫자, 기호 포함"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={rePassword}
              onChange={handleRePasswordChange}
              className={styles.input}
            />
            {errors.rePassword && <p className={styles.error}>{errors.rePassword}</p>}
          </div>

          {/* 중개업자 입력 */}
          {role === '1' && <div className={styles.inputGroup}>
            <label className={styles.label}>중개업자 번호</label>
            <input
              type="text"
              placeholder="중개업자 번호"
              value={adminNum}
              onChange={handleAdminNum}
              className={styles.input}
            />
            {errors.adminNum && <p className={styles.error}>{errors.adminNum}</p>}
          </div>}

          {/* 이름 입력 */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>이름</label>
            <input
              type="text"
              placeholder="이름 입력 (ex. 홍길동)"
              value={name}
              onChange={handleNameChange}
              className={styles.input}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>


          {/* 생년월일 입력 */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>생년월일</label>
            <input
              type="date"
              placeholder="생년월일 입력 (ex. YYYY-MM-DD)"
              value={birthday}
              onChange={handleDateOfBirthChange}
              className={styles.input}
            />
            {errors.birthday && <p className={styles.error}>{errors.birthday}</p>}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.genderSelectContainer}>
              <label className={styles.label}>성별</label>
              <div className={styles.buttonContainer}>
                <button
                  className={`${styles.genderButton} ${selectedGender === "남자" ? styles.active : ""
                    }`}
                >
                  남자
                </button>
                <button
                  className={`${styles.genderButton} ${selectedGender === "여자" ? styles.active : ""
                    }`}
                >
                  여자
                </button>
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isAvailable}
          >
            가입하기
          </button>
        </form>}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
