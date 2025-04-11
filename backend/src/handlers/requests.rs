use crate::handlers::errors::handler_errors::PayloadError;
use serde::{Deserialize, Serialize};
use serde_json::Value as SerdeValue;
    
#[derive(Deserialize, Debug)]
pub struct CreatePayload {
    pub table_name: Option<String>,
    pub data: Option<SerdeValue>,
}

#[derive(Deserialize, Debug)]
pub struct DeletePayload {
    pub table_name: Option<String>,
    pub ids: Option<Vec<u32>>,
}

impl DeletePayload {
    pub fn get_table_name(&self) -> Result<&str, PayloadError> {
        match &self.table_name {
            Some(table_name) => Ok(table_name),
            None => Err(PayloadError::JsonParseError(
                "Failed to parse json create payload table name.".into(),
            )),
        }
    }
}

impl CreatePayload {
    pub fn get_table_name(&self) -> Result<&str, PayloadError> {
        match &self.table_name {
            Some(table_name) => Ok(table_name),
            None => Err(PayloadError::JsonParseError(
                "Failed to parse json create payload table name.".into(),
            )),
        }
    }

    pub fn get_data_keys(&self) -> Result<Vec<String>, PayloadError> {
        self.data
            .as_ref()
            .and_then(|data| data.as_array())
            .and_then(|arr| arr.get(0))
            .and_then(|obj| obj.as_object())
            .map(|obj| obj.keys().cloned().collect())
            .ok_or_else(|| {
                PayloadError::JsonParseError("Failed to get keys from create payload.".to_string())
            })
    }
}

#[derive(Serialize)]
pub struct ResponseMessage {
    pub message: String,
}
