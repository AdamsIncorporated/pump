use crate::db::Database;
use crate::handlers::endpoints::utils::convert_to_mysql;
use crate::handlers::payload::UpdatePayload;
use actix_web::{put, web, HttpResponse, Responder};
use log::error;
use mysql::Value as MySqlValue;
use serde_json::{json, Value as JsonValue};
use std::collections::HashMap;

#[put("/update")]
pub async fn update(payload: web::Json<UpdatePayload>) -> impl Responder {
    // check if payload is null
    if payload.table_name.is_none() || payload.rows.is_none() {
        return HttpResponse::BadRequest()
            .json("Payload must contain both 'table_name' and 'data' keys.");
    }

    let table_name = match &payload.table_name {
        Some(table_name) => table_name,
        None => {
            error!("No table name supplied in payload.");
            return HttpResponse::InternalServerError().json("No table name supplied in payload.");
        }
    };

    // create a new instanc eof database
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

    // Check if data exists
    let rows: &Vec<HashMap<String, JsonValue>> = match &payload.rows {
        Some(rows) => rows,
        None => {
            return HttpResponse::BadRequest().json("Payload must contain 'rows' key.");
        }
    };

    for row in rows {
        let insert_dict: HashMap<String, MySqlValue> = convert_to_mysql(row);
        let mut params = Vec::with_capacity(insert_dict.len());
        let mut update_clause_parts = Vec::with_capacity(insert_dict.len() - 1);
        let mut id_value_opt = None;

        for (key, value) in &insert_dict {
            if key == "id" {
                id_value_opt = Some(value.clone());
            } else {
                update_clause_parts.push(format!("{} = ?", key));
                params.push(value.clone());
            }
        }

        let update_clause = update_clause_parts.join(", ");
        let sql = format!("UPDATE {} SET {} WHERE id = ?", table_name, update_clause);

        if let Some(id_value) = id_value_opt {
            params.push(id_value);
        } else {
            return HttpResponse::BadRequest().json("ID must be provided in the row.");
        }

        if let Err(err) = db.execute_sql(&sql, params) {
            error!("Update failed: {}", err);
            return HttpResponse::InternalServerError().json(json!({
                "error": "Update failed for row.",
                "sql": sql
            }));
        }
    }

    HttpResponse::Ok().json(format!("Rows updated into {}", table_name))
}
