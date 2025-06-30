import { UpdatePayload, DeletePayload } from "./payload";

export async function createdRow(
  row: Record<string, any> | null,
  table_name: string
) {
  const url = "api/create";
  console.log(`[create] Creating data from: ${url}`);

  const payload: UpdatePayload = {
    table_name,
    rows: [row ?? {}],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(`[create] Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("[create] Data received:", data);
    return data;
  } catch (error) {
    console.error("[create] Failed to create data:", error);
    throw error;
  }
}

export async function read(tableName: string) {
  const url = `/api/read?table_name=${encodeURIComponent(tableName)}`;
  console.log(`[read] Fetching data from: ${url}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`[read] Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("[read] Data received:", data);
    return data;
  } catch (error) {
    console.error("[read] Failed to fetch data:", error);
    throw error;
  }
}

export async function updateRow(row: Record<string, any>, table_name: string) {
  console.log("[updateRow] Updating row:", row);
  console.log("[updateRow] Table name:", table_name);

  try {
    if (!row.id) {
      throw new Error("Missing row ID for update.");
    }

    const payload: UpdatePayload = {
      table_name,
      rows: [row],
    };

    console.log("[updateRow] Payload:", payload);

    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("[updateRow] Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to update entry: ${response.statusText}`);
    }

    const updated = await response.json();
    console.log("[updateRow] Updated result:", updated);
    return updated;
  } catch (error) {
    console.error("[updateRow] Update error:", error);
    throw error;
  }
}

export async function deleteRow(
  row: Record<string, any>,
  tableName: string,
  setRowData: React.Dispatch<React.SetStateAction<any[]>>
) {
  console.log("[deleteRow] Attempting to delete row:", row);
  console.log("[deleteRow] Table name:", tableName);

  if (!row.id) {
    throw new Error("Missing row ID for delete.");
  }

  const payload: DeletePayload = {
    table_name: tableName,
    ids: [row.id],
  };

  console.log("[deleteRow] Payload:", payload);

  try {
    const response = await fetch("/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("[deleteRow] Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    // ✅ Remove the deleted row from UI
    setRowData((prev) => {
      const updated = prev.filter((r) => r.id !== row.id);
      console.log("[deleteRow] Updated row data after deletion:", updated);
      return updated;
    });

    console.log(`[deleteRow] Row with ID ${row.id} successfully deleted.`);
  } catch (error) {
    console.error("[deleteRow] Error deleting row:", error);
  }
}
