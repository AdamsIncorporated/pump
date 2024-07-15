// models.rs
use serde::Serialize;

#[derive(Serialize)]
pub struct BenchResponse {
    pub bench: i32,
    pub message: String,
}
