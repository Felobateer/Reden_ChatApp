const mysql = require("mysql2/promise");

let db;

const createConnectionPool = (env) => {
  const config = {
    host: process.env[`DB_HOST_${env.toUpperCase()}`],
    user: process.env[`DB_USER_${env.toUpperCase()}`],
    password: process.env[`DB_PASSWORD_${env.toUpperCase()}`],
    database: process.env[`DB_DATABASE_NAME_${env.toUpperCase()}`],
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  return mysql.createPool(config);
};

if (process.env.NODE_ENV === "production") {
  db = createConnectionPool("production");
} else {
  db = createConnectionPool("development");
}

// Test the connection
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connection successful");
    connection.release();
  } catch (err) {
    console.error("Database connection failed: ", err);
  }
};

testConnection();

module.exports = db;
