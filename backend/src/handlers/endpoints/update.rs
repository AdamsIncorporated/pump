use crate::db::Database;
use crate::handlers::payload::UpdatePayload;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
use rusqlite::ToSql;
use std::collections::HashMap;
use serde_json::Value;

#[post("/update")]
pub async fn update(payload: web::Json<UpdatePayload>) -> impl Responder {
    // check if payload is null
    if payload.table_name.is_none() || payload.data.is_none() {
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
    let rows = match &payload.data {
        Some(data) => data,
        None => {
            return HttpResponse::BadRequest().json("Payload must contain 'data' key.");
        }
    };

    for row in rows {
        let insert_dict: HashMap<String, String> = row
            .fields
            .iter()
            .map(|(key, value)| {
                let value_str = match value {
                    Value::Array(arr) => format!("{:?}", arr),
                    Value::Bool(b) => b.to_string(),
                    Value::Number(n) => n.to_string(),
                    Value::Null => "null".to_string(),
                    Value::Object(obj) => format!("{:?}", obj),
                    Value::String(s) => s.clone(),
                };
                (key.clone(), value_str)
            })
            .collect();
        let column_name_str = insert_dict
            .keys()
            .cloned()
            .collect::<Vec<String>>()
            .join(", ");
        let placeholders_str = std::iter::repeat("?")
            .take(insert_dict.len())
            .collect::<Vec<_>>()
            .join(", ");
        let sql = format!(
            "INSERT INTO {} ({}) VALUES ({})",
            table_name, column_name_str, placeholders_str
        );
        let values: Vec<&dyn ToSql> = insert_dict.values().map(|s| s as &dyn ToSql).collect();

        if let Err(err) = db.execute_sql(&sql, &values) {
            error!("Insert failed: {}", err);
            return HttpResponse::InternalServerError().json("Failed to insert row.");
        }
    }

    HttpResponse::Ok().json(format!("Rows inserted into {}", table_name))
}
