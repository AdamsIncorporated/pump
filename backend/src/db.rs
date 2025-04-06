use crate::handlers::create::CreatePayload;
use rusqlite::{self, Connection, Result, ToSql};
use serde_json::Value as SerdeValue;

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new() -> Result<Database> {
        let conn = Connection::open("./data/main.db")?;
        Ok(Database { conn })
    }

    pub fn create(&self, payload: &CreatePayload) -> Result<usize> {
        let table_name = payload.table_name.clone().unwrap_or_default();

        let keys = payload.get_data_keys().unwrap_or_default();
        if keys.is_empty() {
            return Err(rusqlite::Error::InvalidQuery);
        }

        // Construct the column names and placeholders for SQL
        let columns = keys.join(", ");
        let placeholders = keys
            .iter()
            .map(|_| "?".to_string())
            .collect::<Vec<String>>()
            .join(", ");

        // Build the SQL query
        let sql = format!(
            "INSERT INTO {} ({}) VALUES ({})",
            table_name, columns, placeholders
        );

        // Extract values, defaulting to empty map if necessary
        let values: serde_json::Map<String, SerdeValue> = payload
            .data
            .as_ref()
            .and_then(|data| data.as_object())
            .cloned()
            .unwrap_or_default();

        // Prepare and execute the SQL statement
        let mut stmt = self.conn.prepare(&sql)?;
        stmt.execute([2i32, 3i32])
    }
}
