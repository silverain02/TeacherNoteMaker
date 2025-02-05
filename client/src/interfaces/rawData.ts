//gcp nlp api에서 전달받은 raw데이터의 타입을 정의합니다
// src/interfaces/rawData.ts

export interface RawData {
  tokens: RawTokens;
}

export interface RawTokens {
  sentences: RawSentence[];
  tokens: RawToken[];
  language: string;
}

export interface RawSentence {
  text: RawText;
  sentiment: null;
}

export interface RawToken {
  text: RawText;
  partOfSpeech: RawPartOfSpeech;
  dependencyEdge: RawDependencyEdge;
  lemma: string;
}

export interface RawText {
  content: string;
  beginOffset: number;
}

export interface RawPartOfSpeech {
  tag: string;
  aspect: string;
  case: string;
  form: string;
  gender: string;
  mood: string;
  number: string;
  person: string;
  proper: string;
  reciprocity: string;
  tense: string;
  voice: string;
}

export interface RawDependencyEdge {
  headTokenIndex: number;
  label: string;
}
