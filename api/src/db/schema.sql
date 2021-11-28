
/* users table */
CREATE TABLE IF NOT EXISTS users (
    ccid TEXT NOT NULL PRIMARY KEY,
    isExec BOOLEAN NOT NULL DEFAULT FALSE,
    full_name TEXT NOT NULL,
    foip BOOLEAN,
    balance REAL
);

/* execs table */
CREATE TABLE IF NOT EXISTS execs (
    ccid TEXT NOT NULL PRIMARY KEY,
    program TEXT NOT NULL
);

/* clubs table */
CREATE TABLE IF NOT EXISTS clubs (
    clubid INT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    amount REAL NOT NULL
);

/* transations table */
CREATE TABLE IF NOT EXISTS transactions (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    clubid INT NOT NULL REFERENCES clubs ON DELETE CASCADE, 
    ccid TEXT NOT NULL REFERENCES users,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    amount REAL NOT NULL
);

/* update trigger after each transaction (TODO: not working yet!!!)*/
CREATE TRIGGER update_balance
AFTER INSERT ON transations FOR EACH ROW
UPDATE users
SET    users.balance = users.balance + inserted.amount
WHERE  users.ccid = inserted.ccid  
        
UPDATE clubs
SET   clubs.amount = clubs.amount - transactions.amount  
WHERE transactions.clubid = clubs.clubid;
