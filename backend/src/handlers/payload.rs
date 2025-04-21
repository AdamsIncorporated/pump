use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug)]
pub struct DataRow {
    pub fields: HashMap<String, Value>,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct CreatePayload {
    pub table_name: Option<String>,
    pub data: Option<Vec<DataRow>>,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct ReadPayload {
    pub table_name: Option<String>,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct UpdatePayload {
    pub table_name: Option<String>,
    pub data: Option<Vec<DataRow>>,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct DeletePayload {
    pub table_name: Option<String>,
    pub ids: Option<Vec<u32>>,
}
