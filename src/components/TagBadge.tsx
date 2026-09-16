interface TagBadgeProps {
  tag: string;
}

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="inline-flex px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition cursor-pointer">
      #{tag}
    </span>
  );
}
