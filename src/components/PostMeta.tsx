import type { Post, PageBlock } from '@/lib/types';
import {
  formatDate,
  estimateReadingTime,
  formatRelativeTime,
} from '@/lib/utils';
import { CategoryBadge } from './CategoryBadge';
import { TagBadge } from './TagBadge';
import { Calendar, Clock } from 'lucide-react';

interface PostMetaProps {
  post: Post;
  blocks?: PageBlock[];
}

export function PostMeta({ post, blocks = [] }: PostMetaProps) {
  const readingTime = estimateReadingTime(blocks);
  const publishedDate = new Date(post.publishedAt);

  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 mb-8">
      {/* 상단: 카테고리 및 상태 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <CategoryBadge category={post.category} />
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 font-medium">
          {post.status}
        </span>
      </div>

      {/* 제목 */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        {post.title}
      </h1>

      {/* 메타 정보: 날짜, 읽기 시간 */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{readingTime}분</span>
        </div>
      </div>

      {/* 태그 */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
