import type { Metadata } from 'next';
import { fetchPublishedPosts } from '@/lib/notion';
import type { Post } from '@/lib/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { SearchResult } from '@/components/SearchResult';

export const metadata: Metadata = {
  title: '검색 | Notion CMS 블로그',
  description: '블로그에서 글을 검색합니다.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query } = await searchParams;

  let results: Post[] = [];
  if (query && query.trim()) {
    const allPosts = await fetchPublishedPosts();
    // 제목과 태그에서 검색
    results = allPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 페이지 헤더 */}
          <section className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              검색
            </h1>
            <p className="text-slate-600">
              글 제목으로 블로그 글을 검색합니다.
            </p>
          </section>

          {/* 검색 입력 */}
          <SearchBar defaultValue={query} />

          {/* 검색 결과 */}
          {query && query.trim() && (
            <section>
              <SearchResult results={results} query={query} />
            </section>
          )}

          {/* 검색어 입력 안 했을 때 */}
          {!query || !query.trim() ? (
            <section className="text-center py-12">
              <p className="text-slate-600">
                위의 검색창에 검색어를 입력하세요.
              </p>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
