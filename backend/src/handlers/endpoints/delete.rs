use crate::handlers::requests::{DeletePayload, ResponseMessage};
use crate::db::Database;
use actix_web::{post, web, HttpResponse, Responder};
use log::error;

#[post("/delete")]
pub async fn delete(payload: web::Json<DeletePayload>) -> impl Responder {
    // check if payload is null
    if payload.table_name.is_none() {
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

    let table_name = match payload.get_table_name() {
        Ok(table_name) => table_name,
        Err(_) => {
            return HttpResponse::InternalServerError().json("Failed to table name parsed from payload.")
        }
    };
    let ids = match payload.get_delete_ids() {
        Ok(ids) => ids,
        Err(_) => {
            return HttpResponse::InternalServerError().json("Failed to table row id/s parsed from payload.")
        }
    };
    let ids_str = ids
        .iter()
        .map(|id| id.to_string()) 
        .collect::<Vec<String>>()
        .join(", ");

    let sql = format!("DELETE FROM {} WHERE ID IN ({})", table_name, ids_str);


    // Insert a new record into the database
    match db.delete(&sql) {
        Ok(_) => {
            let response = ResponseMessage {
                message: "Lift successfully inserted into the database.".into(),
            };
            HttpResponse::Ok().json(response)
        }
        Err(err) => {
            error!("Failed to insert a lift into the database: {}", err);
            return HttpResponse::InternalServerError().json("Failed to insert lift.");
        }
    }
}
