import { CategoryHomeIcon } from "@/icons/categories";
import {
  Pencil2Icon as DraftIcon,
  CheckCircledIcon as PublishedIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "published",
    label: "Published",
    icon: PublishedIcon,
  },
  {
    value: "draft",
    label: "Draft",
    icon: DraftIcon,
  },
];

// Categories will be loaded dynamically from database
// This is just a fallback
export const categories = [];

// Helper function to create category item
export const createCategoryItem = (id: string, title: string) => ({
  value: id,
  label: title,
  icon: CategoryHomeIcon,
});
