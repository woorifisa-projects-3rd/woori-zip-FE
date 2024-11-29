export const validatePassword = (pass) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]|.*\d|.*\W)|(?=.*[A-Z])(?=.*\d|.*\W)|(?=.*\d)(?=.*\W|.*[a-z]).{8,}$/;
  return passwordRegex.test(pass) && pass.length >= 8
    ? ''
    : '비밀번호는 8자 이상이며, 대문자, 소문자, 숫자와 기호를 최소 2개 이상 포함해야 합니다.';
};

export const confirmPassword = (pass, confirmPass) => {
  const validationMessage = validatePassword(pass);

  if (validationMessage) {
    return validationMessage;
  }

  return pass === confirmPass
    ? ''
    : '비밀번호가 일치하지 않습니다. 다시 확인해 주세요.';
};

export const validateName = (name) => {
  const usernameRegex = /^[a-zA-Z가-힣]+$/;
  return usernameRegex.test(name)
    ? ''
    : '영문 또는 한글만 포함해야 합니다.';
};

export const validatePhoneNum = (phoneNum) => {
  const phoneNumberRegex = /^01[0-9]-\d{4}-\d{4}$/;
  return phoneNumberRegex.test(phoneNum)
    ? ''
    : '전화번호는 010-1234-5678 형식으로 입력해야 합니다.';
};

export const validateDateOfBirth = (birthday) => {
  const birthdayRegex = /^(19[0-9]{2}|20[0-2][0-5])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return birthdayRegex.test(birthday)
    ? ''
    : '생년월일은 2000-01-01 형식이어야 합니다.';
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email)
  ? ''
  : '이메일은 형식이어야 합니다.  ex)woorizip@woorizip.com';
}

export const validatAdminNum = (adminNum) => {
  const adminNumRegx = /^[0-9가-힣\s]+$/;
  return adminNumRegx.test(adminNum)
  ? ''
  : '중개업자 번호 형식이어야 합니다.'
}