import type { PageBlock } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NotionBlockProps {
  block: PageBlock;
}

function extractRichText(richTexts: any[]): string {
  return richTexts.map((text) => text.plain_text).join('');
}

export function NotionBlock({ block }: NotionBlockProps) {
  if (!('type' in block)) {
    return null;
  }

  try {
    switch (block.type) {
      // 단락
      case 'paragraph': {
        const paragraph = (block as any).paragraph;
        const text = extractRichText(paragraph?.rich_text || []);
        return (
          <p className="text-slate-700 leading-relaxed mb-4">{text || ' '}</p>
        );
      }

      // 제목1
      case 'heading_1': {
        const heading = (block as any).heading_1;
        const text = extractRichText(heading?.rich_text || []);
        return (
          <h1 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
            {text}
          </h1>
        );
      }

      // 제목2
      case 'heading_2': {
        const heading = (block as any).heading_2;
        const text = extractRichText(heading?.rich_text || []);
        return (
          <h2 className="text-2xl font-bold text-slate-900 mt-6 mb-3">
            {text}
          </h2>
        );
      }

      // 제목3
      case 'heading_3': {
        const heading = (block as any).heading_3;
        const text = extractRichText(heading?.rich_text || []);
        return (
          <h3 className="text-xl font-bold text-slate-900 mt-4 mb-2">
            {text}
          </h3>
        );
      }

      // 불릿 리스트
      case 'bulleted_list_item': {
        const item = (block as any).bulleted_list_item;
        const text = extractRichText(item?.rich_text || []);
        return (
          <li className="text-slate-700 ml-4 mb-2 list-disc">
            {text}
          </li>
        );
      }

      // 번호 리스트
      case 'numbered_list_item': {
        const item = (block as any).numbered_list_item;
        const text = extractRichText(item?.rich_text || []);
        return (
          <li className="text-slate-700 ml-4 mb-2 list-decimal">
            {text}
          </li>
        );
      }

      // 코드 블록
      case 'code': {
        const code = (block as any).code;
        const text = extractRichText(code?.rich_text || []);
        const language = code?.language || 'text';
        return (
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code className={`language-${language}`}>{text}</code>
          </pre>
        );
      }

      // 인용문
      case 'quote': {
        const quote = (block as any).quote;
        const text = extractRichText(quote?.rich_text || []);
        return (
          <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-4">
            {text}
          </blockquote>
        );
      }

      // 구분선
      case 'divider': {
        return <hr className="my-6 border-slate-200" />;
      }

      // 이미지
      case 'image': {
        const image = (block as any).image;
        const src =
          image?.type === 'external'
            ? image?.external?.url
            : image?.file?.url;
        const caption = extractRichText(image?.caption || []);

        return src ? (
          <figure className="my-6">
            <img
              src={src}
              alt={caption || '이미지'}
              className="rounded-lg max-w-full h-auto"
            />
            {caption && (
              <figcaption className="text-sm text-slate-500 mt-2 text-center">
                {caption}
              </figcaption>
            )}
          </figure>
        ) : null;
      }

      // 토글 (접을 수 있는 섹션)
      case 'toggle': {
        const toggle = (block as any).toggle;
        const text = extractRichText(toggle?.rich_text || []);
        return (
          <details className="my-4 cursor-pointer">
            <summary className="font-semibold text-slate-900 select-none hover:text-slate-700">
              ▶ {text}
            </summary>
            <div className="mt-3 pl-4 border-l-2 border-slate-300">
              {/* 자식 블록은 PostContent에서 렌더링 */}
            </div>
          </details>
        );
      }

      // 기타 미지원 블록
      default: {
        return (
          <div className="text-slate-500 italic mb-4">
            지원하지 않는 블록 타입: {(block as any).type}
          </div>
        );
      }
    }
  } catch (error) {
    console.warn('블록 렌더링 오류:', error);
    return (
      <div className="text-red-500 mb-4">
        블록 렌더링 중 오류가 발생했습니다.
      </div>
    );
  }
}
