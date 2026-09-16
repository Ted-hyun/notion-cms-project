import type { MetadataRoute } from 'next';
import { fetchPublishedPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com'; // 실제 도메인으로 변경 필요

  try {
    const posts = await fetchPublishedPosts();

    // 포스트 페이지
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.id}`,
      lastModified: post.updatedAt
        ? new Date(post.updatedAt)
        : new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // 카테고리 페이지
    const categories = [...new Set(posts.map((post) => post.category))];
    const categoryEntries: MetadataRoute.Sitemap = categories.map(
      (category) => ({
        url: `${baseUrl}/category/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })
    );

    return [
      // 홈페이지
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      // 검색 페이지
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      },
      // 포스트 페이지
      ...postEntries,
      // 카테고리 페이지
      ...categoryEntries,
    ];
  } catch (error) {
    console.error('Sitemap 생성 중 오류:', error);
    return [
      {
        url: 'https://example.com',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
    ];
  }
}
