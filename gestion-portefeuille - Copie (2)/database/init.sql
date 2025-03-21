
DROP TABLE IF EXISTS portfolio_assets CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(50) NOT NULL UNIQUE,
    fixed_price NUMERIC NOT NULL
);

INSERT INTO assets (name, symbol, fixed_price) VALUES
('Bitcoin', 'BTC', 50000),
('Ethereum', 'ETH', 4000),
('Litecoin', 'LTC', 200),
('Ripple', 'XRP', 1.2),
('Cardano', 'ADA', 1.5),
('Polkadot', 'DOT', 30),
('Dogecoin', 'DOGE', 0.5),
('Chainlink', 'LINK', 25),
('Uniswap', 'UNI', 20),
('Solana', 'SOL', 150);

CREATE TABLE IF NOT EXISTS portfolios (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS portfolio_assets (
    id SERIAL PRIMARY KEY,
    portfolio_id INT NOT NULL,
    asset_id INT NOT NULL,
    quantity NUMERIC NOT NULL,
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE,
    FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
);
