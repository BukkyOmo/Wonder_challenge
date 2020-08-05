/* Replace with your SQL commands */
CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'unprocessed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
