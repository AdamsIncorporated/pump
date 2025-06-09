import { UpdatePayload, DeletePayload } from "./payload";

export async function read(tableName: string) {
  const url = `/api/read?table_name=${encodeURIComponent(tableName)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data.", error);
    throw error;
  }
}

export async function updateRow(row: Record<string, any>, table_name: string) {
  try {
    if (!row.id) {
      throw new Error("Missing row ID for update.");
    }

    const payload: UpdatePayload = {
      table_name,
      rows: [row],
    };

    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update entry: ${response.statusText}`);
    }

    const updated = await response.json();
    return updated;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
}

export async function deleteRow(
  row: Record<string, any>,
  tableName: string,
  setRowData: React.Dispatch<React.SetStateAction<any[]>>
) {
  if (!row.id) {
    throw new Error("Missing row ID for delete.");
  }

  const payload: DeletePayload = {
    table_name: tableName,
    ids: [row.id],
  };

  if (window.confirm(`Delete row with ID ${row.id}?`)) {
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }

      // ✅ Remove the deleted row from UI
      setRowData(prev => prev.filter(r => r.id !== row.id));

      console.log(`Row with ID ${row.id} deleted.`);
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  }
}
