use crate::db::Database;
use crate::handlers::payload::CreatePayload;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;
use serde_json::Value;

#[post("/create")]
pub async fn create(payload: web::Json<CreatePayload>) -> impl Responder {
    // check if payload is null
    if payload.table_name.is_none() || payload.data.is_none() {
        return HttpResponse::BadRequest()
            .json("Payload must contain both 'table_name' and 'data' keys.");
    }

    // create a new instanc eof database
    let mut db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().json("Failed to find database.");
        }
    };

    // fetch the table name
    let table_name = match &payload.table_name {
        Some(table_name) => table_name,
        None => {
            error!("No table name supplied in payload.");
            return HttpResponse::InternalServerError().json("No table name supplied in payload.");
        }
    };

    // create an insert clause
    match &payload.table_name {
        Some(table_name) => {
            while let Some(row) = &payload.data {
                if let Value::Object(map) = row {
                    if map.get("id").is_some() {
                        error!("Insert should not include 'id' field.");
                        return HttpResponse::InternalServerError()
                            .json("Failed to insert lift: 'id' field not allowed.");
                    }

                    // Get column names and corresponding values
                    let mut columns = Vec::new();
                    let mut values = Vec::new();

                    for (key, value) in map {
                        columns.push(key.to_string());

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

                        values.push(formatted_value);
                    }

                    let column_list = columns.join(", ");
                    let values_list = values.join(", ");

                    let sql = format!(
                        "INSERT INTO {} ({}) VALUES ({});",
                        table_name, column_list, values_list
                    );

                    match db.execute_sql(&sql, &[]) {
                        Ok(_) => (),
                        Err(error) => {
                            error!("Failed to insert a lift into the database: {}", error);
                            return HttpResponse::InternalServerError()
                                .json("Failed to insert lift.");
                        }
                    };
                }
            }
        }
        None => {
            error!("Missing `table_name` in payload.");
            return HttpResponse::BadRequest().json("Missing table_name in request.");
        }
    }

    return HttpResponse::Ok().json(format!("Rows inserted into {}", table_name));
}
