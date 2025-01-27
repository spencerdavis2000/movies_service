// src/dbUtils.js
const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // No "tcp:" prefix here
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '1433'), // Default port for Azure SQL
  options: {
    encrypt: true, // Ensure encryption for Azure SQL
    trustServerCertificate: false, // Set to true only if using self-signed certs
  },
};

const executeQuery = async (query, params = {}) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    // Add parameters to the query
    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });

    const result = await request.query(query);
    await pool.close();
    return result.recordset;
  } catch (err) {
    console.error('Database query failed:', err);
    throw err;
  }
};

module.exports = { executeQuery };
