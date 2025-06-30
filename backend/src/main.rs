use std::fs::OpenOptions;
use actix_web::middleware::Logger;
use actix_web::{App, HttpServer};
pub mod handlers;
use handlers::endpoints::create::create;
use handlers::endpoints::delete::delete;
use handlers::endpoints::read::read;
use handlers::endpoints::update::update;
use env_logger::fmt::Target;
use log::info;
pub mod cors;
pub mod db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let log_file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(".log")?;

    env_logger::builder()
        .target(Target::Pipe(Box::new(log_file)))
        .filter_level(log::LevelFilter::Info)
        .init();


    info!("Starting Actix Web server...");

    HttpServer::new(move || {
        let cors = cors::create_cors();

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .service(create)
            .service(read)
            .service(update)
            .service(delete)
    })
    .bind("127.0.0.1:5000")?
    .run()
    .await
}
