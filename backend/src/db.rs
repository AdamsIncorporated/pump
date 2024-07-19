use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Lifts {
    lifts: Option<Vec<Lift>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Lift {
    id: Option<i32>,
    exercise: String,
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
    pub fn create(&self, lift: &Lift) -> Result<usize> {
        self.conn.execute(
            "INSERT INTO Lift (Exercise, Pounds) VALUES (?1, ?2)",
            params![lift.exercise, lift.pounds],
        )
    }

    pub fn read(&self, lift: &Lift) -> Result<Lifts> {
        let mut stmt = self
            .conn
            .prepare("SELECT * FROM Lift WHERE Exercise = ?1")?;
        let lift_iter = stmt.query_map(params![lift.exercise], |row| {
            Ok(Lift {
                id: row.get(0)?,
                exercise: row.get(1)?,
                pounds: row.get(2)?,
                create_date: row.get(3)?,
            })
        })?;

        let mut lifts = Vec::new();
        for lift in lift_iter {
            lifts.push(lift?);
        }

        Ok(Lifts {
            lifts: if lifts.is_empty() { None } else { Some(lifts) },
        })
    }

    pub fn delete(&self, lift: &Lift) -> Result<usize> {
        self.conn
            .execute("DELETE FROM Lift WHERE Id = ?1", params![lift.id])
    }
}
