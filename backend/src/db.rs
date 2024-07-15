use rusqlite::{params, Connection, Result};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Lift {
    id: Option<i32>,
    lift: String,
    pounds: i32,
    create_date: Option<String>,
}

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new() -> Result<Database> {
        let conn = Connection::open("main.db")?;
        Ok(Database { conn })
    }

    // Methods for handling Lift
    pub fn insert_lift(&self, lift: &Lift) -> Result<usize> {
        self.conn.execute(
            "INSERT INTO Lift (Lift, Pounds) VALUES (?1, ?2, ?3)",
            params![lift.lift, lift.pounds],
        )
    }

    pub fn get_lift(&self, lift: &Lift) -> Result<Option<Lift>> {
        let mut stmt = self
            .conn
            .prepare("SELECT * FROM Lift WHERE Lift = ?1")?;
        let lift_iter = stmt.query_map(params![lift.lift], |row| {
            Ok(Lift {
                id: row.get(0)?,
                lift: row.get(1)?,
                pounds: row.get(2)?,
                create_date: row.get(3)?,
            })
        })?;

        // Collect the results and return the first found lift or None
        for lift in lift_iter {
            return Ok(Some(lift?));
        }

        Ok(None)
    }

    pub fn delete_lift(&self, id: i32) -> Result<usize> {
        self.conn
            .execute("DELETE FROM lifts WHERE id = ?1", params![id])
    }
}
