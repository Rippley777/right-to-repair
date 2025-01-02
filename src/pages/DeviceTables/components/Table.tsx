import { flexRender, Table as TableType } from "@tanstack/react-table";
import { Device } from "../../../types";
import { useState } from "react";

const Table = (table: TableType<Device>) => {
  const [showHeaderGroups] = useState(false);
  const headerGroups = table.getHeaderGroups();
  const lastHeaderGroup = headerGroups[headerGroups.length - 1]; // Get only the last header group

  return (
    <div className="px-4 py-3 @container">
      <div className="flex overflow-scroll rounded-xl border border-[#383838] bg-[#141414]">
        <table className="flex-1 border-0">
          {/* TABLE HEADERS */}
          <thead>
            {showHeaderGroups
              ? headerGroups.map(
                  (headerGroup) => (
                    <tr key={headerGroup.id} className="bg-[#242424]">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="border-black">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ) // Skip rendering header groups
                )
              : lastHeaderGroup.headers.map((header) => (
                  <th key={header.id} className="border-black">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
            {/* {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#242424]">
                {headerGroup.headers.map((header) => (
                  <th
                    colSpan={header.colSpan}
                    className="px-4 py-3 text-left text-[#FFFFFF] w-[400px] text-sm font-medium leading-normal border-black"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))} */}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border-t border-t-[#383838]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
