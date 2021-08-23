const TaskModel = require("../../model/task");
const APIError = require("../../utils/APIError");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { task_id } = req.body;

    const task = await TaskModel.findOneAndRemove({ _id: task_id, owner: userId }, { useFindAndModify: false }).exec();

    if (!task) {
      throw new APIError({ message: 'No task with Id found', isPublic: true });
    }

    res.json({
      status: 'success',
      message: 'Task successfully deleted',
      task
    });
  } catch (error) {
    next(error);
  }
};
