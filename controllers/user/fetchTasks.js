const TaskModel = require("../../model/task");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.query;

    let task;

    if (id) {
      task = await TaskModel.findOne({ _id: id, owner: userId }).exec();
    } else {
      task = await TaskModel.find({ owner: userId }).exec();
    }

    res.json({
      status: 'success',
      message: 'Task successfully fetched',
      task
    });
  } catch (error) {
    next(error);
  }
};
