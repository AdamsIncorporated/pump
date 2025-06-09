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
