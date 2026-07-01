const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = require("./userModel");
const Task = require("./taskModel");

const AssignTask = sequelize.define(
  "AssignTask",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    taskID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "assign_tasks",
  }
);

User.hasMany(AssignTask, {
  foreignKey: "userID",
});

AssignTask.belongsTo(User, {
  foreignKey: "userID",
});

Task.hasMany(AssignTask, {
  foreignKey: "taskID",
});

AssignTask.belongsTo(Task, {
  foreignKey: "taskID",
});

module.exports = AssignTask;