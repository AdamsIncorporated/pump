use crate::db::Database;
use crate::handlers::requests::DeletePayload;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;

#[post("/delete")]
pub async fn delete(payload: web::Json<DeletePayload>) -> impl Responder {
    // Check if table name payload key is null
    let table_name = match &payload.table_name {
        Some(table_name) => table_name,
        None => {
            error!("Payload must contain both 'table_name' key.");
            return HttpResponse::BadRequest().json("Payload must contain both 'table_name' key.");
        }
    };

    // create a new instanc eof database
    let mut db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().json("Failed to find database.");
        }
    };

    // Get list of ids in a string tuple format
    let ids: Vec<String> = match payload.get_delete_ids() {
        Ok(ids) => ids.iter().map(|id| id.to_string()).collect(),
        Err(_) => {
            return HttpResponse::InternalServerError()
                .json("Failed to table row id/s parsed from payload.")
        }
    };
    let id_placeholders = ids.iter().map(|_| "?, ".to_string()).collect::<String>();

    let sql = format!("DELETE FROM ? WHERE ID IN ({})", id_placeholders);
    let mut params: Vec<&dyn rusqlite::types::ToSql> = Vec::new();

    params.push(table_name);

    for id in &ids {
        params.push(id);
    }

    // Execute sql
    match db.execute_sql(&sql, &params) {
        Ok(_) => HttpResponse::Ok().json("Lift successfully inserted into the database."),
        Err(err) => {
            error!("Failed to insert a lift into the database: {}", err);
            return HttpResponse::InternalServerError().json("Failed to insert lift.");
        }
    }
}
