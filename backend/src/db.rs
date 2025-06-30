use log::error;
use mysql::{prelude::*, Opts, OptsBuilder, Pool, PooledConn, Value as MySqlValue};
use serde_json::{json, Map, Value as SerdeValue};
use std::env;

pub struct Database {
    conn: PooledConn,
}

impl Database {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        // Load the .env file from the root
        dotenv::from_path("./.env").ok();

        let hostname = env::var("DB_HOSTNAME")?;
        let username = env::var("DB_USERNAME")?;
        let password = env::var("DB_PASSWORD")?;
        let database = env::var("DB_DATABASE")?;
        let port: u16 = env::var("DB_PORT")?.parse()?; 

        let opts = OptsBuilder::new()
            .ip_or_hostname(Some(&hostname))
            .user(Some(&username))
            .pass(Some(&password))
            .db_name(Some(&database))
            .tcp_port(port);

        match Pool::new(Opts::from(opts)) {
            Ok(pool) => {
                let conn = pool.get_conn()?;
                Ok(Database { conn })
            }
            Err(error) => {
                error!("Connection to MySQL database failed.");
                Err(Box::new(error))
            }
        }
    }

    pub fn execute_sql(
        &mut self,
        sql: &str,
        params: Option<Vec<MySqlValue>>,
    ) -> Result<u64, Box<dyn std::error::Error>> {
        let params_value = params.unwrap_or(Vec::new());
        self.conn.exec_drop(sql, params_value)?;
        Ok(self.conn.affected_rows())
    }

    pub fn read_all_as_json(
        &mut self,
        sql: &str,
        params: Option<Vec<MySqlValue>>,
    ) -> Result<Vec<SerdeValue>, Box<dyn std::error::Error>> {
        let params_value = params.unwrap_or(Vec::new());
        let result: Vec<mysql::Row> = self.conn.exec(sql, params_value)?;

        let mut output = Vec::new();

        for row in result {
            let columns = row.columns_ref();
            let mut map = Map::new();
            for (i, col) in columns.iter().enumerate() {
                let val = row.as_ref(i).unwrap_or(&MySqlValue::NULL);
                let json_val = match val {
                    MySqlValue::NULL => SerdeValue::Null,
                    MySqlValue::Bytes(bytes) => match std::str::from_utf8(bytes) {
                        Ok(s) => json!(s),
                        Err(_) => json!(bytes),
                    },
                    MySqlValue::Int(i) => json!(*i),
                    MySqlValue::UInt(u) => json!(*u),
                    MySqlValue::Float(f) => json!(*f),
                    MySqlValue::Double(d) => json!(*d),
                    MySqlValue::Date(y, m, d, h, min, s, _) => {
                        json!(format!(
                            "{:04}-{:02}-{:02} {:02}:{:02}:{:02}",
                            y, m, d, h, min, s
                        ))
                    }
                    MySqlValue::Time(..) => json!("TIME"), // You can customize if needed
                };
                map.insert(col.name_str().into_owned(), json_val);
            }
            output.push(SerdeValue::Object(map));
        }

        Ok(output)
    }
}
