"use client";

import React, { useState } from 'react';
import styles from './Register.module.css';
import { validateUsername, validatePassword, confirmPassword, validateName, validatePhoneNum, validateDateOfBirth } from '../login/validation';

function RegisterForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState({});
  


  // 작성한 유효성 로직 검사 핸들러
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsAvailable(null); 
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: validateUsername(e.target.value),
    }));
  };

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
      rePassword: confirmPassword(password,newRePassword),
    }));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: validateName(e.target.value),
    }));
  };

  const handlePhoneNumChange = (e) => {
    setPhoneNum(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNum: validatePhoneNum(e.target.value),
    }));
  };

  const handleDateOfBirthChange = (e) => {
    setBirthday(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      birthday: validateDateOfBirth(e.target.value),
    }));
  };


// 아이디 중복 확인 요청 함수
const checkUsernameAvailability = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/member?username=${username}`);
    const data = await response.json();
    setIsAvailable(data.isSuccess); 
    if (data.isSuccess) {
      alert("사용 가능한 아이디입니다.");
    } else {
      alert("이미 사용 중인 아이디입니다.");
    }
  } catch (error) {
    console.error("아이디 중복 확인 중 오류 발생:", error);
  }
};

  //제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사
    const validationErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
      name: validateName(name),
      phoneNum: validatePhoneNum(phoneNum),
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
            username,
            password,
            name,
            phoneNum,
            birthday,
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
      alert("모든 항목을 입력해주세요");
    }
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>회원정보 입력</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* 아이디 입력 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>아이디</label>
              <div className={styles.flexRow}>
                <input
                  type="text"
                  placeholder="아이디 입력"
                  value={username}
                  onChange={handleUsernameChange}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.checkButton}
                  onClick={checkUsernameAvailability}
                >
                  중복 확인
                </button>
              </div>
              {errors.username && <p className={styles.error}>{errors.username}</p>}
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
              <label className={styles.label}>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={rePassword}
                onChange={handleRePasswordChange}
                className={styles.input}
              />
              {errors.rePassword && <p className={styles.error}>{errors.rePassword}</p>}
            </div>
  
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
  
            {/* 연락처 입력 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>연락처</label>
              <input
                type="text"
                placeholder="연락처 입력 (ex. 010-1234-5678)"
                value={phoneNum}
                onChange={handlePhoneNumChange}
                className={styles.input}
              />
              {errors.phoneNum && <p className={styles.error}>{errors.phoneNum}</p>}
            </div>
  
            {/* 생년월일 입력 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>생년월일</label>
              <input
                type="text"
                placeholder="생년월일 입력 (ex. YYYY-MM-DD)"
                value={birthday}
                onChange={handleDateOfBirthChange}
                className={styles.input}
              />
              {errors.birthday && <p className={styles.error}>{errors.birthday}</p>}
            </div>
  
            {/* 제출 버튼 */}
            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={!isAvailable}
            >
              정보 불러오기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
