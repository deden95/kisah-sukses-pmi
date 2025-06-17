"use client";

import { useCategories } from "@/hooks/use-categories";
import { CategoryHomeIcon } from "@/icons/categories";

interface CategoryTableCellProps {
  categoryId: string;
}

export const CategoryTableCell = ({ categoryId }: CategoryTableCellProps) => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="flex space-x-2">
        <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
      </div>
    );
  }

  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="flex space-x-2">
        <span className="text-gray-400 text-sm">No Category</span>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <div className="max-w-[500px] justify-start truncate font-medium">
        <span className="inline-flex items-center rounded-full border border-gray-400 px-3 py-1 text-sm text-gray-500">
          <CategoryHomeIcon className="mr-1 h-4 w-4" />
          {category.title}
        </span>
      </div>
    </div>
  );
};

