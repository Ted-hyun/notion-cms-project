// 환경 변수 타입 안전 접근 모듈

interface EnvConfig {
  notionToken: string;
  notionDatabaseId: string;
}

export function getEnv() {
  const notionToken = process.env.NOTION_TOKEN;
  const notionDatabaseId = process.env.NOTION_DATABASE_ID;

  if (!notionToken) {
    throw new Error('환경 변수 NOTION_TOKEN이 설정되지 않았습니다.');
  }

  if (!notionDatabaseId) {
    throw new Error('환경 변수 NOTION_DATABASE_ID가 설정되지 않았습니다.');
  }

  return {
    notionToken,
    notionDatabaseId,
  };
}
