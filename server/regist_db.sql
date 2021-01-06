CREATE DATABASE regist_db;

CREATE TABLE members (
    id TEXT,
    nama TEXT,
    email TEXT,
    hp TEXT,
    tanggal DATE,
    domisili TEXT,
    buktitrf TEXT,
    verified BOOLEAN,
    idcard TEXT
);

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    name_adm VARCHAR(10),
    username TEXT UNIQUE NOT NULL
);

CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    hash VARCHAR(100),
    username TEXT UNIQUE NOT NULL
);