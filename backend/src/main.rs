use actix_web::{App, HttpServer};
pub mod handlers;
use config::config::setup_logger;
use handlers::endpoints::create::create;
use handlers::endpoints::delete::delete;
use handlers::endpoints::read::read;
use handlers::endpoints::update::update;
use log::info;
pub mod config;
pub mod cors;
pub mod db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    setup_logger().expect("Failed to initialize logger");
    info!("Starting Actix Web server...");

    HttpServer::new(move || {
        let cors = cors::create_cors();

        App::new()
            .wrap(cors)
            .service(create)
            .service(read)
            .service(update)
            .service(delete)
    })
    .bind("127.0.0.1:5000")?
    .run()
    .await
}
