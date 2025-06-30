import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { getColumnDefs } from "./columnDef";
import { IoIosAddCircleOutline } from "react-icons/io";
import { updateRow, createdRow } from "../../api/api";

// Register all modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataEditorProps {
  tableName: string;
  data: Record<string, any>[];
}

const DataEditor: React.FC<DataEditorProps> = ({ data, tableName }) => {
  const columnDefs = getColumnDefs(tableName);
  const [rowData, setRowData] = useState(data);
  const originalRowRef = useRef<Record<string, any> | null>(null);

  const onCellEditingStarted = (event: any) => {
    originalRowRef.current = { ...event.data };
  };

  const onCellValueChanged = async (event: any) => {
    const updatedRow = event.data;
    const oldRow = originalRowRef.current;

    if (!oldRow) return;

    const hasChanged = Object.keys(updatedRow).some((key) => {
      return updatedRow[key] !== oldRow[key];
    });

    if (hasChanged) {
      try {
        await updateRow(updatedRow, tableName);
        setRowData((prevData) =>
          prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        );
      } catch (error) {
        console.error("Failed to update row:", error);
      }
    }

    // reset the cache
    originalRowRef.current = null;
  };

  const addRow = async () => {
    const newRow: Record<string, any> = {};
    columnDefs.forEach((col: any) => {
      newRow[col.field] =
        col.field === "created_at" ? new Date().toISOString() : null;
    });

    setRowData((prev) => [...prev, newRow]);

    // Exclude meta field "delete" before sending
    const filteredRow = Object.fromEntries(
      Object.entries(newRow).filter(([key]) => !["id", "delete"].includes(key))
    );
    await createdRow(filteredRow, tableName);
  };

  return (
    <div>
      <button
        className="mb-2 px-4 py-1 bg-slate-500 text-white rounded-full hover:bg-slate-600"
        onClick={addRow}
      >
        <IoIosAddCircleOutline />
      </button>
      <div
        className="ag-theme-my-dark"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, editable: true, resizable: true }}
          onCellEditingStarted={onCellEditingStarted}
          onCellValueChanged={onCellValueChanged}
          context={{ tableName: tableName, setRowData: setRowData }}
        />
      </div>
    </div>
  );
};

export default DataEditor;
