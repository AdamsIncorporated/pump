use std::{collections::HashMap, ops::Deref};

use crate::db::Database;
use crate::handlers::payload::CreatePayload;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
use serde_json::Value;

#[post("/create")]
pub async fn create(payload: web::Json<CreatePayload>) -> impl Responder {
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

    payload.data.map(|rows| {
        rows.into_iter().map(|row| {
            let insert_dict = row.fields.into_iter().map(|(key, value)| {
                let string_value = match value {
                    Value::Array(arr) => format!("{:?}", arr),
                    Value::Bool(b) => b.to_string(),
                    Value::Number(n) => n.to_string(),
                    Value::Null => "null".to_string(),
                    Value::Object(obj) => format!("{:?}", obj),
                    Value::String(s) => s,
                };
                (key, string_value)
            }).collect::<HashMap<String, String>>();

            let column_name_str = insert_dict
                .keys()
                .map(|s| s.to_string())
                .collect::<Vec<String>>()
                .join(", ");
        })
    }
    
    HttpResponse::Ok().json(format!("Rows inserted into {}", table_name))
)

}
