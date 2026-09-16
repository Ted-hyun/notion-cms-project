import type { Post } from '@/lib/types';
import { PostCard } from './PostCard';

interface SearchResultProps {
  results: Post[];
  query: string;
}

export function SearchResult({ results, query }: SearchResultProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-slate-600 mb-2">
          "{query}"에 대한 검색 결과가 없습니다.
        </p>
        <p className="text-sm text-slate-500">
          다른 검색어로 다시 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-slate-600 mb-6">
        "{query}"에 대한 검색 결과: <span className="font-bold">{results.length}</span>개
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {results.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
