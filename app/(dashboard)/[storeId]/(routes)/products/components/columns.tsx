"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle, CircleOff } from "lucide-react";
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  manufacturer: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "manufacturer",
    header: "Fabricante",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: "Arquivado",
    cell: ({ row }) => (
      <div className="flex items-center ms-6">
        {row.original.isArchived ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <CircleOff className="w-4 h-4 text-red-600" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Promocional",
    cell: ({ row }) => (
      <div className="flex items-center ms-6">
        {row.original.isFeatured ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <CircleOff className="w-4 h-4 text-red-600" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
