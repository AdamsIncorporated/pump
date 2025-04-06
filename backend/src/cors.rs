use actix_web::http::header;
use actix_cors::Cors;

pub fn create_cors() -> Cors {
    Cors::default()
        .allowed_origin("http://localhost:8080")
        .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
        .allowed_headers(vec![header::CONTENT_TYPE, header::AUTHORIZATION])
        .max_age(3600)
}

