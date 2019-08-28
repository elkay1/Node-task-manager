const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Users Routes

// Tasks routes

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
