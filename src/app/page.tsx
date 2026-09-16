import { fetchPublishedPosts } from '@/lib/notion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import type { Post } from '@/lib/types';

// ISR: 1시간마다 캐시 재검증
export const revalidate = 3600;

export const metadata = {
  title: '홈 | Notion CMS 블로그',
  description: '개인 개발 블로그 - 기술과 경험 공유',
};

export default async function HomePage() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    posts = await fetchPublishedPosts();
  } catch (err) {
    error =
      err instanceof Error ? err.message : '글을 불러올 수 없습니다.';
    console.error('글 조회 오류:', err);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 헤더 섹션 */}
          <section className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Notion CMS 블로그
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              개인 개발 블로그입니다. 기술 관련 글과 경험을 공유합니다.
            </p>
          </section>

          {/* 에러 표시 */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">⚠️ {error}</p>
            </div>
          )}

          {/* 글 목록 */}
          <section>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">
                  아직 발행된 글이 없습니다.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                  최근 글 ({posts.length})
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
