use crate::handlers::create::CreatePayload;
use crate::models::models::create_table_map;
use log::info;
use rusqlite::{self, params_from_iter, Connection, Result, Row, ToSql};
use serde_json::Value as SerdeValue;
use std::collections::HashMap;

pub struct Database {
    conn: Connection,
}

type DatabaseResult = Result<usize, Box<dyn std::error::Error>>;

impl Database {
    pub fn new() -> Result<Database> {
        let conn = Connection::open("./data/main.db")?;
        Ok(Database { conn })
    }

    pub fn create(&mut self, payload: &CreatePayload) -> DatabaseResult {
        let mut total_lines_inserted: usize = 0;
        let table_name = payload.get_table_name()?;
        let keys = payload.get_data_keys()?;

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

        // start a transaction must mutate with each state
        let transaction = self.conn.transaction()?;
        let mut stmt = transaction.prepare(&sql)?;

        Ok(total_lines_inserted)
    }

    pub fn read(&self, table_name: &str) -> Result<String, Box<dyn Error>> {
        let table_map = create_table_map();

        // Dynamically map to the correct struct based on table name
        if let Some(table_fn) = table_map.get(table_name) {
            let sql = format!("SELECT * FROM {}", table_name);
            let mut stmt = self.conn.prepare(&sql)?;

            let rows = stmt.query_map([], |row| {
                let struct_instance = table_fn(row)?;
                Ok(serde_json::to_value(struct_instance)?)
            })?;

            let mut json_rows = Vec::new();
            for row in rows {
                json_rows.push(row?);
            }

            Ok(serde_json::to_string(&json_rows)?)
        } else {
            Err(format!("Table '{}' not recognized", table_name).into())
        }
    }

    fn update(&mut self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
        Ok(1)
    }

    fn delete(&mut self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
        Ok(1)
    }
}
