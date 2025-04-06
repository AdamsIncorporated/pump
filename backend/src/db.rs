use crate::handlers::create::CreatePayload;
use log::info;
use rusqlite::{self, params_from_iter, Connection, Result, ToSql};
use serde_json::Value;

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new() -> Result<Database> {
        let conn = Connection::open("./data/main.db")?;
        Ok(Database { conn })
    }

    pub fn create(&mut self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
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

        if let Some(Value::Array(items)) = &payload.data {
            for row in items {
                if let Value::Object(map) = row {
                    let values: Vec<Box<dyn ToSql>> = map
                        .values()
                        .map(|v| match v {
                            Value::Null => Box::new(None::<String>) as Box<dyn ToSql>,
                            Value::Bool(b) => Box::new(*b) as Box<dyn ToSql>,
                            Value::Number(n) => {
                                if let Some(i) = n.as_i64() {
                                    Box::new(i) as Box<dyn ToSql>
                                } else if let Some(f) = n.as_f64() {
                                    Box::new(f) as Box<dyn ToSql>
                                } else {
                                    Box::new(n.to_string()) as Box<dyn ToSql>
                                }
                            }
                            Value::String(s) => Box::new(s.clone()) as Box<dyn ToSql>,
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
        info!("\nTRANSACTION COMMITTED FOR A TOTAL OF {}", total_lines_inserted);
        Ok(total_lines_inserted)
    }
}
