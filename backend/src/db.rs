use crate::handlers::create::CreatePayload;
use crate::models::models::table_map::FromRow;
use rusqlite::{self, Connection, Result};
use serde::Serialize;

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

    pub fn read<T: FromRow + Serialize>(&self, table_name: &str) -> Result<String, Box<dyn std::error::Error>> {
        let sql = format!("SELECT * FROM {}", table_name);
        let mut stmt = self.conn.prepare(&sql)?;

        let rows_iter = stmt.query_map([], |row| {
            T::from_row(row)
        })?;

        let mut results: Vec<T> = Vec::new();
        for row_result in rows_iter {
            results.push(row_result?);
        }

        let json_string = serde_json::to_string(&results)?;
        Ok(json_string)
    }

    fn update(&mut self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
        Ok(1)
    }

    fn delete(&mut self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
        Ok(1)
    }
}
