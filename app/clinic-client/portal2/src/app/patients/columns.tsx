"use client"
import { FaSort } from "react-icons/fa";

import { ColumnDef } from "@tanstack/react-table"
import { MdOutlineMoreHoriz } from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Patient } from "@/lib/api/patientClient";

export const columns: ColumnDef<Patient>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Courriel
            <FaSort className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Téléphone
            <FaSort className="ml-2 h-4 w-4" />
          </Button>
        )
      },
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
