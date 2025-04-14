use rusqlite::{Connection, Error as RusqliteError, Params};
use std::fmt;

#[derive(Debug)]
pub enum DatabaseError {
    DatabaseOpenError(RusqliteError),
    TransactionStartError(RusqliteError),
    PrepareStatementError(RusqliteError),
    ExecuteSqlError(RusqliteError),
    CommitTransactionError(RusqliteError),
    RollbackTransactionError(RusqliteError),
    SqlQueryError { sql: String, source: RusqliteError },
    ConfigurationError(String),
    NotFoundError(String),
    InvalidInput { field: String, details: String },
}

impl fmt::Display for DatabaseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            DatabaseError::DatabaseOpenError(e) => write!(f, "Failed to open database: {}", e),
            DatabaseError::TransactionStartError(e) => {
                write!(f, "Failed to start transaction: {}", e)
            }
            DatabaseError::PrepareStatementError(e) => {
                write!(f, "Failed to prepare SQL statement: {}", e)
            }
            DatabaseError::ExecuteSqlError(e) => write!(f, "Failed to execute SQL: {}", e),
            DatabaseError::CommitTransactionError(e) => {
                write!(f, "Failed to commit transaction: {}", e)
            }
            DatabaseError::RollbackTransactionError(e) => {
                write!(f, "Failed to rollback transaction: {}", e)
            }
            DatabaseError::SqlQueryError { sql, source } => {
                write!(f, "SQL query '{}' failed: {}", sql, source)
            }
            DatabaseError::ConfigurationError(msg) => write!(f, "Configuration error: {}", msg),
            DatabaseError::NotFoundError(msg) => write!(f, "Not found: {}", msg),
            DatabaseError::InvalidInput { field, details } => {
                write!(f, "Invalid input for field '{}': {}", field, details)
            }
        }
    }
}

// Implement the Error trait for CustomError
impl std::error::Error for DatabaseError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            DatabaseError::DatabaseOpenError(e) => Some(e),
            DatabaseError::TransactionStartError(e) => Some(e),
            DatabaseError::PrepareStatementError(e) => Some(e),
            DatabaseError::ExecuteSqlError(e) => Some(e),
            DatabaseError::CommitTransactionError(e) => Some(e),
            DatabaseError::RollbackTransactionError(e) => Some(e),
            DatabaseError::SqlQueryError { source, .. } => Some(source),
            _ => None,
        }
    }
}

pub type Result<T> = std::result::Result<T, DatabaseError>;

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new(path: &str) -> Result<Self> {
        Connection::open(path)
            .map(|conn| Database { conn })
            .map_err(DatabaseError::DatabaseOpenError)
    }

    pub fn execute_sql<P: Params>(&mut self, sql: &String, params: Option<Vec<P>>) -> Result<usize> {
        let transaction: rusqlite::Transaction<'_> = match self.conn.transaction() {
            Ok(tx) => tx,
            Err(e) => return Err(DatabaseError::TransactionStartError(e)),
        };

        let mut stmt = match &transaction.prepare(&sql) {
            Ok(s) => s,
            Err(e) => {
                transaction.rollback();
                return Err(DatabaseError::PrepareStatementError(e));
            }
        };

        let result = match stmt.execute([]) {
            Ok(r) => r,
            Err(e) => {
                transaction.rollback();
                return Err(DatabaseError::ExecuteSqlError(e));
            }
        };

        match transaction.commit() {
            Ok(_) => Ok(result),
            Err(e) => Err(DatabaseError::CommitTransactionError(e)),
        }
    }
}