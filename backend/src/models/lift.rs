use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Debug)]
pub struct Lift {
    pub id: Option<i32>,
    pub created_at: Option<NaiveDateTime>,
    pub exercise: Option<String>,
    pub sets: Option<i32>,
    pub reps: Option<i32>,
    pub weight_lbs: Option<f64>,
}
