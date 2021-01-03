const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;