use crate::handlers::requests::CreatePayload;
use crate::db::Database;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;

#[post("/create")]
pub async fn create<T>(payload: web::Json<CreatePayload>) -> impl Responder {
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

    let rows = Vec<T> = payload.data.

    // Insert a new record into the database
    match db.execute_sql(&sql, &[]) {
        Ok(_) => {
            HttpResponse::Ok().json("Lift successfully inserted into the database.")
        }
        Err(err) => {
            error!("Failed to insert a lift into the database: {}", err);
            return HttpResponse::InternalServerError().json("Failed to insert lift.");
        }
    }
}
