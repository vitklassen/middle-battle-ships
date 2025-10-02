-- Создание дополнительных таблиц или данных
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка тестовых данных (опционально)
INSERT INTO users (email, name) VALUES 
('test@example.com', 'Test User')
ON CONFLICT (email) DO NOTHING;