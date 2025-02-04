import express, { Request, Response } from "express";
import { LanguageServiceClient } from "@google-cloud/language";
import cors from 'cors';

const app = express();
const port = 8008;

// JSON body 파싱을 위해 express.json() 사용
app.use(express.json());

app.use(cors({
  origin:true
}))

// Google Cloud Language 클라이언트 생성 (인증 정보는 환경 변수나 서비스 계정 JSON 파일을 사용)
const client = new LanguageServiceClient({});
const encodingType = 'UTF8' as const;

/**
 * 주어진 텍스트의 구문 분석을 수행하는 함수
 * @param text 분석할 텍스트
 * @returns 토큰 목록 (텍스트와 품사 정보 포함)
 */
async function analyzeTextSyntax(text: string) {
  // 분석할 문서 객체 생성
  const document = {
    content: text,
    type: 'PLAIN_TEXT' as const,
  };

  try {
    // 구문 분석 요청: analyzeSyntax 메서드 호출
    const [syntax] = await client.analyzeSyntax({ document, encodingType });

    // 토큰 목록을 간단한 객체 배열로 가공
    const tokens = syntax.tokens?.map(token => ({
      text: token.text?.content,
      partOfSpeech: token.partOfSpeech?.tag
    }));

    return tokens;
  } catch (error) {
    console.error('Error analyzing syntax:', error);
    throw error;
  }
}

/**
 * POST /api/analyze-syntax
 * 요청 본문에 { "text": "분석할 텍스트" } 형태로 데이터를 보내면 구문 분석 결과를 반환
 */
app.post('/api/analyze-syntax', async (req: Request, res: Response): Promise<void>  => {
  const { text } = req.body;

  try {
    const tokens = await analyzeTextSyntax(text);
    res.json({ tokens });
  } catch (error) {
    res.status(500).json({ error: '구문 분석 중 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
