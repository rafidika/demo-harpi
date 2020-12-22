CREATE DATABASE regist_db;

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    nama TEXT,
    email TEXT,
    hp TEXT,
    tanggal DATE,
    domisili TEXT,
    buktitrf TEXT,
    verified BOOLEAN
);