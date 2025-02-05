# TeacherNoteMaker (TNM)

## 📌 프로젝트 개요
- (개인 사이드 프로젝트) 영어지문 분석 서비스 
- 프로젝트 기간 : 2025.02.02 ~ (진행 중)
### 기술 스택
- React, typescript
- jest
- Chakra UI
- tanstack react-query
- react-form-hook

## 📌 기능 명세서
## 📑 기능 명세
### feat3_inputSentences
1. 지문 입력받기 ✅
   1. validation: 영어로만 이루어진 3~1000단어 ✅
   2. 제출 버튼을 클릭하면 타당성 검사를 실행하고 실패하면 errorText를 보여주고 성공하면 구조분석 API를 호출한다 ✅
2. 지문에 대한 구조분석 데이터를 받는다 ✅
   1. API호출 과정에서 로딩 화면을 보여준다 ✅

### feat4_analyzeSyntax
3. 구조분석 데이터를 정제한다
   1. 문장의 형식 파악 (1~5형식)
   2. 문장의 절 구조 파악 (주절, 종속절 구분)
   3. 절단위 문장성분 분석
   4. 직독직해 해석 
