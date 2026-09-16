'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search } from 'lucide-react';

// 검색 폼 검증 스키마
const searchSchema = z.object({
  q: z
    .string()
    .min(1, '검색어를 입력하세요')
    .min(2, '최소 2글자 이상 입력하세요')
    .max(100, '100글자 이하로 입력하세요'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchBarProps {
  defaultValue?: string;
}

export function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      q: defaultValue,
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const params = new URLSearchParams();
    params.set('q', data.q);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="relative">
        <input
          {...register('q')}
          type="text"
          placeholder="글 제목으로 검색..."
          className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label="검색"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      {errors.q && (
        <p className="mt-2 text-sm text-red-600">{errors.q.message}</p>
      )}
    </form>
  );
}
