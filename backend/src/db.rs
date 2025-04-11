use crate::handlers::requests::{CreatePayload, DeletePayload};
use crate::models::models::FromRow;
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

    pub fn create(&mut self, sql: &String) -> DatabaseResult {
        let transaction = self.conn.transaction()?;
        let mut stmt = transaction.prepare(&sql)?;
        let result = stmt.execute([])?;
        Ok(result)
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

    pub fn update(&mut self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
        Ok(1)
    }

    pub fn delete(&mut self, payload: &DeletePayload) -> Result<usize, Box<dyn std::error::Error>> {
        let table_name = payload.get_table_name()?;
        
        Ok(1)
    }
}
