require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: "123456",
    database: "izi_app_todo_db",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "123456",
    database: "izi_app_todo_db",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
};