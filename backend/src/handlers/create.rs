use crate::db::Database;
use actix_web::{error::ErrorBadRequest, post, web, HttpResponse, Responder};
use log::error;
use serde::{Deserialize, Serialize};
use serde_json::Value as SerdeValue;

#[derive(Serialize)]
pub struct ResponseMessage {
    message: String,
}

#[derive(Deserialize)]
pub struct CreatePayload {
    pub table_name: Option<SerdeValue>,
    pub data: Option<SerdeValue>,
}

impl CreatePayload {
    pub fn get_table_name(&self) -> Result<&str, actix_web::Error> {
        self.table_name
            .as_ref()
            .ok_or_else(|| ErrorBadRequest("Missing table name"))?
            .as_str()
            .ok_or_else(|| ErrorBadRequest("Table name is not a string"))
    }

    pub fn get_data_keys(&self) -> Result<Vec<String>, actix_web::Error> {
        self.data
            .as_ref()
            .and_then(|v| v.as_object())
            .map(|obj| obj.keys().cloned().collect())
            .ok_or_else(|| actix_web::error::ErrorInternalServerError("Failed to get keys"))
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
    let db = match Database::new() {
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
