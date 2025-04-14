use crate::handlers::errors::handler_errors::PayloadError;
use serde::{Deserialize, Serialize};
use serde_json::Value as SerdeValue;

#[derive(Deserialize, Debug, Serialize)]
pub struct CreatePayload {
    pub table_name: Option<String>,
    pub data: Option<SerdeValue>,
}

impl CreatePayload {
    pub fn get_data_keys(&self) -> Result<Vec<String>, PayloadError> {
        self.data
            .as_ref()
            .and_then(|data| data.as_array())
            .and_then(|arr| arr.first())
            .and_then(|obj| obj.as_object())
            .map(|obj| obj.keys().cloned().collect())
            .ok_or_else(|| {
                PayloadError::JsonParseError("Failed to get keys from create payload.".to_string())
            })
    }
}

#[derive(Deserialize, Debug, Serialize)]
pub struct ReadPayload {
    pub table_name: Option<String>,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct DeletePayload {
    pub table_name: Option<String>,
    pub ids: Option<Vec<u32>>,
}

impl DeletePayload {
    pub fn get_delete_ids(&self) -> Result<&Vec<u32>, PayloadError> {
        self.ids.as_ref().ok_or_else(|| {
            PayloadError::JsonParseError("Failed to parse ids from delete payload".into())
        })
    }
}

#[derive(Serialize)]
pub struct ResponseMessage {
    pub message: String,
}
