use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

#[derive(Deserialize, Debug, Serialize)]
pub struct CreatePayload {
    pub table_name: Option<String>,
    pub rows: Option<Vec<HashMap<String, Value>>>,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct UpdatePayload {
    pub table_name: Option<String>,
    pub rows: Option<Vec<HashMap<String, Value>>>,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct DeletePayload {
    pub table_name: Option<String>,
    pub ids: Option<Vec<u32>>,
}
