
/* users table */
CREATE TABLE IF NOT EXISTS users (
    ccid TEXT NOT NULL PRIMARY KEY,
    isExec BOOLEAN NOT NULL DEFAULT FALSE,
    full_name TEXT NOT NULL,
    foip BOOLEAN NOT NULL DEFAULT FALSE,
    balance REAL NOT NULL DEFAULT 0,
    subscribed BOOLEAN NOT NULL DEFAULT TRUE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    password TEXT NOT NULL
);

/* clubs table */
CREATE TABLE IF NOT EXISTS clubs (
    clubid INT NOT NULL PRIMARY KEY,
    clubname TEXT NOT NULL,
    amount REAL NOT NULL DEFAULT 0
);

/* execs table */
CREATE TABLE IF NOT EXISTS execs (
    ccid TEXT NOT NULL PRIMARY KEY,
    clubid INT NOT NULL REFERENCES clubs
);

/* transations table */
CREATE TABLE IF NOT EXISTS transactions (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    clubid INT NOT NULL REFERENCES clubs, 
    ccid TEXT NOT NULL REFERENCES users,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by TEXT NOT NULL,
    amount REAL NOT NULL
);

/* email queue for invoices */
CREATE TABLE IF NOT EXISTS invoice_queue (
    ccid TEXT NOT NULL PRIMARY KEY REFERENCES users
);

/* We want the option of repeats. Thus
    no need for a primary key in this table */
CREATE TABLE IF NOT EXISTS forgot_password (
    ccid TEXT NOT NULL REFERENCES users,
    code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS state (
    var TEXT NOT NULL PRIMARY KEY,
    val TEXT NOT NULL
);

/* Update balance function */
CREATE OR REPLACE FUNCTION update_balances()
    RETURNS TRIGGER AS
$func$
BEGIN
    UPDATE users
    SET balance = balance + NEW.amount
    WHERE ccid = NEW.ccid;

    UPDATE clubs 
    SET amount = amount - NEW.amount
    WHERE clubid = NEW.clubid;
    RETURN NULL;
END;
$func$ LANGUAGE 'plpgsql';

/* trigger to update user and club balance after a transaction */
CREATE TRIGGER update_balance_from_transaction
    AFTER INSERT 
    ON transactions
    FOR EACH ROW EXECUTE PROCEDURE update_balances();
