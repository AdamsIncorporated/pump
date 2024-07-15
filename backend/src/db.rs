use rusqlite::{params, Connection, Result};

#[derive(Debug)]
struct Person {
    id: i32,
    name: String,
    data: Vec<u8>,
}

struct Database {
    conn: Connection,
}

impl Database {
    fn new(db_file: &str) -> Result<Database> {
        let conn = Connection::open(db_file)?;
        Ok(Database { conn })
    }

    fn create_table(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS person (
                  id    INTEGER PRIMARY KEY,
                  name  TEXT NOT NULL,
                  data  BLOB
                  )",
            [],
        )?;
        Ok(())
    }

    fn insert_person(&self, name: &str, data: &[u8]) -> Result<usize> {
        self.conn.execute(
            "INSERT INTO person (name, data) VALUES (?1, ?2)",
            params![name, data],
        )
    }

    fn update_person(&self, id: i32, name: &str, data: &[u8]) -> Result<usize> {
        self.conn.execute(
            "UPDATE person SET name = ?1, data = ?2 WHERE id = ?3",
            params![name, data, id],
        )
    }

    fn delete_person(&self, id: i32) -> Result<usize> {
        self.conn.execute("DELETE FROM person WHERE id = ?1", params![id])
    }

    fn get_person(&self, id: i32) -> Result<Option<Person>> {
        let mut stmt = self.conn.prepare("SELECT id, name, data FROM person WHERE id = ?1")?;
        let mut person_iter = stmt.query_map(params![id], |row| {
            Ok(Person {
                id: row.get(0)?,
                name: row.get(1)?,
                data: row.get(2)?,
            })
        })?;

        if let Some(person) = person_iter.next() {
            person
 
