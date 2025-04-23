CREATE DATABASE traffic_processor;
USE traffic_processor;

CREATE TABLE mappings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination_key VARCHAR(255) NOT NULL UNIQUE, -- "keyword|src|creative"
    our_param VARCHAR(12) NOT NULL UNIQUE,        -- Generated parameter
    version INT NOT NULL DEFAULT 1,              -- Version for refresh
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_combination_key ON mappings (combination_key);
CREATE INDEX idx_our_param ON mappings (our_param);