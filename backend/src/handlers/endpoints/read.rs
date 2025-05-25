use crate::db::Database;
use crate::handlers::payload::ReadPayload;
use actix_web::{get, web, HttpResponse, Responder};
use log::error;

#[get("/read")]
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
    let sql = format!("SELECT * FROM {} ORDER BY Id DESC", table_name);

    // return error or a json response
    match db.read_all_as_json(&sql, &[]) {
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
