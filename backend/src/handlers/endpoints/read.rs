use crate::db::Database;
use crate::handlers::payload::ReadPayload;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
use serde_json::json;

#[post("/read")]
pub async fn read(payload: web::Json<ReadPayload>) -> impl Responder {
    // Check if table name payload key is null
    let table_name = match &payload.table_name {
        Some(table_name) => table_name,
        None => {
            error!("Payload must contain both 'table_name' key.");
            return HttpResponse::BadRequest().json("Payload must contain both 'table_name' key.");
        }
    };

    // create a new instanc eof databawse
    let mut db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().json("Failed to find database.");
        }
    };
    let sql = "SELECT * FROM ? ORDER BY Id DESC".into();

    // return error or a json response
    match db.read_all_as_json(sql, &[table_name]) {
        Ok(json) => HttpResponse::Ok().json(json),
        Err(error) => {
            error!(
                "Fetching data did not work because of rusqlite error: {}",
                error
            );
            return HttpResponse::InternalServerError().json(format!(
                "Internal database error on table '{}': SQL: {}",
                table_name, sql
            ));
        }
    }
}
