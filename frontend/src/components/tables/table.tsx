import React, { useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

// Register all modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataEditorProps {
  data?: Record<string, any>[];
}

const DataEditor: React.FC<DataEditorProps> = ({ data = [] }) => {
  const [rowData, setRowData] = useState<Record<string, any>[]>(data);

  const columnDefs = useMemo(() => {
    if (rowData.length === 0) return [];

    const keys = Object.keys(rowData[0]);
    return keys.map((key) => ({
      field: key,
      editable: true,
    }));
  }, [rowData]);

  const addRow = () => {
    const emptyRow: Record<string, any> = {};
    columnDefs.forEach((col) => {
      emptyRow[col.field] = "";
    });
    setRowData((prev) => [...prev, emptyRow]);
  };

  return (
    <div>
      <button onClick={addRow} style={{ marginBottom: "10px" }}>
        Add Row
      </button>
      <div className="ag-theme-my-dark" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, editable: true, resizable: true }}
          onCellValueChanged={(e) => {
            if (e.rowIndex !== null) {
              const updatedData = [...rowData];
              updatedData[e.rowIndex] = e.data;
              setRowData(updatedData);
            }
          }}
        />
      </div>
    </div>
  );
};

export default DataEditor;
