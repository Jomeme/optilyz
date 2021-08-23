const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');

const taskSchema = new Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  notification_time: {
    type: Date,
    required: true
  },
  is_completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


const TaskModel = mongoose.model('tasks', taskSchema);

module.exports = TaskModel;