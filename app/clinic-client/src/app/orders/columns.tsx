"use client"
import { FaSort } from "react-icons/fa";
import { format } from 'date-fns';

import { ColumnDef } from "@tanstack/react-table"
import { MdOutlineMoreHoriz } from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { Order } from '@/lib/api/orderClient';
import { OrderStatus } from '@/lib/api/orderClient';

export type { Order };

const statusLabels: Record<OrderStatus, string> = {
    [OrderStatus.InProgress]: 'En cours',
    [OrderStatus.Completed]: 'Terminé',
    [OrderStatus.Cancelled]: 'Annulé',
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Numéro
            <FaSort className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prénom
            <FaSort className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom
            <FaSort className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "dateCreated",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <FaSort className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
      const originalDate: Date = row.getValue("dateCreated")
      const formattedDate = format(originalDate, "yyyy-MM-dd hh:mm")
      return (formattedDate)
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Statut
            <FaSort className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => statusLabels[row.getValue("status") as OrderStatus] ?? row.getValue("status"),
  },
  {
    id: "actions",
    cell: ({}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MdOutlineMoreHoriz className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Some Action1</DropdownMenuItem>
            <DropdownMenuItem>Some Action2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
