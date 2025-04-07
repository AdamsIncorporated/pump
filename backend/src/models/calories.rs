use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Calories {
    pub id: Option<i32>,
    pub created_at: Option<NaiveDateTime>,
    pub carbs: Option<f64>,
    pub protein: Option<f64>,
    pub saturated_fat: Option<f64>,
    pub trans_fat: Option<f64>,
    pub monounsaturated_fat: Option<f64>,
    pub polyunsaturated_fat: Option<f64>,
    pub total_calories: i32,
}
