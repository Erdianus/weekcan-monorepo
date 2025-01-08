/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { ColumnDef, Table as Tabel } from "@tanstack/react-table";
import { Fragment } from "react";
import { flexRender } from "@tanstack/react-table";

import Flashlist from "../flashlist";
import Loading from "../loading";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "./context-menu";
import { Skeleton } from "./skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  table: Tabel<TData>;
  isloading: boolean;
  contextMenu?: boolean;
}

export function DataTable<TData>({
  columns,
  table,
  isloading,
  contextMenu,
}: DataTableProps<TData>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <Flashlist
            isloading={isloading}
            loading={
              <Loading keyname="loadingtable">
                <TableRow>
                  {columns.map((_, i) => (
                    <TableCell key={`cellloading-${i}`}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              </Loading>
            }
            isfallback={table.getRowModel().rows.length === 0}
            fallback={
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            }
          >
            {!!table.getRowModel().rows?.length &&
              table.getRowModel().rows.map((row) => {
                const cells = row.getVisibleCells?.() ?? [];
                const lastCells = cells[cells.length - 1];
                return (
                  <Fragment key={`roww-context-${row.id}`}>
                    {contextMenu && lastCells?.id.includes("action") ? (
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <TableRow
                            key={`row-${row.id}`}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={`cell-${cell.id}`}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          {flexRender(
                            lastCells?.column.columnDef.cell,
                            lastCells?.getContext(),
                          )}
                        </ContextMenuContent>
                      </ContextMenu>
                    ) : (
                      <TableRow
                        key={`roww-${row.id}`}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={`cell--${cell.id}`}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
          </Flashlist>
        </TableBody>
      </Table>
    </div>
  );
}
