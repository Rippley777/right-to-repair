import { flexRender, Table as TableType } from "@tanstack/react-table";
import { Device } from "../../../types";

const Table = (table: TableType<Device>) => {
  return (
    <div className="px-4 py-3 @container">
      <div className="flex overflow-hidden rounded-xl border border-[#383838] bg-[#141414]">
        <table className="flex-1 border-0">
          {/* TABLE HEADERS */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#242424]">
                {headerGroup.headers.map((header) => (
                  <th
                    colSpan={header.colSpan}
                    className="table-662fe7a9-f93e-4455-80fb-a186fedca44e-column-120 px-4 py-3 text-left text-[#FFFFFF] w-[400px] text-sm font-medium leading-normal border-black"
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
            ))}
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
