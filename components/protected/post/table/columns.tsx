"use client";

import { Draft } from "@/types/collection";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { CategoryTableCell } from "./category-table-cell";
import { statuses } from "./data/data";
import { Pencil2Icon as DraftIcon } from "@radix-ui/react-icons";

export const columns: ColumnDef<Draft>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "category_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const categoryId = row.getValue("category_id") as string;
      return <CategoryTableCell categoryId={categoryId} />;
    },
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      // Get status from the draft object
      const status = row.getValue("status") as string || "draft";
      
      return (
        <div className="flex w-[100px] items-center">
          <DraftIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="capitalize">{status}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const status = row.getValue("status") as string || "draft";
      return value.includes(status);
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = format(new Date(row.getValue("created_at")), "MM/dd/yyyy");

      if (!date) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
    enableSorting: false,
  },
];
