import type { PageBlock } from '@/lib/types';
import { NotionBlock } from './NotionBlock';

interface PostContentProps {
  blocks: PageBlock[];
}

export function PostContent({ blocks }: PostContentProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-slate-500 text-center py-8">
        콘텐츠가 없습니다.
      </div>
    );
  }

  return (
    <div className="prose prose-slate max-w-none">
      {blocks.map((block) => {
        // 블록 타입에 따라 특별 처리
        if ((block as any).type === 'bulleted_list_item') {
          // 리스트 아이템들을 그룹화
          return (
            <NotionBlock
              key={(block as any).id}
              block={block}
            />
          );
        }

        return (
          <NotionBlock
            key={(block as any).id}
            block={block}
          />
        );
      })}
    </div>
  );
}
