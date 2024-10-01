import React, { useMemo } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

import "../styles/CountryTable.css";

const CountryTable = ({ data }) => {
  const columnHelper = createColumnHelper();
  const columnDef = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Country Name",
        accessor: "Name", // accessor is the "key" in the data object
        accessorKey: "name",
      }),
      {
        header: "Code",
        accessor: "currency",
        accessorKey: "currency",
      },
      {
        header: "Capital",
        accessor: "capital",
        accessorKey: "capital",
      },
      {
        header: "Ph Code",
        accessor: "phone",
        accessorKey: "phone",
      },
      {
        header: "Population",
        accessor: "population",
        accessorKey: "population",
      },
      {
        header: "Flag",
        accessor: "media.flag",
        accessorKey: "media.flag",
        cell: (info) => {
          if (!info.getValue()) return null;
          return (
            <img
              src={info.getValue()}
              alt="Flag"
              style={{ width: "100px", height: "60px" }}
              loading="lazy"
            />
          );
        },
      },
      {
        header: "Emblem",
        accessor: "media.emblem",
        accessorKey: "media.emblem",
        cell: (info) => {
          if (!info.getValue()) return null;
          return (
            <img
              src={info.getValue()}
              alt="Emblem"
              style={{ width: "60px", height: "60px" }}
              loading="lazy"
            />
          );
        },
      },
    ],
    [columnHelper]
  );

  const tableInstance = useReactTable({
    columns: columnDef,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th key={columnEl.id} colSpan={columnEl.colSpan}>
                      {columnEl.isPlaceholder
                        ? null
                        : flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(CountryTable);
