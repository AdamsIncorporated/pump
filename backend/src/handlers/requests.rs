use crate::handlers::errors::handler_errors::PayloadError;
use serde::{Deserialize, Serialize};
use serde_json::Value as SerdeValue;

#[derive(Deserialize)]
pub struct Payload {
    pub table_name: Option<SerdeValue>,
    pub data: Option<SerdeValue>,
}

impl Payload {
    pub fn get_table_name(&self) -> Result<&str, PayloadError> {
        self.table_name
            .as_ref()
            .ok_or_else(|| {
                PayloadError::MissingFieldError("Table name is missing from payload.".to_string())
            })?
            .as_str()
            .ok_or_else(|| {
                PayloadError::JsonParseError(
                    "Failed to convert table name to a string.".to_string(),
                )
            })
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
