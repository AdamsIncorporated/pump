use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use env_logger::Env;
mod cors;
mod models;
use models::BenchResponse;

#[get("/bench/{bench}")]
async fn index(bench: web::Path<i32>) -> impl Responder {
    let response = BenchResponse {
        bench: *bench,
        message: format!("The Bench value is {}", *bench),
    };
    HttpResponse::Ok().json(response)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    HttpServer::new(|| {
        let cors = cors::create_cors();
        App::new().wrap(cors).service(index)
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
