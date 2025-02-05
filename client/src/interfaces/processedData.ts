// 문장데이터 전처리 후 타입

export interface ProcessedToken {
  text: string; 
  case: string; // 문장성분 : "S", "V", "O", "C" 등
  pos: string[]; // 품사 : ["N"], ["V"], 혹은 ["N", "clause"]
  subTokens?: ProcessedToken[]; // 절,구 인 경우, 하위 토큰들
}

export interface ProcessedSentence {
  text: string;
  form?: number; // 문장의 형식 : 1(S V),2(S V C),3(S V O),4(S V IO DO),5(S V O OC)
  tokens: ProcessedToken[];
}