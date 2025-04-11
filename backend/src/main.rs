use actix_web::middleware::Logger;
use actix_web::{App, HttpServer};
pub mod handlers;
pub mod models;
use handlers::endpoints::create::create;
use log::info;
pub mod cors;
pub mod db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    info!("Starting Actix Web server...");

    HttpServer::new(|| {
        let cors = cors::create_cors();
        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .service(create)
    })
    .bind("127.0.0.1:5000")?
    .run()
    .await
}
