DROP TABLE IF EXISTS calories;

CREATE TABLE calories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    carbs DOUBLE NULL,
    protein DOUBLE NULL,
    saturated_fat DOUBLE NULL,
    trans_fat DOUBLE NULL,
    monounsaturated_fat DOUBLE NULL,
    polyunsaturated_fat DOUBLE NULL,
    total_calories INT NOT NULL
);

DROP TABLE IF EXISTS weight;

CREATE TABLE weight (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    weight_lbs DOUBLE NOT NULL
);

DROP TABLE IF EXISTS lift;

CREATE TABLE lift (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exercise VARCHAR(255) NOT NULL,
    sets INT NOT NULL,
    reps INT NOT NULL,
    weight_lbs DOUBLE NOT NULL
);
