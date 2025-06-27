use mysql::Value as MySqlValue;
use serde_json::Value as JsonValue;
use std::collections::HashMap;

pub fn convert_to_mysql(row: &HashMap<String, JsonValue>) -> HashMap<String, MySqlValue> {
    row.iter()
        .map(|(key, value)| {
            let mysql_value = match value {
                JsonValue::Null => MySqlValue::NULL,
                JsonValue::Bool(b) => MySqlValue::from(*b),
                JsonValue::Number(n) => {
                    if let Some(i) = n.as_i64() {
                        MySqlValue::from(i)
                    } else if let Some(f) = n.as_f64() {
                        MySqlValue::from(f)
                    } else {
                        MySqlValue::from(n.to_string()) // fallback, shouldn't happen
                    }
                }
                JsonValue::String(s) => MySqlValue::from(s.as_str()),
                JsonValue::Array(arr) => {
                    MySqlValue::from(serde_json::to_string(arr).unwrap_or("[]".to_string()))
                }
                JsonValue::Object(obj) => {
                    MySqlValue::from(serde_json::to_string(obj).unwrap_or("{}".to_string()))
                }
            };
            (key.clone(), mysql_value)
        })
        .collect()
}
