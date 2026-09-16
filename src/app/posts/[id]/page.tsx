import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPostById, fetchPageBlocks } from '@/lib/notion';
import { fetchPublishedPosts } from '@/lib/notion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostMeta } from '@/components/PostMeta';
import { PostContent } from '@/components/PostContent';

// ISR: 1시간마다 캐시 재검증
export const revalidate = 3600;

// 동적 메타데이터
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostById(id);

  if (!post) {
    return {
      title: '글을 찾을 수 없습니다',
    };
  }

  return {
    title: `${post.title} | Notion CMS 블로그`,
    description: post.excerpt || post.title,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || post.title,
      publishedTime: post.publishedAt,
      authors: ['Developer'],
      tags: post.tags,
    },
  };
}

// 정적 경로 생성
export async function generateStaticParams() {
  const posts = await fetchPublishedPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 포스트 조회
  const post = await fetchPostById(id);
  if (!post) {
    notFound();
  }

  // 블록 조회
  const blocks = await fetchPageBlocks(id);

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* 메타 정보 */}
          <PostMeta post={post} blocks={blocks} />

          {/* 본문 */}
          <div className="prose prose-slate max-w-none">
            <PostContent blocks={blocks} />
          </div>

          {/* 하단 정보 */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              <p>마지막 수정: {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString('ko-KR') : '정보 없음'}</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
