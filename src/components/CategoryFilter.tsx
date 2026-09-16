import Link from 'next/link';
import { encodeCategoryParam } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <nav className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          !activeCategory
            ? 'bg-blue-600 text-white'
            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`}
      >
        모두 보기
      </Link>

      {categories.map((category) => (
        <Link
          key={category}
          href={`/category/${encodeCategoryParam(category)}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            activeCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
