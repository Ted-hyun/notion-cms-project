// 유틸리티 함수 모음

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PageBlock } from './types';

// Tailwind CSS 클래스 병합
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// 날짜 포맷팅 (한국어)
export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  try {
    const date = new Date(iso);
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };
    return date.toLocaleDateString('ko-KR', defaultOptions);
  } catch {
    return iso;
  }
}

// 텍스트 자르기 (미리보기용)
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// 카테고리 파라미터 인코딩
export function encodeCategoryParam(category: string): string {
  return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'));
}

// 카테고리 파라미터 디코딩
export function decodeCategoryParam(param: string): string {
  return decodeURIComponent(param)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 카테고리별 색상 매핑
export function getCategoryColor(category: string): {
  bg: string;
  text: string;
} {
  const colorMap: Record<string, { bg: string; text: string }> = {
    react: { bg: 'bg-blue-100', text: 'text-blue-800' },
    'next.js': { bg: 'bg-black', text: 'text-white' },
    typescript: { bg: 'bg-blue-500', text: 'text-white' },
    javascript: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    python: { bg: 'bg-blue-700', text: 'text-white' },
    웹개발: { bg: 'bg-purple-100', text: 'text-purple-800' },
    백엔드: { bg: 'bg-green-100', text: 'text-green-800' },
    프론트엔드: { bg: 'bg-pink-100', text: 'text-pink-800' },
    devops: { bg: 'bg-orange-100', text: 'text-orange-800' },
    database: { bg: 'bg-gray-100', text: 'text-gray-800' },
  };

  const key = category.toLowerCase();
  return (
    colorMap[key] || { bg: 'bg-slate-100', text: 'text-slate-800' }
  );
}

// 블록에서 텍스트 추출 (읽기시간 계산용)
function extractTextFromBlock(block: PageBlock): string {
  let text = '';

  if ('paragraph' in block && block.type === 'paragraph') {
    const paragraph = block as any;
    text = paragraph.paragraph?.rich_text
      ?.map((rt: any) => rt.plain_text)
      .join('') || '';
  } else if ('heading_1' in block && block.type === 'heading_1') {
    const heading = block as any;
    text = heading.heading_1?.rich_text
      ?.map((rt: any) => rt.plain_text)
      .join('') || '';
  } else if ('heading_2' in block && block.type === 'heading_2') {
    const heading = block as any;
    text = heading.heading_2?.rich_text
      ?.map((rt: any) => rt.plain_text)
      .join('') || '';
  } else if ('heading_3' in block && block.type === 'heading_3') {
    const heading = block as any;
    text = heading.heading_3?.rich_text
      ?.map((rt: any) => rt.plain_text)
      .join('') || '';
  } else if ('bulleted_list_item' in block && block.type === 'bulleted_list_item') {
    const item = block as any;
    text = item.bulleted_list_item?.rich_text
      ?.map((rt: any) => rt.plain_text)
      .join('') || '';
  } else if ('numbered_list_item' in block && block.type === 'numbered_list_item') {
    const item = block as any;
    text = item.numbered_list_item?.rich_text
      ?.map((rt: any) => rt.plain_text)
      .join('') || '';
  } else if ('code' in block && block.type === 'code') {
    const code = block as any;
    text = code.code?.rich_text?.map((rt: any) => rt.plain_text).join('') || '';
  }

  return text;
}

// 읽기시간 추정 (분 단위)
export function estimateReadingTime(blocks: PageBlock[]): number {
  const wordPerMinute = 200; // 평균 읽기 속도

  let totalWords = 0;

  function countWords(block: PageBlock) {
    const text = extractTextFromBlock(block);
    const words = text.split(/\s+/).filter((word) => word.length > 0).length;
    totalWords += words;

    // 자식 블록도 재귀적으로 처리
    if ('children' in block && Array.isArray(block.children)) {
      block.children.forEach(countWords);
    }
  }

  blocks.forEach(countWords);

  return Math.max(1, Math.ceil(totalWords / wordPerMinute));
}

// URL 슬러그 생성
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 특수문자 제거
    .replace(/[\s_]+/g, '-') // 공백/언더스코어를 하이픈으로
    .replace(/^-+|-+$/g, ''); // 시작/끝 하이픈 제거
}

// 상대 시간 표시 (예: "3일 전")
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return '방금 전';
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffWeeks < 4) return `${diffWeeks}주 전`;
  if (diffMonths < 12) return `${diffMonths}개월 전`;
  return `${diffYears}년 전`;
}
