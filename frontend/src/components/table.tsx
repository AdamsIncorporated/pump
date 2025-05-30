import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

// Register all modules
ModuleRegistry.registerModules([AllCommunityModule]);

const DataEditor: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<any[]>([
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    { field: "id", editable: true },
    { field: "name", editable: true },
    { field: "age", editable: true },
  ]);

  const addRow = () => {
    const newRow = { id: "", name: "", age: "" };
    setRowData((prev) => [...prev, newRow]);
  };

  return (
    <div>
      <button onClick={addRow} style={{ marginBottom: '10px' }}>Add Row</button>
      <div className="ag-theme-my-dark" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
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
