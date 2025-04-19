use crate::db::Database;
use crate::handlers::requests::ReadPayload;
use crate::models::models::DataVariant;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;

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
    let sql = "SELECT * FROM ?".into();
    let rows: Vec<DataVariant> = match db.read_rows::<DataVariant>(&sql, &[table_name]) {
        Ok(rows) => rows,
        Err(error) => {
            let message = format!(
                "Database error fetching all rows for table {}: {}",
                table_name, error
            );
            error!("{}", message);
            return HttpResponse::InternalServerError().json(message);
        }
    };
    return HttpResponse::Ok().json(rows);
}
