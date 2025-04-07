use serde::{Deserialize, Serialize};

pub mod table_map {
    use super::*;

    // Lift struct definition
    #[derive(Serialize, Deserialize, Debug)]
    pub struct Lift {
        pub id: Option<i32>,
        pub created_at: Option<String>,
        pub exercise: Option<String>,
        pub sets: Option<i32>,
        pub reps: Option<i32>,
        pub weight_lbs: Option<f64>,
    }

    // Calories struct definition
    #[derive(Serialize, Deserialize, Debug)]
    pub struct Calories {
        pub id: Option<i32>,
        pub created_at: Option<String>,
        pub carbs: Option<f64>,
        pub protein: Option<f64>,
        pub saturated_fat: Option<f64>,
        pub trans_fat: Option<f64>,
        pub monounsaturated_fat: Option<f64>,
        pub polyunsaturated_fat: Option<f64>,
        pub total_calories: i32,
    }

    // Weight struct definition
    #[derive(Serialize, Deserialize, Debug)]
    pub struct Weight {
        pub id: Option<i32>,
        pub created_at: Option<String>,
        pub weight_lbs: f64,
    }
}
