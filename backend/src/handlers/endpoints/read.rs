use crate::db::Database;
use crate::handlers::requests::{ReadPayload, ResponseMessage};
use actix_web::{post, web, HttpResponse, Responder};
use log::error;

#[post("/read")]
pub async fn read(payload: web::Json<ReadPayload>) -> impl Responder {
    // Check if table name payload key is null
    let table_name= match &payload.table_name {
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
    let sql = format!("SELECT * FROM {}", table_name);

    // Insert a new record into the database
    match db.execute_sql(&sql, []) {
        Ok(_) => {
            let response = ResponseMessage {
                message: format!("{} into the database.", table_name),
            };
            HttpResponse::Ok().json(response)
        }
        Err(err) => {
            let message = format!(
                "Failed to read all rows from table: {}, Error: {}",
                table_name, err
            );
            error!("{}", message);
            return HttpResponse::InternalServerError().json(message);
        }
    }
}
