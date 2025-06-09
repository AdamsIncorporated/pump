import { ColDef } from "ag-grid-community";
import { FaTrash } from "react-icons/fa";
import React from "react";
import { deleteRow } from "../../api/api";

// Column definitions for CalorieEntry
export const calorieColumnDefs: ColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    filter: true,
    width: 80,
    hide: true,
  },
  {
    field: "created_at",
    headerName: "Created At",
    sortable: true,
    filter: true,
    width: 150,
    hide: true,
  },
  {
    field: "carbs",
    headerName: "Carbs",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    field: "protein",
    headerName: "Protein",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    field: "saturated_fat",
    headerName: "Saturated Fat",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    field: "trans_fat",
    headerName: "Trans Fat",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    field: "monounsaturated_fat",
    headerName: "Monounsaturated Fat",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    field: "polyunsaturated_fat",
    headerName: "Polyunsaturated Fat",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    field: "total_calories",
    headerName: "Total Calories",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    headerName: "",
    field: "delete",
    cellRenderer: (params: any) => {
      const tableName = params.context.tableName;
      const setRowData = params.context.setRowData;
      return (
        <button
          onClick={() => deleteRow(params.data, tableName, setRowData)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FaTrash className="text-pink-500" />
        </button>
      );
    },
    width: 50,
    pinned: "right",
  },
];

// Column definitions for LiftEntry
export const liftColumnDefs: ColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    filter: true,
    width: 80,
    hide: true,
  },
  {
    field: "created_at",
    headerName: "Created At",
    sortable: true,
    filter: true,
    width: 150,
    hide: true,
  },
  {
    field: "weight_lbs",
    headerName: "Weight (lbs)",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    headerName: "",
    field: "delete",
    cellRenderer: (params: any) => {
      const tableName = params.context.tableName;
      const setRowData = params.context.setRowData;
      return (
        <button
          onClick={() => deleteRow(params.data, tableName, setRowData)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FaTrash className="text-pink-500" />
        </button>
      );
    },
    width: 50,
    pinned: "right",
  },
];

// Column definitions for WeightEntry
export const weightColumnDefs: ColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    filter: true,
    width: 80,
    hide: true,
  },
  {
    field: "created_at",
    headerName: "Created At",
    sortable: true,
    filter: true,
    width: 150,
    hide: true,
  },
  {
    field: "weight_lbs",
    headerName: "Weight (lbs)",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  {
    headerName: "",
    field: "delete",
    cellRenderer: (params: any) => {
      const tableName = params.context.tableName;
      const setRowData = params.context.setRowData;
      return (
        <button
          onClick={() => deleteRow(params.data, tableName, setRowData)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FaTrash className="text-pink-500" />
        </button>
      );
    },
    width: 50,
    pinned: "right",
  },
];

export function getColumnDefs(tableName: string): ColDef[] {
  switch (tableName) {
    case "calorie":
      return calorieColumnDefs;
    case "lift":
      return liftColumnDefs;
    case "weight":
      return weightColumnDefs;
    default:
      return []; // empty if no match found
  }
}
