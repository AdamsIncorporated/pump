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
  const columnDefs = getColumnDefs(tableName);

  return (
    <div className="ag-theme-my-dark" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, editable: true, resizable: true }}
      />
    </div>
  );
};

export default DataEditor;
