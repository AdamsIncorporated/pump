use crate::db::Database;
use crate::handlers::payload::DeletePayload;
use actix_web::{delete, web, HttpResponse, Responder};
use log::error;
use rusqlite::ToSql;

#[delete("/delete")]
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
    let id_placeholders = payload
        .ids
        .iter()
        .map(|_| "?".to_string())
        .collect::<Vec<String>>()
        .join(", ");
    let sql = format!(
        "DELETE FROM {} WHERE ID IN ({})",
        table_name, id_placeholders
    );
    let values: Vec<&dyn ToSql> = payload
        .ids
        .as_ref()
        .map(|vector| vector.iter().map(|s| s as &dyn ToSql).collect::<Vec<_>>())
        .unwrap_or_else(Vec::new);
    let ids_str: Option<Vec<String>> = payload
        .ids
        .as_ref()
        .map(|vector: &Vec<u32>| vector.iter().map(|num| num.to_string()).collect());

    // Execute sql
    match db.execute_sql(&sql, &values) {
        Ok(_) => {
            let message = format!(
                "Row id(s) [{:?}] successfully deleted from {}",
                ids_str, table_name
            );
            HttpResponse::Ok().json(message)
        }
        Err(err) => {
            error!(
                "Failed to delete row id/s [{:?}] into the database for table {}: {}",
                ids_str, table_name, err
            );
            return HttpResponse::InternalServerError().json(format!(
                "Failed to delete row id/s [{:?}] into the database for table {}.",
                ids_str, table_name,
            ));
        }
    }
}
