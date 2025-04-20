use crate::db::Database;
use crate::handlers::payload::DeletePayload;
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

    // create a new instance of database
    let mut db = match Database::new() {
        Ok(db) => db,
        Err(error) => {
            error!(
                "Failed to find the main.db file for the database!: {}",
                error
            );
            return HttpResponse::InternalServerError().json("Failed to find database.");
        }
    };

    // Get list of ids in a string tuple format
    let ids: Vec<String> = match payload.get_delete_ids() {
        Ok(ids) => ids.iter().map(|id| id.to_string()).collect(),
        Err(error) => {
            error!(
                "Failed to find table row id/s parsed from payload: {}",
                error
            );
            return HttpResponse::InternalServerError()
                .json("Failed to find table row id/s parsed from payload.");
        }
    };
    let id_placeholders = ids
        .iter()
        .map(|_| "?".to_string())
        .collect::<Vec<String>>()
        .join(", ");
    let sql = format!(
        "DELETE FROM {} WHERE ID IN ({})",
        table_name, id_placeholders
    );
    let mut params: Vec<&dyn rusqlite::types::ToSql> = Vec::new();

    for id in &ids {
        params.push(id);
    }

    // Execute sql
    match db.execute_sql(&sql, &params) {
        Ok(_) => {
            let ids_str = ids.join(", ");
            let message = format!(
                "Row id(s) [{}] successfully deleted from {}",
                ids_str, table_name
            );
            HttpResponse::Ok().json(message)
        }
        Err(err) => {
            let ids_str = ids.join(", ");
            error!(
                "Failed to delete row id/s [{}] into the database for table {}: {}",
                ids_str, table_name, err
            );
            return HttpResponse::InternalServerError().json(format!(
                "Failed to delete row id/s [{}] into the database for table {}.",
                ids_str, table_name,
            ));
        }
    }
}
