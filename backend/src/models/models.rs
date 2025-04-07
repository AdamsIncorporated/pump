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

#[derive(Serialize, Deserialize, Debug)]
pub struct Weight {
    pub id: Option<i32>,
    pub created_at: Option<NaiveDateTime>,
    pub weight_lbs: f64,
}

pub enum ModelMap {
    Lift(Lift),
    Calories(Calories),
    Weight(Weight),
}

impl ModelMap {
    // This function takes a string and returns a Result with the deserialized struct
    pub fn from_str(data_type: &str, json_data: &str) -> Result<ModelMap, String> {
        match data_type {
            "lift" => {
                let lift: Result<Lift, _> = serde_json::from_str(json_data);
                lift.map(ModelMap::Lift).map_err(|e| e.to_string())
            }
            "calories" => {
                let calories: Result<Calories, _> = serde_json::from_str(json_data);
                calories.map(ModelMap::Calories).map_err(|e| e.to_string())
            }
            "weight" => {
                let weight: Result<Weight, _> = serde_json::from_str(json_data);
                weight.map(ModelMap::Weight).map_err(|e| e.to_string())
            }
            _ => Err("Invalid data type".to_string()),
        }
    }
}
