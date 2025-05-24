use actix_session::{storage::RedisSessionStore, SessionMiddleware};
use actix_web::cookie::Key;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use std::sync::Mutex;
pub mod handlers;
use handlers::endpoints::auth::auth::{AppState, User};
use handlers::endpoints::create::create;
use handlers::endpoints::delete::delete;
use handlers::endpoints::read::read;
use handlers::endpoints::update::update;
use log::info;
pub mod cors;
pub mod db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    info!("Starting Actix Web server...");

    let users = vec![User {
        username: "admin".to_string(),
        password: bcrypt::hash("password", 4).unwrap(),
    }];

    let app_state = web::Data::new(AppState {
        users: Mutex::new(users),
    });

    let secret_key = Key::generate();

    let redis_store = match RedisSessionStore::new("redis://127.0.0.1:6379").await {
        Ok(store) => store,
        Err(e) => {
            eprintln!("Failed to connect to Redis: {:?}", e);
            panic!("Cannot continue without Redis!");
        }
    };

    HttpServer::new(move || {
        let cors = cors::create_cors();

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .wrap(SessionMiddleware::new(
                redis_store.clone(),
                secret_key.clone(),
            ))
            .app_data(app_state.clone())
            .service(create)
            .service(read)
            .service(update)
            .service(delete)
    })
    .bind("127.0.0.1:5000")?
    .run()
    .await
}
