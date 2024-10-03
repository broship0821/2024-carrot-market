export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR = "소문자, 대문자, 숫자, 특수문자 포함 필요";
