import React, { useState } from "react";
import { ColDef } from "ag-grid-community";
import { FaTrash } from "react-icons/fa";
import { deleteRow } from "../../api/api";
import DeletePopup from "../windows/deletePopUp";

const createdAtColumnDefinition: ColDef = {
  headerName: "Date",
  field: "created_at",
  sortable: true,
  filter: true,
  hide: false,
  minWidth: 80,
  pinned: "left",
  valueFormatter: (params) => {
    const date = new Date(params.value);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  },
};

const deleteColumnDefinition: ColDef = {
  headerName: "",
  field: "delete",
  cellRenderer: (params: any) => {
    const tableName = params.context.tableName;
    const setRowData = params.context.setRowData;
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const onConfirmDelete = async () => {
      await deleteRow(params.data, tableName, setRowData);
      setShowDeletePopup(false);
    };

    return (
      <button
        onClick={() => setShowDeletePopup(true)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <FaTrash className="text-pink-500" />
      </button>
    );
  },
  width: 50,
  pinned: "right",
};

// Column definitions for CalorieEntry
export const calorieColumnDefs: ColDef[] = [
  createdAtColumnDefinition,
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    filter: true,
    width: 80,
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
  deleteColumnDefinition,
];

// Column definitions for LiftEntry
export const liftColumnDefs: ColDef[] = [
  createdAtColumnDefinition,
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    filter: true,
    width: 80,
    hide: true,
  },

  {
    field: "weight_lbs",
    headerName: "Weight (lbs)",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  deleteColumnDefinition,
];

// Column definitions for WeightEntry
export const weightColumnDefs: ColDef[] = [
  createdAtColumnDefinition,
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    filter: true,
    width: 80,
    hide: true,
  },

  {
    field: "weight_lbs",
    headerName: "Weight (lbs)",
    type: "numericColumn",
    sortable: true,
    filter: true,
  },
  deleteColumnDefinition,
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
