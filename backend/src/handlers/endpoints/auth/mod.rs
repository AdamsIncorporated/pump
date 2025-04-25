use actix_web::{web, HttpResponse, Responder};
use std::sync::Mutex;
use serde::{Deserialize, Serialize};
use actix_session::Session;
use bcrypt::verify;


#[derive(Deserialize, Debug, Serialize)]
pub struct  User {
    username: String,
    password: String
}

pub struct AppState {
    users: Mutex<Vec<User>>
}

pub async fn login(
    session: Session,
    form: web::Json<User>,
    data: web::Data<AppState>,
) -> impl Responder {
    let users = data.users.lock().unwrap();
    let user = users.iter().find(|u| u.username == form.username);

    if let Some(valid_user) = user {
        if verify(&form.password, &valid_user.password).unwrap() {
            // Store session information
            session.insert("user", form.username.clone()).unwrap();
            HttpResponse::Ok().body("Login successful")
        } else {
            HttpResponse::Unauthorized().body("Invalid credentials")
        }
    } else {
        HttpResponse::NotFound().body("User not found")
    }
}

pub async fn logout(session: Session) -> impl Responder {
    session.remove("user");
    HttpResponse::Ok().body("Logged out")
}