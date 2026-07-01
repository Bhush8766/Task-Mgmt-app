require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");

const taskRouter = require("./routes/taskRoute");
const userRouter = require("./routes/userRoute");
const assignTaskRouter = require("./routes/assignTaskRouter");

const app = express();
const PORT = process.env.PORT || 7005;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/task", taskRouter);
app.use("/user", userRouter);
app.use("/assign", assignTaskRouter);

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});