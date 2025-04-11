use crate::{
    db::Database,
    models::{self, models::table_map::CastRowToInsertString},
};
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
use serde::{Deserialize, Serialize};
use serde_json::Value as SerdeValue;
use crate::handlers::errors::handler_errors::PayloadError;

#[derive(Serialize)]
pub struct ResponseMessage {
    message: String,
}

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

#[post("/create")]
pub async fn create(payload: web::Json<Payload>) -> impl Responder {
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

    let sql = models::models::table_map::Lift::cast_rows(&payload).unwrap();

    // Insert a new record into the database
    match db.create(&sql) {
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
