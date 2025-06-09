import updatePayload from "./payload";

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

export async function update(row: Record<string, any>, table_name: string) {
  try {
    if (!row.id) {
      throw new Error("Missing row ID for update.");
    }

    const payload: updatePayload = {
      table_name,
      rows: [row]
    }

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
