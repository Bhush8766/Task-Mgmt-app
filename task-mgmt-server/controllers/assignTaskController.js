const AssignTask = require('../models/assignTaskModel')
const Task = require('../models/taskModel')
const User = require('../models/userModel')

async function assignTaskToUser(req, res) {
  const { taskID, userID } = req.body;

  try {
    console.log("Payload:", req.body);

    const user = await User.findByPk(userID);
    const task = await Task.findByPk(taskID);

    console.log("User:", user);
    console.log("Task:", task);

    if (!user || !task) {
      return res.status(400).send({
        success: false,
        msg: "Task or User not found",
      });
    }

    const alreadyAssigned = await AssignTask.findOne({
      where: {
        userID,
        taskID,
      },
    });

    if (alreadyAssigned) {
      return res.status(400).send({
        success: false,
        msg: "Task already assigned",
      });
    }

    const assign = await AssignTask.create({
      userID,
      taskID,
    });

    console.log(assign);

    res.status(200).send({
      success: true,
      msg: "Task assigned successfully",
    });

  } catch (error) {
    console.log("ASSIGN ERROR:");
    console.log(error);

    res.status(500).send({
      success: false,
      msg: error.message,
    });
  }
}

async function getAllAssignTable(req, res) {
    try {
        assignRecords = await AssignTask.findAll()
        res.status(200).send({ assignRecords: assignRecords, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Server error" })
    }
}

async function getTasksByUSer(req, res) {
    const userID = req.user.id
    try {
        const getTasks = await AssignTask.findAll({
            where:{userID:userID},
            include:[
                {
                    model:Task,
                    attributes:['id','title','startDate','endDate','status']
                }
            ]
        })
        res.status(200).send({getTasks:getTasks,success:true})

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Server error" })
    }
}

async function getTaskWithUsers(req, res) {
    const taskID = req.params.TASKID;
    try {
        const assignments = await AssignTask.findAll({
            where: {
                taskID: taskID,
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"],
                },
                {
                    model: Task
                },
            ],
        });

        const result = {
            task: {
                id: assignments[0].Task.id,
                title: assignments[0].Task.title,
                description: assignments[0].Task.description,
                status: assignments[0].Task.status,
                startDate: assignments[0].Task.startDate,
                endDate: assignments[0].Task.endDate,
            },

            users: assignments.map((item) => ({
                id: item.User.id,
                name: item.User.name,
                email: item.User.email,
            })),
        };

        res.status(200).send({ details: result, success: true })

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Server error" })

    }
}




module.exports = {
    assignTaskToUser, getAllAssignTable,
    getTasksByUSer, getTaskWithUsers
}