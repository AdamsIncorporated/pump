use log::error;
use rusqlite::{Connection, ToSql};
use rusqlite::types::Value as rusqliteValue;
use serde_json::{json, Map, Value as SerdeValue};

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
        tx.commit()?;
        Ok(rows_affected)
    }

    pub fn read_all_as_json(
        &mut self,
        sql: &str,
        params: &[&dyn ToSql],
    ) -> Result<Vec<SerdeValue>, Box<dyn std::error::Error>> {
        let mut stmt = self.conn.prepare(sql)?;
        let cols: Vec<String> = stmt
            .column_names()
            .iter()
            .map(|s| s.to_string())
            .collect();

        let rows = stmt.query_map(params, |row| {
            let mut map = Map::new();
            for (i, col) in cols.iter().enumerate() {
                let value: rusqliteValue = row.get(i)?;
                let json_value = match value {
                    rusqliteValue::Null => SerdeValue::Null,
                    rusqliteValue::Integer(i) => json!(i),
                    rusqliteValue::Real(f) => json!(f),
                    rusqliteValue::Text(s) => json!(s),
                    rusqliteValue::Blob(b) => json!(b),
                };
                map.insert(col.to_string(), json_value);
            }

            Ok(SerdeValue::Object(map))
        })?;

        let result: Result<Vec<SerdeValue>, _> = rows.collect();
        result.map_err(|e| e.into())
    }
}
