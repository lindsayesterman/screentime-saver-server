CREATE TABLE scrtimes (
    day_1 TEXT,
    day_2 TEXT,
    day_3 TEXT,
    day_4 TEXT,
    day_5 TEXT,
    day_6 TEXT,
    day_7 TEXT, 
    user_id INTEGER REFERENCES users(id)
    ON DELETE SET NULL
);
