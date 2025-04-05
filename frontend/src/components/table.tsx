import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
// Import the necessary modules and register them
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required module with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine-dark.css';

const AgDarkTable: React.FC = () => {
  const rowData = [
    { name: 'John', age: 25, country: 'USA' },
    { name: 'Alice', age: 30, country: 'UK' },
    { name: 'Bob', age: 28, country: 'Canada' },
  ];

  const columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
    { field: 'country', headerName: 'Country' },
  ];

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 400, width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default AgDarkTable;
