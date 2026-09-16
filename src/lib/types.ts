// Notion API 관련 타입 정의

import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

// 블로그 포스트 상태
export type PostStatus = '초안' | '발행됨';

// 블로그 포스트 인터페이스
export interface Post {
  id: string;
  title: string;
  category: string;
  tags: string[];
  publishedAt: string; // ISO 8601 형식
  status: PostStatus;
  excerpt?: string;
  coverImageUrl?: string;
  updatedAt?: string;
}

// Notion 페이지 블록 (재귀적으로 자식 블록 포함 가능)
export type PageBlock = (BlockObjectResponse | PartialBlockObjectResponse) & {
  children?: PageBlock[];
};

// 앱 에러 인터페이스
export interface AppError {
  code:
    | 'NOTION_API_ERROR'
    | 'NOT_FOUND'
    | 'VALIDATION_ERROR'
    | 'INVALID_CONFIG'
    | 'UNKNOWN';
  message: string;
  originalError?: Error;
}

// API 결과 유형 (성공 또는 실패)
export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: AppError };

