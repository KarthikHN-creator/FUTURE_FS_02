const mysql = require('mysql2/promise');
require('dotenv').config();

// This connects using the single Aiven link instead of local credentials
const pool = mysql.createPool(process.env.DB_URI);

module.exports = pool;