use crate::handlers::create::CreatePayload;
use crate::models::models::{Calories, Lift, Weight};
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

        if let Some(SerdeValue::Array(items)) = &payload.data {
            for row in items {
                if let SerdeValue::Object(map) = row {
                    let values: Vec<Box<dyn ToSql>> = map
                        .values()
                        .map(|v| match v {
                            SerdeValue::Null => Box::new(None::<String>) as Box<dyn ToSql>,
                            SerdeValue::Bool(b) => Box::new(*b) as Box<dyn ToSql>,
                            SerdeValue::Number(n) => {
                                if let Some(i) = n.as_i64() {
                                    Box::new(i) as Box<dyn ToSql>
                                } else if let Some(f) = n.as_f64() {
                                    Box::new(f) as Box<dyn ToSql>
                                } else {
                                    Box::new(n.to_string()) as Box<dyn ToSql>
                                }
                            }
                            SerdeValue::String(s) => Box::new(s.clone()) as Box<dyn ToSql>,
                            _ => Box::new(v.to_string()) as Box<dyn ToSql>,
                        })
                        .collect();

                    let values_refs: Vec<&dyn ToSql> = values.iter().map(|v| &**v).collect();
                    let lines_submitted = stmt.execute(params_from_iter(values_refs))?;
                    total_lines_inserted += lines_submitted;
                    info!("INSERTED INTO DB {:?}", row);
                }
            }
        }
        drop(stmt);
        transaction.commit()?;
        info!(
            "\nTRANSACTION COMMITTED FOR A TOTAL OF {}",
            total_lines_inserted
        );
        Ok(total_lines_inserted)
    }

    fn read(&self, payload: &CreatePayload) -> Result<String, Box<dyn std::error::Error>> {
        let table_name = payload.get_table_name()?;
        let sql = format!("SELECT * FROM {}", table_name);
        let mut stmt = self.conn.prepare(&sql)?;

        // Create a vector to hold the rows.
        let mut json_rows = Vec::new();
        let rows = stmt.query_map([], |row| Ok(()));
    }

    fn update(&mut self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
        Ok(1)
    }

    fn delete(&mut self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
        Ok(1)
    }
}
