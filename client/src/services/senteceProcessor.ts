import { ProcessedSentence,ProcessedToken } from '@/interfaces/processedData';
import { RawData,RawToken } from '@/interfaces/rawData';

/* ------------------- Helper Functions ------------------- */

/**
 * 의존성 라벨에 따른 문장 성분(case) 매핑 함수
 */
export const mapDependencyToCase = (depLabel: string): string => {
  switch (depLabel) {
    case "NSUBJ": //명사구 주어
    case "NSUBJPASS": //명사구 주어(수동태)
    case "CSUBJ": //명사절 주어
    case "CSUBJPASS": //명사절 주어(수동태)
      return "S";
    case "ROOT":
    case "CCOMP": //종속절 동사
      return "V'";
    case "ADVCL": //부사절 동사
      return "V'";
    case "ACOMP": //주격, 목적격 보어
    case "ATTR":
      return "C";
    case "DOBJ":
      return "DO";
    case "IOBJ":
      return "IO";
    default:
      return "adj";
  }
};

/**
 * 품사 태그를 단순화하는 함수 (예: PRON, NOUN → "N", VERB → "V")
 */
export const mapPOSToSimple = (posTag: string): string[] => {
  if (posTag === "PRON" || posTag === "NOUN") {
    return ["N"];
  } else if (posTag === "VERB") {
    return ["V"];
  }
  return []; // 필요시 추가 매핑 가능
};

/**
 * 전체 토큰 배열에서 특정 문장에 해당하는 토큰들을 필터링하는 함수
 * @param allTokens 전체 토큰 배열
 * @param sentenceStart 문장의 시작 offset
 * @param sentenceEnd 다음 문장의 시작 offset (마지막 문장은 Infinity)
 */
export const filterTokensForSentence = (
  allTokens: RawToken[],
  sentenceStart: number,
  sentenceEnd: number
): RawToken[] => {
  return allTokens.filter(
    (token: RawToken) =>
      token.text.beginOffset >= sentenceStart &&
      token.text.beginOffset < sentenceEnd
  );
};

/**
 * 한 문장 내의 토큰들을 처리하여 목표 형식의 ProcessedToken 배열로 변환하는 함수
 */
export const processSentenceTokens = (
  sentenceTokens: RawToken[]
): ProcessedToken[] => {
  const processedTokens: ProcessedToken[] = [];

  // 토큰 리스트 순환하며 정보 매핑
  sentenceTokens.forEach((token) => {
    const tokenText: string = token.text.content;

    // 특수문자나 숫자로만 이루어진 토큰 무시
    if (/^[\d~@#$!%*?&.,\s-]+$/.test(tokenText)) {
      return;
    }
    
    const posTags: string[] = mapPOSToSimple(token.partOfSpeech.tag); //ex. PRON
    const tokenCase: string = mapDependencyToCase(token.dependencyEdge.label); //ex. NOMINATIVE

    processedTokens.push({
      text: tokenText,
      case: tokenCase,
      pos: posTags,
    });
  });

  return processedTokens;
};

/* ------------------- Main Function ------------------- */

/**
 * 여러 문장이 포함된 raw 데이터를 각 문장별로 처리하여 목표 형식의 배열로 변환합니다.
 */
export const transformSyntaxData = (rawData: RawData): ProcessedSentence[] => {
  const sentenceArr = rawData.tokens.sentences;
  const allTokens = rawData.tokens.tokens;
  const processedSentences: ProcessedSentence[] = [];

  //문장 리스트 순환
  sentenceArr.forEach((sentenceObj, i) => {
    // 문장의 시작과 끝 설정
    const sentenceText: string = sentenceObj.text.content;
    const sentenceStart: number = sentenceObj.text.beginOffset;
    const sentenceEnd: number =
      i < sentenceArr.length - 1
        ? sentenceArr[i + 1].text.beginOffset
        : Infinity;

    // 해당 문장에 속하는 토큰들을 필터링
    const sentenceTokens = filterTokensForSentence(
      allTokens,
      sentenceStart,
      sentenceEnd
    );

    // 문장 토큰들을 처리
    const processedTokens = processSentenceTokens(sentenceTokens);

    processedSentences.push({
      text: sentenceText,
      form: 0, //문장의 형식 (구현예정)
      tokens: processedTokens,
    });
  });

  return processedSentences;
};