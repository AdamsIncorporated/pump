import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { getColumnDefs } from "./columnDef";

// Register all modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataEditorProps {
  tableName: string;
  data: Record<string, any>[];
}

const DataEditor: React.FC<DataEditorProps> = ({ data, tableName }) => {
  const [rowData, setRowData] = useState<Record<string, any>[]>(data);

  // ✅ Sync internal rowData when parent data changes
  useEffect(() => {
    setRowData(data);
  }, [data]);
  const columnDefs = getColumnDefs(tableName);

  return (
    <div>
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
