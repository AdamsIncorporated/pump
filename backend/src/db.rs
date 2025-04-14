use rusqlite::{Connection, Error, Params};
pub type DatabaseResult<T> = std::result::Result<T, Error>;

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new(path: &str) -> DatabaseResult<Self> {
        Connection::open(path)
            .map(|conn| Database { conn })
            .map_err(rusqlite::Error)
    }

    pub fn execute_sql<P: Params>(
        &mut self,
        sql: &String,
        params: &mut [P] ,
    ) -> DatabaseResult<usize> {
        let transaction = match self.conn.transaction() {
            Ok(tx) => tx,
            Err(error) => return Err(error),
        };

        let mut stmt = transaction.prepare(sql)?;
        stmt.execute(params);

        match result {
            Ok(rows_affected) => {
                transaction.commit()?;
                Ok(rows_affected)
            }
            Err(error) => {
                transaction.rollback()?;
                Err(error)
            }
        }
    }
}
