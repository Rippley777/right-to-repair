import { flexRender, Table as TableType } from "@tanstack/react-table";
import { Device } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Table = (table: TableType<Device>) => {
  const { features } = useSelector((state: RootState) => state.table);
  const headerGroups = table.getHeaderGroups();
  const lastHeaderGroup = headerGroups[headerGroups.length - 1];

  return (
    <div className="px-4 py-3 @container">
      <div className="flex overflow-scroll rounded border border-[#383838] bg-[#141414]">
        <table className="flex-1 border-0">
          {/* TABLE HEADERS */}
          <thead className="text-gray-400">
            {features.headerGroups
              ? headerGroups.map((headerGroup) => (
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
                ))
              : lastHeaderGroup.headers.map((header) => (
                  <th key={header.id} className="border-black bg-[#242424]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-t border-t-[#383838] min-h-10 h-10"
                    >
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
