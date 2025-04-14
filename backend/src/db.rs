use rusqlite::{Connection, ToSql};

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        match Connection::open("./data/main.db") {
            Ok(conn) => Ok(Database { conn }),
            Err(e) => Err(Box::new(e))
        }
    }

    pub fn execute_sql(&mut self, sql: &String, params: &[&dyn ToSql]) -> Result<usize, Box<dyn std::error::Error>> {
        let tx = self.conn.transaction()?;
        let mut stmt = tx.prepare(sql)?;
        let rows_affected = stmt.execute(params)?;
        tx.commit();
        Ok(rows_affected)
    }
}
