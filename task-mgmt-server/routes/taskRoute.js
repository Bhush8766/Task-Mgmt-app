const express = require("express");

const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskByID,
  updateStatus,
  updateTask,
  daleteTask,
  getMyTasks,
} = require("../controllers/taskController");



const { auth, admin } = require("../middleware/auth");

// Everyone logged in

router.get("/my-tasks", auth, getMyTasks);

router.post("/create", auth, createTask);

router.get("/getAll", auth, getAllTasks);

router.get("/getTask/:ID", auth, getTaskByID);

router.patch("/updateStatus/:ID", auth, updateStatus);

// Admin only
router.put("/updateTask/:ID", auth, admin, updateTask);

router.delete("/delete/:ID", auth, admin, daleteTask);

router.patch(
    "/update-status/:ID",
    auth,
    updateStatus
);

module.exports = router;