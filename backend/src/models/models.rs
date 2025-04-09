use rusqlite::{Result as SQLResult, Row};
use serde::{Deserialize, Serialize};
use serde_json::Value as SerdeValue;

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

    pub trait FromRow: Sized {
        fn from_row(row: &Row) -> SQLResult<Self>;
    }

    trait CastRowToInsertString {
        fn cast_rows(payload: SerdeValue, table_name: &str, column_names: &[&str]) -> Result<String, Box<dyn std::error::Error>>;
    }
    impl CastRowToInsertString for Lift {
        fn cast_rows(payload: SerdeValue, table_name: &str, column_names: &[&str]) -> Result<String, Box<dyn std::error::Error>> {
            let data = payload.as_array().ok_or("Payload 'data' is not an array")?;
    
            let mut insert_statements = Vec::new();
    
            for row in data.iter() {
                if let SerdeValue::Object(row_obj) = row {
                    let mut values = Vec::new();
                    for column in column_names {
                        if let Some(value) = row_obj.get(*column) {
                            match value {
                                SerdeValue::Null => values.push("NULL".to_string()),
                                SerdeValue::Bool(b) => values.push(b.to_string()),
                                SerdeValue::Number(n) => values.push(n.to_string()),
                                SerdeValue::String(s) => values.push(format!("'{}'", s.replace("'", "''"))), // Escape single quotes
                                SerdeValue::Array(_) | SerdeValue::Object(_) => {
                                    return Err(format!("Unsupported JSON type for column '{}': {:?}", column, value).into());
                                }
                            }
                        } else {
                            return Err(format!("Missing column '{}' in row: {:?}", column, row_obj).into());
                        }
                    }
                    let columns_str = column_names.join(", ");
                    let values_str = values.join(", ");
                    insert_statements.push(format!("INSERT INTO {} ({}) VALUES ({});", table_name, columns_str, values_str));
                } else {
                    return Err("Row is not a JSON object".into());
                }
            }
    
            Ok(insert_statements.join("\n"))
        }
    }

    impl FromRow for Lift {
        fn from_row(row: &Row) -> SQLResult<Self> {
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

    impl FromRow for Weight {
        fn from_row(row: &Row) -> SQLResult<Self> {
            Ok(Weight {
                id: row.get(0)?,
                created_at: row.get(1)?,
                weight_lbs: row.get(2)?,
            })
        }
    }

    impl FromRow for Calories {
        fn from_row(row: &Row) -> SQLResult<Self> {
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
}
