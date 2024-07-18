use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use env_logger::Env;
mod cors;
mod db;
use db::{Database, Lift};
use log::error;

#[get("/create")]
async fn create(query: web::Query<Lift>) -> impl Responder {
    let db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().body("Failed to find database.");
        }
    };

    // Insert a lift into the db
    match db.create(&query) {
        Ok(_) => HttpResponse::Ok().body("Lift successfully inserted into the database."),
        Err(err) => {
            error!("Failed to insert a lift into the database: {}", err);
            return HttpResponse::InternalServerError().body("Failed to insert lift.");
        }
    }
}

#[get("/read")]
async fn read(query: web::Query<Lift>) -> impl Responder {
    let db = match Database::new() {
        Ok(db) => db,
        Err(err) => {
            error!("Failed to find the main.db file for the database!: {}", err);
            return HttpResponse::InternalServerError().body("Failed to find database.");
        }
    };

    // Insert a lift into the db
    match db.read(&query) {
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
        App::new().wrap(cors).service(create).service(read)
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
