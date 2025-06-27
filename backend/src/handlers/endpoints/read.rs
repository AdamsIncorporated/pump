use crate::db::Database;
use actix_web::{get, web, HttpResponse, Responder};
use log::error;

#[derive(serde::Deserialize)]
pub struct ReadParams {
    table_name: String
}

#[get("/read")]
pub async fn read(query: web::Query<ReadParams>) -> impl Responder {
    let table_name =  &query.table_name;

    let mut db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to connect to database!: {}", err);
            return HttpResponse::InternalServerError().json("Failed to find database.");
        }
    };

    let sql = format!("SELECT * FROM {} ORDER BY Id DESC", table_name);

    match db.read_all_as_json(&sql, None) {
        Ok(json) => HttpResponse::Ok().json(json),
        Err(error) => {
            error!(
                "Fetching data did not work because of rusqlite error: {}",
                error
            );
            return HttpResponse::InternalServerError().json(format!(
                "Internal database error on table '{}': SQL: {}",
                table_name, sql
            ));
        }
    }
}
