use chrono::NaiveDateTime;
use rusqlite::Row;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

pub mod table_map {
    use super::*;
    
    // Trait that defines how rows are mapped to structs
    pub trait TableRow {
        fn from_row(row: &rusqlite::Row) -> Result<Self, rusqlite::Error>
        where
            Self: Sized;
    }

    // Lift struct definition
    #[derive(Serialize, Deserialize, Debug)]
    pub struct Lift {
        pub id: Option<i32>,
        pub created_at: Option<NaiveDateTime>,
        pub exercise: Option<String>,
        pub sets: Option<i32>,
        pub reps: Option<i32>,
        pub weight_lbs: Option<f64>,
    }

    // Calories struct definition
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

    // Weight struct definition
    #[derive(Serialize, Deserialize, Debug)]
    pub struct Weight {
        pub id: Option<i32>,
        pub created_at: Option<NaiveDateTime>,
        pub weight_lbs: f64,
    }

    // Function to create a map of table names to new struct instances
    pub fn create_table_map() -> HashMap<&'static str, fn() -> Box<dyn TableRow>> {
        let table_map: HashMap<&'static str, fn() -> Box<dyn TableRow>> = [
            ("lift", || Box::new(Lift::new())),
            ("calories", || Box::new(Calories::new())),
            ("weight", || Box::new(Weight::new())),
        ]
        .iter()
        .cloned()
        .collect();

        table_map
    }

    // Implement TableRow for each struct to map rows to struct instances
    impl TableRow for Lift {
        fn from_row(row: &rusqlite::Row) -> Result<Self, rusqlite::Error> {
            Ok(Lift {
                id: row.get(0)?,
                created_at: row.get(1)?,
                exercise: row.get(2)?,
                sets: row.get(3)?,
                reps: row.get(4)?,
                weight_lbs: row.get(5)?,
            })
        }
    }

    impl TableRow for Calories {
        fn from_row(row: &rusqlite::Row) -> Result<Self, rusqlite::Error> {
            Ok(Calories {
                id: row.get(0)?,
                created_at: row.get(1)?,
                carbs: row.get(2)?,
                protein: row.get(3)?,
                saturated_fat: row.get(4)?,
                trans_fat: row.get(5)?,
                monounsaturated_fat: row.get(6)?,
                polyunsaturated_fat: row.get(7)?,
                total_calories: row.get(8)?,
            })
        }
    }

    impl TableRow for Weight {
        fn from_row(row: &rusqlite::Row) -> Result<Self, rusqlite::Error> {
            Ok(Weight {
                id: row.get(0)?,
                created_at: row.get(1)?,
                weight_lbs: row.get(2)?,
            })
        }
    }

    // New instance methods for each struct
    impl Lift {
        pub fn new() -> Self {
            Lift {
                id: None,
                created_at: None,
                exercise: None,
                sets: None,
                reps: None,
                weight_lbs: None,
            }
        }
    }

    impl Calories {
        pub fn new() -> Self {
            Calories {
                id: None,
                created_at: None,
                carbs: None,
                protein: None,
                saturated_fat: None,
                trans_fat: None,
                monounsaturated_fat: None,
                polyunsaturated_fat: None,
                total_calories: 0,
            }
        }
    }

    impl Weight {
        pub fn new() -> Self {
            Weight {
                id: None,
                created_at: None,
                weight_lbs: 0.0,
            }
        }
    }
}
