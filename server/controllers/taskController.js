const Task = require("../models/Task");

//POST /api/tasks

exports.CreateTask = async (req, res ) => {
    const task = await Task.create({...req.body, owner: req.userId});
    res.json(task);
};

//GET /api/taks/me
exports.getMyTasks = async (req, res) => {
    const tasks = await Task.find({owner: req.user.id});
    res.json(tasks);
};

// GET /api/tasks/all
exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find().populate("owner", "email");
    res.json(tasks);
};