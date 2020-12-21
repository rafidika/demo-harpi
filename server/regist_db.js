const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'abel0811',
    host: 'localhost',
    port: 5432,
    database: 'regist_db'
});

module.exports = pool;