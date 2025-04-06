use actix_web::{App, HttpServer};
mod cors;
mod db;
use actix_web::middleware::Logger;
mod handlers;
use handlers::create::create;
use log::info;


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
