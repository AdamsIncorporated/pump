use crate::handlers::requests::{CreatePayload, ResponseMessage};
use crate::models::models::CastRowToInsertString;
use crate::db::Database;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
use serde::Serialize;

#[post("/create")]
pub async fn create<T: CastRowToInsertString + Serialize>(payload: web::Json<CreatePayload>) -> impl Responder {
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

    let sql = T::cast_rows(&payload).unwrap();

    // Insert a new record into the database
    match db.execute_sql(&sql) {
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
