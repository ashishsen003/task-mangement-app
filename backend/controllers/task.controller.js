import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

export const addtask = async (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description || title === "" || description === "") {
    next(errorHandler(400, "All fields are required"));
  }
  const newTask = new Task(req.body);
  try {
    await newTask.save();
    res.json("New task added");
  } catch (error) {
    next(error);
  }
};

export const tasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.body.userId });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const task = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById({ _id: taskId });
    if (!task) {
      return res.json("Product not found");
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const edittask = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById({ _id: taskId });
    if (req.body.userId == task.userId) {
      await Task.findByIdAndUpdate({ _id: taskId }, req.body);
      res.json(`Post with ID ${taskId} has been updated`);
    } else {
      res.json("You are not authorised");
    }
  } catch (error) {
    next(error);
  }
};

export const deletetask = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById({ _id: taskId });
    if (req.body.userId == task.userId) {
      await Task.findByIdAndDelete({ _id: taskId }, req.body);
      res.json(`Post with ID ${taskId} has been deleted`);
    } else {
      res.json("You are not authorised");
    }
  } catch (error) {
    next(error);
  }
};
