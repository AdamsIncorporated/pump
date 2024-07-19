use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use env_logger::Env;
mod cors;
mod db;
use actix_web::middleware::Logger;
use db::{Database, Lift};
use log::error;
use serde::Serialize;

#[derive(Serialize)]
struct ResponseMessage {
    message: String,
}

#[post("/create")]
async fn create(lift: web::Json<Lift>) -> impl Responder {
    let db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().json("Failed to find database.");
        }
    };

    // Insert a lift into the db
    match db.create(&lift) {
        Ok(_) => {
            let response = ResponseMessage {
                message: "Lift successfully inserted into the database.".into()
            };
            HttpResponse::Ok().json(response)
        }
        Err(err) => {
            error!("Failed to insert a lift into the database: {}", err);
            return HttpResponse::InternalServerError().json("Failed to insert lift.");
        }
    }
}

#[get("/read")]
async fn read(lift: web::Query<Lift>) -> impl Responder {
    let db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().body("Failed to find database.");
        }
    };

    // Insert a lift into the db
    match db.read(&lift) {
        Ok(response) => HttpResponse::Ok().json(response),
        Err(err) => {
            error!("Failed to pull lift rows from the database: {}", err);
            return HttpResponse::InternalServerError().body("Failed to pull lift rows.");
        }
    }
}

#[get("/delete")]
async fn delete(query: web::Query<Lift>) -> impl Responder {
    let db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().body("Failed to find database.");
        }
    };

    // Insert a lift into the db
    match db.delete(&query) {
        Ok(response) => HttpResponse::Ok().json(response),
        Err(err) => {
            error!("Failed to pull lift rows from the database: {}", err);
            return HttpResponse::InternalServerError().body("Failed to pull lift rows.");
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    HttpServer::new(|| {
        let cors = cors::create_cors();
        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .service(create)
            .service(read)
            .service(create)
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
