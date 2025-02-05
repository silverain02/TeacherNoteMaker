export const INPUT_CONDITION_DATA = {
  MAX_LENGTH: 1000,
  MIN_LENGTH: 3,
  REGEX: /^[A-Za-z0-9\s.,'’“”";:!?_\p{Pd}]+$/u, // 영어, 숫자, 특수문자 포함
};

export const INPUT_TEXT_DATA = {
  LABEL: "구문 분석기",
  ERROR_TEXT: {
    EMPTY: "지문을 입력해주세요",
    MAX_LENGTH: `${INPUT_CONDITION_DATA.MAX_LENGTH}자 이내로 입력해주세요`,
    MIN_LENGTH: `${INPUT_CONDITION_DATA.MIN_LENGTH}자 이상 입력해주세요`,
    ENGLISH_ONLY: "영어, 숫자, 특수문자만 입력해주세요",
  },
  PLACEHOLDER: "분석할 영어지문을 입력해보세요",
};