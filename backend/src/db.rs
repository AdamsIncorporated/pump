use log::error;
use rusqlite::{Connection, ToSql};
use serde::de::DeserializeOwned;
use serde_rusqlite::from_rows;

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        match Connection::open("./data/main.db") {
            Ok(conn) => Ok(Database { conn }),
            Err(error) => {
                error!("Connection to ./data/main.db file failed.");
                Err(Box::new(error))
            }
        }
    }

    pub fn execute_sql(
        &mut self,
        sql: &String,
        params: &[&dyn ToSql],
    ) -> Result<usize, Box<dyn std::error::Error>> {
        let tx = self.conn.transaction()?;
        let rows_affected = tx.execute(sql, params)?;
        tx.commit();
        Ok(rows_affected)
    }

    pub fn read_rows<T: DeserializeOwned>(
        &mut self,
        sql: &String,
        params: &[&dyn ToSql],
    ) -> Result<Vec<T>, Box<dyn std::error::Error>> {
        let stmt = self.conn.prepare(sql)?;
        let mut results = Vec::new();
        let rows = stmt.query_map(params, |row| Ok(serde_rusqlite::from_row::<T>(row)))?;

        while let row = rows.next() {
            match serde_rusqlite::from_row::<T>(row) {
                Ok(item) => results.push(item),
                Err(e) => return Err(e.into()), // Or handle the error as needed
            }
        }

        Ok(rows)
    }
}
