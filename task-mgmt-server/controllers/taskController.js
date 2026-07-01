const Task = require("../models/taskModel");

async function createTask(req, res) {
  const { title, description, startDate, endDate } = req.body;

  try {
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).send({
        success: false,
        msg: "All fields required",
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).send({
        success: false,
        msg: "End date should be greater than start date",
      });
    }

    const task = await Task.create({
      title,
      description,
      startDate,
      endDate,
      userId: req.user.id,
    });

    res.status(201).send({
      success: true,
      msg: "Task created successfully",
      task,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
}

async function getAllTasks(req, res) {
  try {

    const tasks = await Task.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).send({
      success: true,
      tasks,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
}

async function getTaskByID(req, res) {

  try {

    const task = await Task.findByPk(req.params.ID);

    if (!task) {
      return res.status(404).send({
        success: false,
        msg: "Task not found",
      });
    }

    res.status(200).send({
      success: true,
      task,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
}

async function updateStatus(req, res) {

  try {

    const { status } = req.body;

    const validStatus = ["Pending", "Inprogress", "Completed"];

    if (!validStatus.includes(status)) {
      return res.status(400).send({
        success: false,
        msg: "Invalid Status",
      });
    }

    const task = await Task.findByPk(req.params.ID);

    if (!task) {
      return res.status(404).send({
        success: false,
        msg: "Task not found",
      });
    }

    await task.update({
      status,
    });

    res.status(200).send({
      success: true,
      msg: "Task status updated successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
}

async function updateTask(req, res) {

  try {

    const task = await Task.findByPk(req.params.ID);

    if (!task) {
      return res.status(404).send({
        success: false,
        msg: "Task not found",
      });
    }

    await task.update({
      title: req.body.title || task.title,
      description: req.body.description || task.description,
      startDate: req.body.startDate || task.startDate,
      endDate: req.body.endDate || task.endDate,
    });

    res.status(200).send({
      success: true,
      msg: "Task updated successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
}

async function daleteTask(req, res) {

  try {

    const task = await Task.findByPk(req.params.ID);

    if (!task) {
      return res.status(404).send({
        success: false,
        msg: "Task not found",
      });
    }

    await task.destroy();

    res.status(200).send({
      success: true,
      msg: "Task deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
}

async function getMyTasks(req, res) {

  try {

    const tasks = await Task.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).send({
      success: true,
      tasks,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskByID,
  updateStatus,
  updateTask,
  daleteTask,
  getMyTasks,
};