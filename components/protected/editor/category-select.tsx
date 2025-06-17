"use client";

import { useCategories } from "@/hooks/use-categories";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryHomeIcon } from "@/icons/categories";
import { useEffect } from "react";

interface CategorySelectProps {
  field: {
    onChange: (value: string) => void;
    value: string;
  };
}

export const CategorySelect = ({ field }: CategorySelectProps) => {
  const { categories, loading } = useCategories();

  // Auto-select first category if no category is selected and categories are loaded
  useEffect(() => {
    if (!loading && categories && categories.length > 0 && !field.value) {
      field.onChange(categories[0].id);
    }
  }, [categories, loading, field]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center space-x-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        Tidak ada kategori tersedia. Silakan tambahkan kategori terlebih dahulu.
      </div>
    );
  }

  return (
    <FormItem className="space-y-3">
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col space-y-1"
        >
          {categories.map((category) => (
            <FormItem
              key={category.id}
              className="flex items-center space-x-3 space-y-0"
            >
              <FormControl>
                <RadioGroupItem value={category.id} />
              </FormControl>
              <FormLabel className="font-normal flex items-center">
                <CategoryHomeIcon className="mr-2 h-4 w-4" />
                {category.title}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

