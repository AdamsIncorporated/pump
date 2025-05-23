-- Active: 1743904351748@@127.0.0.1@3306
DROP TABLE IF EXISTS calories;

CREATE TABLE calories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    carbs REAL NULL,
    protein REAL NULL,
    saturated_fat REAL NULL,
    trans_fat REAL NULL,
    monounsaturated_fat REAL NULL,
    polyunsaturated_fat REAL NULL,
    total_calories INTEGER NOT NULL
);

DROP TABLE IF EXISTS weight;

CREATE TABLE weight (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    weight_lbs REAL NOT NULL
);

DROP TABLE IF EXISTS lift;

CREATE TABLE lift (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exercise TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight_lbs REAL NOT NULL
);