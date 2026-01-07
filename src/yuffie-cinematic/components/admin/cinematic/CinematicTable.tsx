"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { cinematicStatsData, CinematicStats } from "./cinematic-stats-data";
import { format } from "date-fns";

const columns: ColumnDef<CinematicStats>[] = [
  {
    header: "#",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Cinematic",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "views",
    header: "Visualizações",
    cell: (info) => (info.getValue() as number).toLocaleString(),
  },
  {
    accessorKey: "addedAt",
    header: "Adicionado em",
    cell: (info) => format(new Date(info.getValue() as string), "dd/MM/yyyy"),
  },
];

export function CinematicTable() {
  const table = useReactTable({
    data: cinematicStatsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#131b22] border border-gray-700 rounded-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-700">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-gray-400 font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-800 hover:bg-gray-900/40 transition"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
