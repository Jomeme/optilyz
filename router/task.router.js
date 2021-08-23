const createTask = require('../controllers/user/createTask');
const deleteTask = require('../controllers/user/deleteTask');
const fetchTasks = require('../controllers/user/fetchTasks');
const updateTask = require('../controllers/user/updateTask');
const verifyToken = require('../middleware/verifyToken');
const wrap = require('../utils/wrap');
const { validate } = require('../validations');
const createTaskValidate = require('../validations/task/createTask.validate');
const deleteTaskValidate = require('../validations/task/deleteTask.validate');
const updateTaskValidate = require('../validations/task/updateTask.validate');

const taskRouter = require('express').Router();

taskRouter.get('/', verifyToken, wrap(fetchTasks));

taskRouter.post('/', verifyToken, createTaskValidate(), validate, wrap(createTask));

taskRouter.patch('/', verifyToken, updateTaskValidate(), validate, wrap(updateTask));

taskRouter.delete('/', verifyToken, deleteTaskValidate(), validate, wrap(deleteTask));

module.exports = taskRouter;