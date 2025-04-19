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

    pub fn read_rows<
        D: DeserializeOwned,
    >(
        &mut self,
        sql: &String,
        params: &[&dyn ToSql],
    ) -> Result<Vec<D>, Box<dyn std::error::Error>> {
        let mut stmt = self.conn.prepare(sql)?;
        let rows = stmt.query(params)?;
        let results: Vec<D> = from_rows::<D>(rows).collect::<Result<_, _>>()?;
        Ok(results)
    }
}
