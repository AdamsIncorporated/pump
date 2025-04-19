use crate::db::Database;
use crate::handlers::payload::UpdatePayload;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
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

    while let Some(row) = &payload.data {
        if let Value::Object(map) = row {
            if let Some(id_value) = map.get("id") {
                let id = match id_value {
                    Value::String(s) => s.to_string(),
                    Value::Number(n) => n.to_string(),
                    _ => {
                        error!("'id' field is not a string or number.");
                        return HttpResponse::InternalServerError().json("Invalid 'id' field.");
                    }
                };

                let column_names = match payload.get_data_keys() {
                    Ok(column_names) => column_names,
                    Err(_) => {
                        error!("Empty column names supplied in json post request.");
                        return HttpResponse::InternalServerError()
                            .json("Empty column names supplied in json post request.");
                    }
                };

                let mut set_clauses = Vec::new();

                for key in &column_names {
                    if key == "id" {
                        continue;
                    }

                    if let Some(value) = map.get(key) {
                        let formatted_value = match value {
                            Value::String(s) => format!("'{}'", s.replace('\'', "''")),
                            Value::Number(n) => n.to_string(),
                            Value::Bool(b) => b.to_string(),
                            Value::Null => "NULL".to_string(),
                            _ => {
                                error!("Unsupported value type for key: {}", key);
                                return HttpResponse::InternalServerError()
                                    .json(format!("Unsupported value type for key: {}", key));
                            }
                        };
                        set_clauses.push(format!("{} = {}", key, formatted_value));
                    };
                }

                let set_clause_str = set_clauses.join(", ");
                let sql = format!(
                    "UPDATE {} SET {} WHERE id = {};",
                    table_name, set_clause_str, id
                );

                // Insert a new record into the database
                match db.execute_sql(&sql, &[]) {
                    Ok(_) => (),
                    Err(err) => {
                        error!("Failed to insert a lift into the database: {}", err);
                        return HttpResponse::InternalServerError().json("Failed to insert lift.");
                    }
                }
            } else {
                error!("Failed to find id field.");
                return HttpResponse::InternalServerError().json("Failed to find id field.");
            }
        }
    }

    return HttpResponse::Ok().json("Inserted data into table");
}
