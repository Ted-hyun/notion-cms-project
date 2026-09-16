import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPublishedPosts } from '@/lib/notion';
import { decodeCategoryParam, encodeCategoryParam } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { CategoryFilter } from '@/components/CategoryFilter';

// ISR: 1시간마다 캐시 재검증
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const categoryName = decodeCategoryParam(name);

  return {
    title: `${categoryName} | Notion CMS 블로그`,
    description: `${categoryName} 카테고리의 모든 글`,
  };
}

export async function generateStaticParams() {
  const posts = await fetchPublishedPosts();
  const categories = [...new Set(posts.map((post) => post.category))];

  return categories.map((category) => ({
    name: encodeCategoryParam(category),
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const categoryName = decodeCategoryParam(name);

  // 모든 발행된 포스트 조회
  const allPosts = await fetchPublishedPosts();

  // 카테고리별 필터링
  const filteredPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === categoryName.toLowerCase()
  );

  // 카테고리가 없으면 404
  if (filteredPosts.length === 0 && !allPosts.some(p => p.category.toLowerCase() === categoryName.toLowerCase())) {
    notFound();
  }

  // 모든 카테고리 목록
  const categories = [...new Set(allPosts.map((post) => post.category))].sort();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* 페이지 헤더 */}
          <section className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {categoryName}
            </h1>
            <p className="text-slate-600">
              {filteredPosts.length}개의 글
            </p>
          </section>

          {/* 카테고리 필터 */}
          <CategoryFilter
            categories={categories}
            activeCategory={categoryName}
          />

          {/* 글 목록 */}
          <section>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">
                  이 카테고리에 글이 없습니다.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
