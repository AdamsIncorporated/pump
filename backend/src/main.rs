use actix_web::{App, HttpServer};
use env_logger::Env;
mod cors;
mod db;
use actix_web::middleware::Logger;
mod handlers;
use handlers::create::create;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
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
