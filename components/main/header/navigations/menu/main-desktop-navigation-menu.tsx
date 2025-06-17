"use client";

import { getCategories } from "@/lib/supabase/categories-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const MainDesktopNavigationMenu = () => {
  const currentPath = usePathname();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Add home category at the beginning
        const categoriesWithHome = [
          { id: "home", title: "Home", slug: "/" },
          ...data
        ];
        setCategories(categoriesWithHome);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="hidden gap-x-6 md:flex">
        <div className="h-8 w-16 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-8 w-20 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200"></div>
      </div>
    );
  }
  return (
    <>
      <div className="hidden gap-x-6 md:flex">
        {categories.map((category) => (
          <Link
            href={
              category.slug === "/"
                ? category.slug
                : `/category/${category.slug}`
            }
            key={category.id}
            className={cn(
              "relative inline-flex items-center rounded-full px-4 py-1.5 text-base font-semibold tracking-tight text-gray-500 antialiased ring-1 ring-transparent transition duration-200 [word-spacing:-5px] active:scale-[96%] active:ring-black/20",
              {
                "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 px-4 text-gray-600 shadow-md shadow-black/5 ring-1 ring-black/10":
                  currentPath ===
                  (category.slug === "/"
                    ? category.slug
                    : `/category/${category.slug}`),
              },
              {
                "bg-transparent ring-transparent hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 hover:shadow-md hover:shadow-black/5 hover:ring-1 hover:ring-black/10":
                  currentPath !==
                  (category.slug === "/"
                    ? category.slug
                    : `/category/${category.slug}`),
              },
            )}
          >
            <div className="relative">{category.title}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MainDesktopNavigationMenu;
