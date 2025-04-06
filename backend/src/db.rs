use crate::handlers::create::CreatePayload;
use serde_json::Value as SerdeValue;
use rusqlite::{Connection, Result};

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new() -> Result<Database> {
        let conn = Connection::open("./data/main.db")?;
        Ok(Database { conn })
    }

    pub fn create(&self, payload: &CreatePayload) -> Result<usize> {
        // Grab table name
        let table_name = payload.table_name.unwrap_or_default();

        // Construct columsn names string
        let keys = payload.get_data_keys().unwrap_or_default();
        let columns = keys.join(", ");

        // Extract the values from the data field (unwrap or default to an empty map)
        let values = payload
            .data
            .as_ref()
            .and_then(|data| data.as_object())
            .cloned()
            .unwrap_or_default();

        // contrsut placeholders
        let placeholders = keys
            .iter()
            .map(|_| "?".to_string())
            .collect::<Vec<String>>()
            .join(", ");

        let sql = format!(
            "INSERT INTO {} ({}) VALUES ({})",
            table_name, columns, placeholders
        );

        // Extract the values based on the keys in order
        let params: Vec<&dyn rusqlite::ToSql> = keys
            .iter()
            .map(|key| values.get(key).unwrap_or(&SerdeValue::Null)) // Default to null if no value is found
            .map(|v| v as &dyn rusqlite::ToSql)
            .collect();

        // Prepare the statement and execute the insert
        let mut stmt = self.conn.prepare(&sql)?;
        stmt.execute(params.as_slice())
    }
}
