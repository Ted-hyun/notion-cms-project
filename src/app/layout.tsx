import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Notion CMS 블로그',
  description: 'Notion을 CMS로 활용한 개인 개발 블로그',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://example.com',
    siteName: 'Notion CMS 블로그',
  },
  authors: [
    {
      name: 'Developer',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-slate-900">
        <div className="flex flex-col min-h-screen">{children}</div>
      </body>
    </html>
  );
}
