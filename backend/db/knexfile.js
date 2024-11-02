require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST_DEVELOPMENT,
      port: process.env.DB_PORT_DEVELOPMENT,
      user: process.env.DB_USER_DEVELOPMENT,
      password: process.env.DB_PASSWORD_DEVELOPMENT,
      database: process.env.DB_DATABASE_NAME_DEVELOPMENT,
    },
    migrations: {
      directory: "./migrations",
    },
  },
  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST_PRODUCTION,
      user: process.env.DB_USER_PRODUCTION,
      password: process.env.DB_PASSWORD_PRODUCTION,
      database: process.env.DB_DATABASE_NAME_PRODUCTION,
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
