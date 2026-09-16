import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/types';
import { formatDate, truncateText } from '@/lib/utils';
import { CategoryBadge } from './CategoryBadge';
import { TagBadge } from './TagBadge';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group h-full border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      <div className="flex flex-col h-full">
        {/* 카테고리 */}
        <div className="mb-3">
          <CategoryBadge category={post.category} />
        </div>

        {/* 제목 */}
        <Link href={`/posts/${post.id}`}>
          <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* 미리보기 텍스트 */}
        {post.excerpt && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
            {truncateText(post.excerpt, 150)}
          </p>
        )}

        {/* 태그 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-slate-500">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 하단: 날짜 및 링크 */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <time
            dateTime={post.publishedAt}
            className="text-xs text-slate-500"
          >
            {formatDate(post.publishedAt)}
          </time>

          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center text-sm text-blue-600 font-medium group-hover:gap-2 transition-all"
          >
            더 보기
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
