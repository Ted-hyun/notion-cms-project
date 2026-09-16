// Notion API 클라이언트 및 데이터 조회 함수

import { Client, isFullPage, isFullBlock } from '@notionhq/client';
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { getEnv } from './env';
import type {
  Post,
  PostStatus,
  PageBlock,
  AppError,
  ApiResult,
} from './types';

let notionClient: Client | null = null;

// Notion 클라이언트 초기화 (싱글톤)
export function getNotionClient(): Client {
  if (!notionClient) {
    const { notionToken } = getEnv();
    notionClient = new Client({ auth: notionToken });
  }
  return notionClient;
}

// 재시도 로직이 있는 함수 래퍼 (지수 백오프)
async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;

    const isRetryable =
      error instanceof Error &&
      (error.message.includes('429') ||
        error.message.includes('500') ||
        error.message.includes('503'));

    if (!isRetryable) throw error;

    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return withRetry(fn, retries - 1, delayMs * 2);
  }
}

// Notion 페이지에서 텍스트 추출
function extractTextFromRichText(richTexts: RichTextItemResponse[]): string {
  return richTexts.map((text) => text.plain_text).join('');
}

// 페이지 속성에서 제목 추출
function getTitle(page: PageObjectResponse): string {
  const titleProperty = page.properties['Title'];

  if (!titleProperty || titleProperty.type !== 'title') {
    throw new Error('Title 속성을 찾을 수 없습니다');
  }

  return extractTextFromRichText(titleProperty.title);
}

// 페이지 속성에서 카테고리 추출
function getCategory(page: PageObjectResponse): string {
  const categoryProperty = page.properties['Category'];

  if (!categoryProperty || categoryProperty.type !== 'select') {
    return '';
  }

  return categoryProperty.select?.name || '';
}

// 페이지 속성에서 태그 추출
function getTags(page: PageObjectResponse): string[] {
  const tagsProperty = page.properties['Tags'];

  if (!tagsProperty || tagsProperty.type !== 'multi_select') {
    return [];
  }

  return tagsProperty.multi_select.map((tag) => tag.name);
}

// 페이지 속성에서 발행일 추출
function getPublishedDate(page: PageObjectResponse): string {
  const publishedProperty = page.properties['Published'];

  if (!publishedProperty || publishedProperty.type !== 'date') {
    return new Date().toISOString();
  }

  return publishedProperty.date?.start || new Date().toISOString();
}

// 페이지 속성에서 상태 추출
function getStatus(page: PageObjectResponse): PostStatus {
  const statusProperty = page.properties['Status'];

  if (!statusProperty || statusProperty.type !== 'select') {
    return '초안';
  }

  const status = statusProperty.select?.name as PostStatus | undefined;
  return status || '초안';
}

// 발행된 모든 포스트 조회
export async function fetchPublishedPosts(): Promise<Post[]> {
  try {
    const { notionDatabaseId } = getEnv();
    const client = getNotionClient();

    const response = await withRetry(async () =>
      client.databases.query({
        database_id: notionDatabaseId,
        filter: {
          property: 'Status',
          select: {
            equals: '발행됨',
          },
        },
        sorts: [
          {
            property: 'Published',
            direction: 'descending',
          },
        ],
        page_size: 100,
      })
    );

    const posts: Post[] = [];

    for (const page of response.results) {
      if (!isFullPage(page)) continue;

      try {
        posts.push({
          id: page.id,
          title: getTitle(page),
          category: getCategory(page),
          tags: getTags(page),
          publishedAt: getPublishedDate(page),
          status: getStatus(page),
        });
      } catch (error) {
        console.warn(`포스트 파싱 오류 (ID: ${page.id}):`, error);
      }
    }

    return posts;
  } catch (error) {
    console.error('발행된 포스트 조회 실패:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Notion API 조회 실패'
    );
  }
}

// 특정 포스트 조회
export async function fetchPostById(pageId: string): Promise<Post | null> {
  try {
    const client = getNotionClient();

    const page = await withRetry(() =>
      client.pages.retrieve({
        page_id: pageId,
      })
    );

    if (!isFullPage(page)) {
      console.warn(`부분 페이지 반환됨 (ID: ${pageId})`);
      return null;
    }

    return {
      id: page.id,
      title: getTitle(page),
      category: getCategory(page),
      tags: getTags(page),
      publishedAt: getPublishedDate(page),
      status: getStatus(page),
    };
  } catch (error) {
    console.error(`포스트 조회 실패 (ID: ${pageId}):`, error);
    return null;
  }
}

// 페이지 블록 재귀적으로 조회 (자식 블록 포함)
export async function fetchPageBlocks(
  blockId: string,
  maxDepth: number = 5,
  currentDepth: number = 0
): Promise<PageBlock[]> {
  if (currentDepth >= maxDepth) {
    console.warn(`블록 깊이 제한 도달 (ID: ${blockId})`);
    return [];
  }

  try {
    const client = getNotionClient();
    const blocks: PageBlock[] = [];
    let cursor: string | undefined;

    while (true) {
      const response = await withRetry(() =>
        client.blocks.children.list({
          block_id: blockId,
          page_size: 100,
          start_cursor: cursor,
        })
      );

      for (const block of response.results) {
        const fullBlock = isFullBlock(block)
          ? block
          : (block as BlockObjectResponse | PartialBlockObjectResponse);

        // 자식 블록이 있는 경우 재귀적으로 조회
        if ('has_children' in fullBlock && fullBlock.has_children && isFullBlock(block)) {
          const children = await fetchPageBlocks(
            block.id,
            maxDepth,
            currentDepth + 1
          );
          blocks.push({
            ...block,
            children,
          } as PageBlock);
        } else {
          blocks.push(fullBlock as PageBlock);
        }
      }

      if (!response.has_more) break;
      cursor = response.next_cursor ?? undefined;
    }

    return blocks;
  } catch (error) {
    console.error(`페이지 블록 조회 실패 (ID: ${blockId}):`, error);
    return [];
  }
}

// 에러를 AppError로 정규화
export function normalizeError(error: unknown): AppError {
  if (error instanceof Error) {
    let code: AppError['code'] = 'UNKNOWN';

    if (error.message.includes('429')) {
      code = 'NOTION_API_ERROR';
    } else if (error.message.includes('404')) {
      code = 'NOT_FOUND';
    } else if (error.message.includes('validation')) {
      code = 'VALIDATION_ERROR';
    } else if (error.message.includes('환경 변수')) {
      code = 'INVALID_CONFIG';
    }

    return {
      code,
      message: error.message,
      originalError: error,
    };
  }

  return {
    code: 'UNKNOWN',
    message: '알 수 없는 오류가 발생했습니다',
  };
}
