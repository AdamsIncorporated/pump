use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Weight {
    pub id: Option<i32>,
    pub created_at: Option<NaiveDateTime>,
    pub weight_lbs: f64,
}
