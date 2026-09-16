export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* 블로그 정보 */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">블로그</h3>
            <p className="text-sm text-slate-600">
              개인 개발 블로그입니다. 기술과 경험을 공유합니다.
            </p>
          </div>

          {/* 카테고리 링크 */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">카테고리</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-slate-600 hover:text-slate-900 transition"
                >
                  모든 글
                </a>
              </li>
            </ul>
          </div>

          {/* 소셜 링크 */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">연결</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 transition"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Notion CMS 블로그. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
