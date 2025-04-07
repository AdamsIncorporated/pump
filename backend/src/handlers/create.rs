use crate::db::Database;
use crate::models::models::create_table_map;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
use serde::{Deserialize, Serialize};
use serde_json::Value as SerdeValue;
use std::fmt;

#[derive(Debug)]
pub enum CreatePayloadKeyError {
    JsonParseError(String),
    MissingFieldError(String),
}

impl fmt::Display for CreatePayloadKeyError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            CreatePayloadKeyError::JsonParseError(msg) => write!(f, "JSON Parse Error: {}", msg),
            CreatePayloadKeyError::MissingFieldError(msg) => {
                write!(f, "Missing Field Error: {}", msg)
            }
        }
    }
}

impl std::error::Error for CreatePayloadKeyError {}

#[derive(Serialize)]
pub struct ResponseMessage {
    message: String,
}

#[derive(Deserialize)]
pub struct CreatePayload {
    pub table_name: Option<SerdeValue>,
    pub data: Option<SerdeValue>,
}

fn process_payload(payload: CreatePayload) {
    let table_map = create_table_map();

    if let Some(table_fn) = table_map.get(payload.table_name) {
        
    }
}

impl CreatePayload {
    pub fn get_table_name(&self) -> Result<&str, CreatePayloadKeyError> {
        self.table_name
            .as_ref()
            .ok_or_else(|| {
                CreatePayloadKeyError::MissingFieldError(
                    "Table name is missing from payload.".to_string(),
                )
            })?
            .as_str()
            .ok_or_else(|| {
                CreatePayloadKeyError::JsonParseError(
                    "Failed to convert table name to a string.".to_string(),
                )
            })
    }

    pub fn get_data_keys(&self) -> Result<Vec<String>, CreatePayloadKeyError> {
        self.data
            .as_ref()
            .and_then(|data| data.as_array())
            .and_then(|arr| arr.get(0))
            .and_then(|obj| obj.as_object())
            .map(|obj| obj.keys().cloned().collect())
            .ok_or_else(|| {
                CreatePayloadKeyError::JsonParseError(
                    "Failed to get keys from create payload.".to_string(),
                )
            })
    }
}

#[post("/create")]
pub async fn create(payload: web::Json<CreatePayload>) -> impl Responder {
    // check if payload is null
    if payload.table_name.is_none() || payload.data.is_none() {
        return HttpResponse::BadRequest()
            .json("Payload must contain both 'table_name' and 'data' keys.");
    }

    // create a new instanc eof database
    let mut db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().json("Failed to find database.");
        }
    };

    // Insert a new record into the database
    match db.create(&payload) {
        Ok(_) => {
            let response = ResponseMessage {
                message: "Lift successfully inserted into the database.".into(),
            };
            HttpResponse::Ok().json(response)
        }
        Err(err) => {
            error!("Failed to insert a lift into the database: {}", err);
            return HttpResponse::InternalServerError().json("Failed to insert lift.");
        }
    }
}
