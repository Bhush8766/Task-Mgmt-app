const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");

    // Load models AFTER sequelize is created
    require("../models/userModel");
    require("../models/taskModel");
    require("../models/assignTaskModel");

    await sequelize.sync({ alter: true });

    console.log("Database Synced");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sequelize,
  connectDB,
};