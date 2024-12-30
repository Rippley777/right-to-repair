import { useState, useEffect } from "react";
import { CellContext } from "@tanstack/react-table";

export function EditableCell<TData>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<TData, unknown>) {
  const initialValue = getValue() as string | number;
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id as keyof TData, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="border rounded p-1"
    />
  );
}
