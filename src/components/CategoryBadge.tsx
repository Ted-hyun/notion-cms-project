import { getCategoryColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  if (!category) return null;

  const { bg, text } = getCategoryColor(category);

  return (
    <span
      className={cn(
        'inline-flex px-3 py-1 rounded-full text-xs font-medium',
        bg,
        text
      )}
    >
      {category}
    </span>
  );
}
