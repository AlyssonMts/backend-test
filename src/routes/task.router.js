const express = require("express");
const { createTask, getTasks, updateTask, deleteTask, } = require("../controllers/task.controller");
const {authMiddleware} = require("../controllers/login.controller");


const router = express.Router();

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks", authMiddleware, getTasks);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router;
