use crate::handlers::create::CreatePayload;
use rusqlite::{self, Connection, Result};

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new() -> Result<Database> {
        let conn = Connection::open("./data/main.db")?;
        Ok(Database { conn })
    }

    pub fn create(&self, payload: &CreatePayload) -> Result<usize, Box<dyn std::error::Error>> {
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
            "INSERT INTO {:?} ({}) VALUES ({})",
            table_name, columns, placeholders
        );

        // Prepare and execute the SQL statement
        let mut stmt = self.conn.prepare(&sql)?;
        let _ = stmt.execute([2i32, 3i32])
            .map_err(|e| Box::new(e) as Box<dyn std::error::Error>);

        Ok(1)
    }
}
