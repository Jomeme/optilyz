const TaskModel = require("../../model/task");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const task = await TaskModel.create({ ...req.body, owner: userId });
    res.json({
      status: 'success',
      message: 'Task successfully created',
      task
    });
  } catch (error) {
    next(error);
  }
};
