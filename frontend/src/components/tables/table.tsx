import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { getColumnDefs } from "./columnDef";
import { IoIosAddCircleOutline } from "react-icons/io";

// Register all modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataEditorProps {
  tableName: string;
  data: Record<string, any>[];
}

const DataEditor: React.FC<DataEditorProps> = ({ data, tableName }) => {
  const columnDefs = getColumnDefs(tableName);
  const [rowData, setRowData] = useState(data);

  const onCellValueChanged = (event: any) => {
    const updatedRow = event.data;
    setRowData((prevData) =>
      prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
  };

  const addRow = () => {
    const newRow: Record<string, any> = {};
    columnDefs.forEach((col: any) => {
      newRow[col.field] = null;
    });

    setRowData((prev) => [...prev, newRow]);
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
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default DataEditor;
