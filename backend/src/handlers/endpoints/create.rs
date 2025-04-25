use crate::db::Database;
use crate::handlers::payload::CreatePayload;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
use serde_json::Value;
use std::collections::HashMap;
use rusqlite::ToSql;

#[post("/create")]
pub async fn create(payload: web::Json<CreatePayload>) -> impl Responder {
    // Check if table name is provided
    let table_name = match &payload.table_name {
        Some(t) => t,
        None => {
            error!("Payload must contain 'table_name' key.");
            return HttpResponse::BadRequest().json("Payload must contain 'table_name' key.");
        }
    };

    // Connect to database
    let mut db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Database connection failed: {}", err);
            return HttpResponse::InternalServerError().json("Failed to connect to database.");
        }
    };

    // Check if data exists
    let rows = match &payload.rows {
        Some(data) => data,
        None => {
            return HttpResponse::BadRequest().json("Payload must contain 'rows' key.");
        }
    };

    for row in rows {
        let insert_dict: HashMap<String, String> = row
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
