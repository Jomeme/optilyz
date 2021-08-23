const TaskModel = require("../../model/task");
const APIError = require("../../utils/APIError");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { task_id, ...details } = req.body;

    const task = await TaskModel.findOneAndUpdate({ _id: task_id }, {
      $set: details
    }, { useFindAndModify: false, new: true }).exec();

    if (!task) {
      throw new APIError({ message: 'No task with Id found', isPublic: true });
    }

    return res.json({
      status: 'success',
      message: 'Task successfully updated',
      task: task
    });
  } catch (error) {
    next(error);
  }
};
