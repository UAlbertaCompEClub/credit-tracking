
/* users table */
CREATE TABLE IF NOT EXISTS users (
    ccid TEXT NOT NULL PRIMARY KEY,
    full_name TEXT NOT NULL,
    foip BOOLEAN,
    balance REAL
);

/* execs table */
CREATE TABLE IF NOT EXISTS execs (
    ccid TEXT NOT NULL PRIMARY KEY,
    program TEXT NOT NULL
);

/* transations table */
CREATE TABLE IF NOT EXISTS transactions (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    club TEXT NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    amount REAL NOT NULL
);

/* clubs table */
CREATE TABLE IF NOT EXISTS clubs (
    name TEXT NOT NULL PRIMARY KEY,
    amount REAL NOT NULL
);