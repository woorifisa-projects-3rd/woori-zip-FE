"use client";

import React, { useState } from 'react';
import { useSearchParams } from "next/navigation";
import styles from './Register.module.css';
import { validatePassword, confirmPassword, validateName, validateEmail, validateDateOfBirth, validatLicenseId } from '../login/validation';
import { validEmail, signUp } from "@/app/api/member/memberApi";

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const [gender, setGender] = useState('MALE');
  const [errors, setErrors] = useState({ email: ' ', name: ' ', password: ' ', rePassword: ' ', birthday: ' ', licenseId: ' ' });

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
    setIsAvailable(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(e.target.value),
    }));
  };

  const handleLicenseId = (e) => {
    setLicenseId(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      licenseId: validatLicenseId(e.target.value),
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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // 이메일 중복 확인 요청 함수
  const checkEmailAvailability = async (e) => {
    e.preventDefault();

    if(email === '') alert('이메일을 입력해주세요.');

    const response = await validEmail(email);
    if(response.success) {
      setIsAvailable(true);
      alert("사용할 수 있는 이메일입니다.");
    } else alert("이미 존재하는 이메일입니다.");
  };

  //제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!isAvailable) {
      alert('이메일 중복 확인을 진행해주세요.');
      return;
    }

    if(role === '1') {
      if(errors?.email || errors?.name || errors?.password || errors?.rePassword || errors?.birthday || errors?.licenseId) {
        alert('모든 정보를 입력해주세요.');
        return;
      }
    } else if(role === '2') {
      if(errors?.email || errors?.name || errors?.password || errors?.rePassword || errors?.birthday) {
        alert('모든 정보를 입력해주세요.');
        return;
      }
    }

    const roleName = role === '0' ? 'MEMBER' : role === '1' ? 'AGENT' : 'ADMIN';

    signUp({
      email,
      name,
      password,
      birthday,
      licenseId,
      gender,
      roleName
  })
      .then((response) => {
          if(response.success) {
            window.location.href = `/user/login?role=${role}`
          } else {
            alert("회원가입에 실패하였습니다. 정보를 다시 확인해주세요.");
          }
      });
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
              value={licenseId}
              onChange={handleLicenseId}
              className={styles.input}
            />
            {errors.licenseId && <p className={styles.error}>{errors.licenseId}</p>}
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

          {/* 성별 입력 */}
          <div className={styles.inputGroup}>
          <label className={styles.label}>성별</label>
                <select className={styles.selectGender} onChange={handleGenderChange}>
                  <option value={'MALE'}>남성</option>
                  <option value={'FEMALE'}>여성</option>
                </select>
          </div>

          {/* 제출 버튼 */}
          <button
            type='submit'
            className={styles.signUpButton}
          >
            가입하기
          </button>
        </form>}
        </div>
      </div>
    </div>
  );
}
